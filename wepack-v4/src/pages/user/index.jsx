/**
 * Created by Administrator on 2017/03/23 0023.
 */
import React from 'react';
import { Grid } from 'antd-mobile';

import BaseSkeleton from '@/components/common/BaseSkeleton/index';

import { memberInfoMenus, myInfoMenes } from "@/global";
import AppDispatch from '../bus';


import './index.less';

const circleUrl = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
const temp = [1, 2, 3, 4];

const Item = ({ item }) => {
  return (
    <li className="memberMenuIconBox">
      <p>
        <img src={item.imgName} />
      </p>
      <p>{item.name}</p>
    </li>
  )
}

function User() {
  return (
    <div className="memberFirstBox">
      <div className="memberInfo">
        <div className="memberInfoBox">
          <div className="headInfo headImg">
            <img src={circleUrl} style={{ width: 50, height: 50 }} />
          </div>
          <div className="headInfo">
            <p className="memberName">谪仙人</p>
            <p className="tagBox">
              <span className="memberTag certified">已认证{`✔`}</span>
              <span className="memberTag">成长值999+ 👁‍🗨</span>
            </p>
          </div>
        </div>

        <ul className="memberMenuBox">
          {
            myInfoMenes.map((item, index) => <Item key={index} item={item} />)
          }
        </ul>

      </div>
      <div className="page">
        <div className="informationContainer">
          <div className="orderMenuBox">
            <Grid
              hasLine={false}
              columnNum={5}
              data={
                memberInfoMenus.map(item => {
                  return {
                    ...item,
                    text: item.name,
                    icon: item.imgName
                  }
                })
              }
            />
          </div>
          <div className="orderMenuBox">
            <BaseSkeleton width="5rem" />
            <BaseSkeleton width="4rem" height="0.25rem" />
            <BaseSkeleton width="5rem" />
            <BaseSkeleton width="4rem" height="0.25rem" />
          </div>
          <div className="orderMenuBox">
            <BaseSkeleton width="5rem" />
            <BaseSkeleton width="4rem" height="0.25rem" />
            <BaseSkeleton width="5rem" />
            <BaseSkeleton width="4rem" height="0.25rem" />
          </div>
          <div className="orderMenuBox">
            <BaseSkeleton width="5rem" />
            <BaseSkeleton width="4rem" height="0.25rem" />
            <BaseSkeleton width="5rem" />
            <BaseSkeleton width="4rem" height="0.25rem" />
          </div>
          <div className="orderMenuBox">
            <BaseSkeleton width="5rem" />
            <BaseSkeleton width="4rem" height="0.25rem" />
            <BaseSkeleton width="5rem" />
            <BaseSkeleton width="4rem" height="0.25rem" />
          </div>
        </div>
      </div>
    </div >
  )
}

export default User;