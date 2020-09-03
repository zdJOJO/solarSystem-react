/**
 * Created by zdjojo on 2017/03/23 0023.
 */

import React from "react";

import Home from "bundle-loader?lazy&name=home!../pages/home";
import Location from "bundle-loader?lazy&name=location!../pages/location";
import Cart from "bundle-loader?lazy&name=cart!../pages/cart";
import User from "bundle-loader?lazy&name=user!../pages/user";
import Comments from "bundle-loader?lazy&name=comments!../pages/comments";

import NewsList from 'bundle-loader?lazy&name=newslist!../pages/news/NewsList';
import NewsInfo from 'bundle-loader?lazy&name=newsinfo!../pages/news/NewsInfo';

import Photoes from 'bundle-loader?lazy&name=photoes!../pages/photoes';

import GoodsList from 'bundle-loader?lazy&name=goodsList!../pages/goods/GoodsList';
import GoodsInfo from 'bundle-loader?lazy&name=goodsInfo!../pages/goods/GoodInfo';

import { ROUTE_PATH } from '../global';
import Bundle from "../components/common/Bundle";


const Loading = () => <div> loading...... </div>;

const createRouteView = _component => () => (
  <Bundle load={_component}>
    {Component => Component ? <Component /> : <Loading />}
  </Bundle>
);


const routes = [
  {
    exact: true,
    path: ROUTE_PATH.HOME,
    component: createRouteView(Home)
  },
  {
    exact: true,
    path: ROUTE_PATH.LOCATION,
    component: createRouteView(Location)
  },
  {
    exact: true,
    path: ROUTE_PATH.CART,
    component: createRouteView(Cart)
  },
  {
    exact: true,
    path: ROUTE_PATH.USER,
    component: createRouteView(User)
  },
  {
    exact: true,
    path: ROUTE_PATH.COMMENT_LIST,
    component: createRouteView(Comments)
  },
  {
    exact: true,
    path: ROUTE_PATH.HOME_NEWS,
    component: createRouteView(NewsList)
  },
  {
    exact: true,
    path: ROUTE_PATH.HOME_NEWS_ID,
    component: createRouteView(NewsInfo)
  },
  {
    exact: true,
    path: ROUTE_PATH.HOME_PHOTOES,
    component: createRouteView(Photoes)
  },
  {
    exact: true,
    path: ROUTE_PATH.HOME_GODDS,
    component: createRouteView(GoodsList)
  },
  {
    exact: true,
    path: ROUTE_PATH.HOME_GODDS_ID,
    component: createRouteView(GoodsInfo)
  }
];

export default routes;