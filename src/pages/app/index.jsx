import React, { useState, useReducer, useEffect } from 'react';
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
      return { cartTotalNum: action.cartTotalNum };
    case 'SET_NAVTITLE':
      return { navTitle: action.navTitle };
    default:
      throw new Error();
  }
}


function App() {
  let history = useHistory();
  let location = useLocation();

  const [state, dispatch] = useReducer(reducer, {
    cartTotalNum: 0,
    navTitle: ''
  });

  useEffect(() => {
    let cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    let num = 0;
    cartData.forEach(ele => {
      if (ele.selected) {
        num += ele.count
      }
    })
    dispatch({ type: 'SET_TOTALNUM', cartTotalNum: num });
  }, []);


  function goBack(event) {
    // 不够完善 ， 如何监听 react-router 变化 ？？？
    history.goBack()
  }

  function handleClickTabBar(item) {
    if (location.pathname === item.routePath) return;  // 避免重复点击同一个路由
    dispatch({ type: 'SET_NAVTITLE', navTitle: getTitleName(item.routePath) });
    history.push(item.routePath);
  }
  return (
    <div className="app">
      <MainHeader
        title={state.navTitle}
        isShowBack={location.pathname !== '/'}
        handleClick={goBack}
      />

      <AppDispatch.Provider value={dispatch} >
        <MainContent />
      </AppDispatch.Provider>

      <MainTabBar
        cartTotalNum={state.cartTotalNum}
        defaultSelectedName={getTitleName(location.pathname)}
        tabBarElements={tabBarElements}
        unselectedTintColor={fontColor}
        tintColor={themeColor}
        handleClick={handleClickTabBar}
      />
    </div>
  )
}

export default App;
