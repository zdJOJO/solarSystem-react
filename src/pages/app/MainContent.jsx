
import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import { createRouteView } from '@/router';
import { ROUTE_PATH } from '../../global';

import Home from "bundle-loader?lazy&name=home!../home";
import Location from "bundle-loader?lazy&name=location!../location";
import Cart from "bundle-loader?lazy&name=cart!../cart";
import User from "bundle-loader?lazy&name=user!../user";
import Comments from "bundle-loader?lazy&name=comments!../comments";

import NewsList from 'bundle-loader?lazy&name=newslist!../news/NewsList';
import NewsInfo from 'bundle-loader?lazy&name=newsinfo!../news/NewsInfo';

import Photoes from 'bundle-loader?lazy&name=photoes!../photoes';

import GoodsList from 'bundle-loader?lazy&name=goodsList!../goods/GoodsList';
import GoodsInfo from 'bundle-loader?lazy&name=goodsInfo!../goods/GoodInfo';


function MainContent() {
  return (
    <main>
      <Switch>
        <Route exact path={ROUTE_PATH.HOME} component={createRouteView(Home)} />
        <Route exact path={ROUTE_PATH.LOCATION} component={createRouteView(Location)} />
        <Route exact path={ROUTE_PATH.CART} component={createRouteView(Cart)} />
        <Route exact path={ROUTE_PATH.USER} component={createRouteView(User)} />
        <Route exact path={ROUTE_PATH.COMMENT_LIST} component={createRouteView(Comments)} />

        <Route exact path={ROUTE_PATH.HOME_NEWS} component={createRouteView(NewsList)} />
        <Route exact path={ROUTE_PATH.HOME_NEWS_ID} component={createRouteView(NewsInfo)} />

        <Route exact path={ROUTE_PATH.HOME_GODDS} component={createRouteView(GoodsList)} />
        <Route exact path={ROUTE_PATH.HOME_GODDS_ID} component={createRouteView(GoodsInfo)} />

        <Route exact path={ROUTE_PATH.HOME_PHOTOES} component={createRouteView(Photoes)} />


        <Redirect from="/*" to="/" />
      </Switch>
    </main>
  )
}


export default React.memo(MainContent);