import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router/lib'

import './index.less';

import {routeConfig} from './router'

ReactDOM.render(
    <Router history={hashHistory} routes={routeConfig}/>,
    
    document.getElementById('root')
);