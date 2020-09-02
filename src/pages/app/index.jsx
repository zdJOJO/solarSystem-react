import React, { useReducer, useEffect } from 'react';
import { useLocation, useHistory } from "react-router-dom";


import MainHeader from './MainHeader';
import MainContent from './MainContent';
import MainTabBar from './MainTabBar';

import { themeColor, fontColor, tabBarElements, getTitleName } from '../../global';
import AppDispatch from '../bus';

import '../../../assets/css/index';



function reducer(state, action) {
  switch (action.type) {
    case 'SET_TOTALNUM':
      return {
        ...state,
        cartTotalNum: action.cartTotalNum
      };
    case 'SET_NAVTITLE':
      console.log(action.navTitle);
      return {
        ...state,
        navTitle: action.navTitle
      };
    default:
      throw new Error();
  }
}

const initialState = {
  cartTotalNum: 0,
  navTitle: ''
}

function App() {
  let history = useHistory();
  let location = useLocation();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    let num = 0;
    cartData.forEach(ele => {
      if (ele.selected) {
        num += ele.count
      }
    })
    dispatch({ type: 'SET_NAVTITLE', navTitle: getTitleName(location.pathname) });
    dispatch({ type: 'SET_TOTALNUM', cartTotalNum: num });
  }, []);


  function goBack(event) {
    history.go(-1);
  }

  function handleClickTabBar(item) {
    if (location.pathname === item.routePath) return;  // 避免重复点击同一个路由
    dispatch({ type: 'SET_NAVTITLE', navTitle: getTitleName(item.routePath) });

    // state 不奏效
    history.push({
      pathname: item.routePath,
      query: {
        from: location.pathname,
        to: item.routePath
      }
    });
  }
  return (
    <div className="app">
      <MainHeader
        title={state.navTitle}
        isShowBack={location.pathname !== '/' && location.pathname !== '/location' && location.pathname !== '/cart' && location.pathname !== '/user'}
        handleClick={goBack}
      />

      <AppDispatch.Provider value={dispatch} >
        <MainContent />
      </AppDispatch.Provider>

      <MainTabBar
        cartTotalNum={state.cartTotalNum}
        defaultSelectedPath={location.pathname}
        tabBarElements={tabBarElements}
        unselectedTintColor={fontColor}
        tintColor={themeColor}
        handleClick={handleClickTabBar}
      />
    </div>
  )
}

export default App;
