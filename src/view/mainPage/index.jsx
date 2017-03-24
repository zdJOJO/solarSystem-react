/**
 * Created by Administrator on 2017/03/23 0023.
 */
import React, { Component } from 'react';

import TopNavBar from '../../components/topNavBar'
import Menu from '../../components/menu/menu'

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'PAGE2'
        };
    }

    handleChangeNavBarTitle(title){
        switch (title){
            case '/page/':
                this.setState({title: 'PAGE2'});
                break;
            case '/page/page3':
                this.setState({title: 'PAGE3'});
                break;
            case '/page/page4':
                this.setState({title: 'PAGE4'});
                break
        }
    }

    render() {
        return (
            <div className="content">
                <TopNavBar title={this.state.title}/>
                    {this.props.children}
                <Menu changeMenu={(pageText)=>{
                    this.handleChangeNavBarTitle(pageText)
                }}/>
            </div>
        );
    }
}

export default MainPage;