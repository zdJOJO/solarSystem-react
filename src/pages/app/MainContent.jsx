
import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import { createRouteView } from '@/router';
import { ROUTE_PATH } from '../../global';

import Home from "bundle-loader?lazy&name=home!../home";
import Location from "bundle-loader?lazy&name=location!../location";
import Cart from "bundle-loader?lazy&name=cart!../cart";
import User from "bundle-loader?lazy&name=user!../user";

import NewsList from 'bundle-loader?lazy&name=newslist!../news/NewsList';
import NewsInfo from 'bundle-loader?lazy&name=newsinfo!../news/NewsInfo';


function MainContent() {
  return (
    <main>
      <Switch>
        <Route exact path={ROUTE_PATH.HOME} component={createRouteView(Home)} />
        <Route path={ROUTE_PATH.LOCATION} component={createRouteView(Location)} />
        <Route path={ROUTE_PATH.CART} component={createRouteView(Cart)} />
        <Route path={ROUTE_PATH.USER} component={createRouteView(User)} />

        <Route path={ROUTE_PATH.HOME_NEWS} component={createRouteView(NewsList)} />
        <Route path={ROUTE_PATH.HOME_NEWS_ID} component={createRouteView(NewsInfo)} />

        {/* <Route path={ROUTE_PATH.HOME_GODDS} component={createRouteView()} />
        <Route path={ROUTE_PATH.HOME_GODDS_ID} component={createRouteView()} />

        <Route path={ROUTE_PATH.HOME_PHOTOES} component={createRouteView()} />
        <Route path={ROUTE_PATH.HOME_PHOTOE_ID} component={createRouteView()} /> */}


        <Redirect from="/*" to="/" />
      </Switch>
    </main>
  )
}


export default MainContent;