/**
 * Created by Administrator on 2017/03/23 0023.
 */

import App from '../view/app'
import MainPage from '../view/mainPage'
import Home from '../view/home'
import Page2 from '../view/page2'
import Page3 from '../view/page3'
import Page4 from '../view/page4'


export const routeConfig = [
    {
        path: '/',
        component: App,
        indexRoute: { component: Home },
        childRoutes: [
            {
                path: 'page',
                component: MainPage ,
                indexRoute: { component: Page2 },
                childRoutes: [
                    { path: 'page3', component: Page3 },
                    { path: 'page4', component: Page4 }
                ]
            }
            // { path: 'login', component: Login }
        ]
    }
];