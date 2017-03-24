/**
 * Created by Administrator on 2017/03/23 0023.
 */
import React, { Component } from 'react';

import Hoem from '../home'
import Menu from '../../components/menu/menu'

class MainPage extends Component {
    render() {
        return (
            <div className="content">
                <Hoem />
                <Menu/>
            </div>
        );
    }
}

export default MainPage;