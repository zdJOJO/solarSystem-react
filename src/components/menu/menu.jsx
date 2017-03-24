/**
 * Created by Administrator on 2017/03/23 0023.
 */

import React, { Component } from 'react'
import { hashHistory } from 'react-router'

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
        path: '/'
    },
    {
        title: '第二',
        icon: (<Icon type="koubei-o" size="md" />),
        selectedIcon: (<Icon type="koubei" size="md" />),
        path: '/page/'
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
        path: '/page/page3'
    },
    {
        title: '第四',
        icon: ({uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg'}),
        selectedIcon: ({uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg'}),
        path: '/page/page4'
    }
];

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: '/',
            hidden: false
        };
    }

    componentDidMount(){
        this.setState({
            selectedTab: location.hash.split('#')[1]
        });
    }

    handleChangeMenu(pageText) {
        this.props.changeMenu(pageText);

        hashHistory.push({
            pathname: pageText
        });

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
                                selected={this.state.selectedTab === menu.path}
                                onPress={this.handleChangeMenu.bind(this, menu.path)}
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