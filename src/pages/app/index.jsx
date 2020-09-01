import React, { useState } from 'react';
import { useLocation, useHistory } from "react-router-dom";


import MainHeader from './MainHeader';
import MainContent from './MainContent';
import MainTabBar from './MainTabBar';

import { themeColor, fontColor, tabBarElements } from '../../global';

import '../../../assets/css/index';


function App() {
  let history = useHistory();
  let location = useLocation();
  const [navTitle, set_NavTitle] = useState(getRouteName(location.pathname));
  // const [currentPath, set_CurrentPath] = useState('/');

  function goBack(event) {
    // 不够完善 ， 如何监听 react-router 变化 ？？？
    history.goBack()
  }

  function handleClickTabBar(item) {
    // set_CurrentPath(item.routePath);
    let tem = item.name
    if (item.name === "首页") {
      tem = "Solar System"
    }
    set_NavTitle(tem);
    if (location.pathname === item.routePath) return;  // 避免重复点击同一个路由
    history.push(item.routePath)
  }

  function getRouteName(pathname) {
    let tem = tabBarElements.filter(e => e.routePath === pathname)[0];
    if (!tem || tem.name === "首页") {
      tem = "Solar System"
    }
    return tem.name
  }

  return (
    <div className="app">
      <MainHeader
        title={navTitle}
        isShowBack={location.pathname !== '/' && location.pathname !== '/location' && location.pathname !== '/cart' && location.pathname !== '/user'}
        handleClick={goBack}
      />

      <MainContent />

      <MainTabBar
        defaultSelectedName={getRouteName(location.pathname) === 'Solar System' ? '首页' : getRouteName(location.pathname)}
        tabBarElements={tabBarElements}
        unselectedTintColor={fontColor}
        tintColor={themeColor}
        handleClick={handleClickTabBar}
      />
    </div>
  )
}

export default App;
