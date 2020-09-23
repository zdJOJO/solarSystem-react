/**
 * Created by zdjojo on 2017/03/23 0023.
 */

import { lazy } from 'react';
import { ROUTE_PATH } from '../global';

const routes = [
  {
    exact: true,
    path: ROUTE_PATH.HOME,
    component: lazy(() => import(/* webpackChunkName: "home" */ '../pages/home'))
  },
  {
    exact: true,
    path: ROUTE_PATH.LOCATION,
    component: lazy(() => import(/* webpackChunkName: "location" */ '../pages/location'))
  },
  {
    exact: true,
    path: ROUTE_PATH.CART,
    component: lazy(() => import(/* webpackChunkName: "cart" */ '../pages/cart'))
  },
  {
    exact: true,
    path: ROUTE_PATH.USER,
    component: lazy(() => import(/* webpackChunkName: "user" */ '../pages/user'))
  },
  {
    exact: true,
    path: ROUTE_PATH.COMMENT_LIST,
    component: lazy(() => import(/* webpackChunkName: "comments" */ '../pages/comments'))
  },
  {
    exact: true,
    path: ROUTE_PATH.HOME_NEWS,
    component: lazy(() => import(/* webpackChunkName: "newsList" */ '../pages/news/NewsList'))
  },
  {
    exact: true,
    path: ROUTE_PATH.HOME_NEWS_ID,
    component: lazy(() => import(/* webpackChunkName: "newsInfo" */ '../pages/news/NewsInfo'))
  },
  {
    exact: true,
    path: ROUTE_PATH.HOME_PHOTOES,
    component: lazy(() => import(/* webpackChunkName: "photoes" */ '../pages/photoes'))
  },
  {
    exact: true,
    path: ROUTE_PATH.HOME_GODDS,
    component: lazy(() => import(/* webpackChunkName: "goodsList" */ '../pages/goods/GoodsList'))
  },
  {
    exact: true,
    path: ROUTE_PATH.HOME_GODDS_ID,
    component: lazy(() => import(/* webpackChunkName: "goodsInfo" */ '../pages/goods/GoodInfo'))
  },
  {
    exact: true,
    path: ROUTE_PATH.HOME_MOVIES,
    component: lazy(() => import(/* webpackChunkName: "movies" */ '../pages/movies'))
  }
];

export default routes;