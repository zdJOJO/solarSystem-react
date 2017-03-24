/**
 * Created by Administrator on 2017/03/23 0023.
 */
import React, { Component } from 'react';

import TopNavBar from '../../components/topNavBar'
import Menu from '../../components/menu/menu'

class Home extends Component {
    render() {
        return (
            <div className="content">
                <TopNavBar title='首页'/>
                    <div className="page">
                        第一第一第一第一第一第一
                    </div>
                <Menu changeMenu={()=>{console.log(1)}}/>
            </div>
        );
    }
}

export default Home;