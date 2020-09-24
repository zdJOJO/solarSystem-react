
import React, { useState } from 'react';

import { NavBar, Icon, Popover, Toast } from 'antd-mobile';


const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;

const Item = Popover.Item;


// 气泡组件
const NavBarPopContent = () => {
  const [visible, set_visible] = useState(false);
  return (
    <Popover
      mask
      overlayClassName="fortest"
      overlayStyle={{ color: 'currentColor' }}
      visible={visible}
      overlay={[
        (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">扫码</Item>),
        (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>二维码</Item>),
        (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
          <span style={{ marginRight: 5 }}>帮助</span>
        </Item>)
      ]}
      align={{
        overflow: { adjustY: 0, adjustX: 0 },
        offset: [-10, 0],
      }}
      onVisibleChange={(bool) => { set_visible(bool) }}
      onSelect={(opt) => {
        set_visible(false);
        console.log(opt.props.value);
      }}
    >
      <div style={{
        height: '100%',
        padding: '0 15px',
        marginRight: '-15px',
        display: 'flex',
        alignItems: 'center',
      }}
      >
        <Icon key="1" type="ellipsis" />
      </div>
    </Popover >
  )
};

function MainTabBar({ title, isShowBack, handleClick }) {
  return (
    <NavBar
      mode="dark"
      style={{color: '#303133'}}
      leftContent={isShowBack ? <Icon type="left" size="md" /> : ""}
      rightContent={[
        <Icon
          key="0"
          type="search"
          style={{ marginRight: '16px' }}
          onClick={() => {
            Toast.info("搜索 功能暂未开发")
          }} />,
        <NavBarPopContent key="1" />
      ]}
      onLeftClick={(e) => {
        if (!isShowBack) return;
        handleClick(e)
      }}
    >{title}</NavBar>
  )
};

export default MainTabBar;
