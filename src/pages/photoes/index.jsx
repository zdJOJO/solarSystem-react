import React, { useState, useEffect, useReducer } from 'react';

import { Tabs } from 'antd-mobile';

import BaseLoading from '../../components/common/BaseLoading/index';
import BaseEmpety from '../../components/common/BaseEmpety';
import PhotoItem from './PhotoItem';
import { PHOTOES } from '../../httpConfig/api';
import http from '../../httpConfig/http';
import { themeColor, fontColor } from '@/global';

import './index.less';

const cloums = [0, 1];

const initialData = {
  currentId: 0,
  pageNum: 1,
  categories: [
    {
      id: 0,
      title: "全部"
    }
  ],
  allPhotoes: [
    {
      id: 0,
      title: "全部",
      imgs: []
    }
  ],
  showPhotoes: []
}

function photoesReducer(state, action) {
  switch (action.type) {

    case 'SET_CURRENT_ID':
      return { ...state, currentId: action.id };

    case 'SET_PHOTO_CATEGORIES':
      return { ...state, categories: state.categories.concat(action.categories) };

    case 'SET_SHOW_PHOTOES':
      let temp = state.allPhotoes;
      temp.some((ele, index) => {
        if (ele.id === action.id) {
          if (ele.imgs.length > 0) {
            // 此类图已存在 且 列表长度 > 0
            return true;
          } else {
            // 此类图不存在 但 列表长度 = 0
            let obj = state.categories.filter(k => k.id === action.id)[0];
            console.log('切换不请求');
            temp[index].imgs = action.photoes;
            return false
          }
        } else {
          // 此类图不存在
          let obj = state.categories.filter(k => k.id === action.id)[0];
          console.log('切换需要请求');
          temp.push({
            id: action.id,
            title: obj.title,
            imgs: action.photoes
          })
          return false
        }
      });
      return {
        ...state,
        showPhotoes: [...action.photoes],
        allPhotoes: [...temp]
      };

    default:
      throw new Error();
  }
}

function Photoes() {
  const [loading, set_loading] = useState(false);
  const [state, dispatch] = useReducer(photoesReducer, initialData);


  // 获取所有种类
  const getCtg = async () => {
    const result = await http.get(PHOTOES.GET_PHOTO_CATEGORIES);
    if (!!result) {
      dispatch({ type: 'SET_PHOTO_CATEGORIES', categories: result })
    }
  }

  // 获取照片
  const getPhotoesByCtg = async (id = 0) => {
    set_loading(true);
    const result = await http.get(`${PHOTOES.GET_PHOTOES}${id}`);
    if (!!result) {
      dispatch({ type: 'SET_SHOW_PHOTOES', photoes: result, id })
    }
    set_loading(false);
  }

  useEffect(() => {
    let isUnmounted = false;
    getCtg();
    getPhotoesByCtg();
    return () => {
      isUnmounted = true;
    };
  }, []);

  const renderContent = tab => {
    if (state.showPhotoes.length === 0) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BaseEmpety text='暂无照片' />
        </div>
      )
    } else {
      return (
        <div className="waterBox" id={`waterBox-${tab.id}`}>
          <div className="waterfall">
            {
              cloums.map(i => {
                let tempList = state.showPhotoes.filter((k, index) => index % 2 === i);
                return (
                  <div className={i === 0 ? "column" : "column right"} key={i} >
                    {
                      tempList.map(photoItem => (
                        <PhotoItem
                          key={photoItem.id}
                          ctgId={tab.id}
                          photoItem={photoItem}
                        />
                      ))
                    }
                  </div>
                )
              })
            }
          </div>
        </div >
      )
    }
  }

  return (
    <div className="page photoes">
      <Tabs
        destroyInactiveTab
        tabs={state.categories}
        initialPage={0}
        useOnPan={false}
        tabBarActiveTextColor={themeColor}
        tabBarInactiveTextColor={fontColor}
        usePaged={false}
        onChange={(tab, index) => {
          console.log('onChange', index, tab);
          let flag = false;
          let photoes = [];
          state.allPhotoes.some(k => {
            if (k.id === tab.id && k.imgs.length > 0) {
              photoes = k.imgs
              flag = true;
              return flag
            }
          })
          if (flag) {
            dispatch({ type: "SET_CURRENT_ID", id: tab.id });
            dispatch({ type: "SET_SHOW_PHOTOES", photoes, id: tab.id });
          } else {
            getPhotoesByCtg(tab.id)
          }
        }}
        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}
      >
        {renderContent}
      </Tabs>
      {loading && <BaseLoading />}
    </div>
  )
}

export default React.memo(Photoes);