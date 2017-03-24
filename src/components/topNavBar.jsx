/**
 * Created by Administrator on 2017/03/23 0023.
 */
import React, { Component } from 'react';

import { NavBar, Icon } from 'antd-mobile';

class TopNavBar extends Component{
    render(){
        return(
            <NavBar leftContent="返回" mode="light"
                    onLeftClick={()=>{
                        history.back();
                    }}
                    rightContent={[
                            <Icon key="0" type="search" style={{ marginRight: '0.32rem' }} />,
                            <Icon key="1" type="ellipsis" />
                        ]}
            >这个是NAV</NavBar>
        )
    }
}

export default TopNavBar;