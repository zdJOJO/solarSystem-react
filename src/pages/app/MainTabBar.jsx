import React, { useState } from 'react';

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

function MainTabBar({ defaultSelectedName, tabBarElements, unselectedTintColor, tintColor, handleClick }) {
  const [selectedTabName, set_SelectedTabName] = useState(defaultSelectedName);
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
                selected={selectedTabName === item.name}
                badge={item.ball ? 20 : 0}
                onPress={() => {
                  set_SelectedTabName(item.name);
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