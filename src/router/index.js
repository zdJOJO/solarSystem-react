/**
 * Created by Administrator on 2017/03/23 0023.
 */

import App from '../view/app'
import MainPage from '../view/mainPage'
import Home from '../view/home'
import Second from '../view/second'


export const routeConfig = [
    {
        path: '/',
        component: App,
        indexRoute: { component: MainPage },
        childRoutes: [
            {
                path: 'page',
                component: MainPage ,
                indexRoute: { component: Home },
                childRoutes: [
                    { path: 'second', component: Second }
                ]
            }
            // { path: 'login', component: Login }
        ]
    }
];