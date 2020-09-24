import React, { useState, useEffect } from 'react';

import { TabBar } from 'antd-mobile';


const IconCell = ({ icon }) => {
  const style = {
    width: '0.5rem',
    height: '0.5rem',
  }
  return (
    <div style={{
      ...style,
      background: `url(${icon}) center center / 100% 100%  no-repeat`
    }}
    />
  )
}

function MainTabBar(props) {
  const { cartTotalNum, defaultSelectedPath, tabBarElements, unselectedTintColor, tintColor, handleClick } = props;

  const [selectedPath, set_selectedPath] = useState(defaultSelectedPath);
  return (
    <div className="tabBarContainer">
      <TabBar
        unselectedTintColor={unselectedTintColor}
        tintColor={tintColor}
        barTintColor="white"
        tabBarPosition="bottom"
        noRenderContent
      >
        {
          tabBarElements.map((item, index) => {
            return (
              <TabBar.Item
                key={index}
                title={item.name}
                icon={<IconCell icon={item.icon} />}
                selectedIcon={<IconCell icon={item.activeIcon} />}
                selected={selectedPath === item.routePath}
                badge={(item.ball && cartTotalNum > 0) ? cartTotalNum : 0}
                onPress={() => {
                  set_selectedPath(item.routePath);
                  handleClick(item);
                }}
              />
            )
          })
        }
      </TabBar>
    </div>
  )
}

export default MainTabBar;