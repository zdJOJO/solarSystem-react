/**
 * Created by Administrator on 2017/03/23 0023.
 */
import React, { Component } from 'react'

import { TabBar, Icon } from 'antd-mobile';

import './index.less'

const menuList = [
    {
        title: '第一',
        icon: (<div style={{
                            width: '0.44rem',
                            height: '0.44rem',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat'
                            }}
        />),
        selectedIcon: (<div style={{
                            width: '0.44rem',
                            height: '0.44rem',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat' }}
        />),
        tab: 'blueTab'
    },
    {
        title: '第二',
        icon: (<Icon type="koubei-o" size="md" />),
        selectedIcon: (<Icon type="koubei" size="md" />),
        tab: 'redTab'
    },
    {
        title: '第三',
        icon: (<div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  0.42rem 0.42rem no-repeat' }}
        />),
        selectedIcon: (<div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  0.42rem 0.42rem no-repeat' }}
        />),
        tab: 'greenTab'
    },
    {
        title: '第四',
        icon: ({uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg'}),
        selectedIcon: ({uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg'}),
        tab: 'yellowTab'
    }
];

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
            hidden: false
        };
    }

    handleChangeMenu(pageText) {
        console.log(pageText);
        this.setState({
            selectedTab: pageText
        });
    }

    render() {
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                hidden={this.state.hidden}
            >
                {
                    menuList.map((menu, index)=>{
                        return(
                            <TabBar.Item
                                title={menu.title}
                                key={index}
                                icon={menu.icon}
                                selectedIcon={menu.selectedIcon}
                                selected={this.state.selectedTab === menu.tab}
                                onPress={this.handleChangeMenu.bind(this, menu.tab)}
                                data-seed="logId"
                            />
                        )
                    })
                }
            </TabBar>
        );
    }
}

export default Menu;