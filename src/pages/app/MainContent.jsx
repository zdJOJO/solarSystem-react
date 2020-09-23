
import React, { Suspense } from 'react';
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import BaseLoading from '../../components/common/BaseLoading';
import routes from '@/route';

function MainContent() {
  let location = useLocation();
  return (
    <main>
      <Suspense fallback={<BaseLoading />}>
        <Switch location={location}>
          {
            routes.map((route, index) => {
              let PageModule = route.component;
              return (
                <Route
                  key={`router${index}`}
                  exact={route.exact}
                  path={route.path}
                  render={props => <PageModule {...props} />}
                />
              )
            })
          }
          <Redirect from="/*" to="/" />
        </Switch>
      </Suspense>
    </main>
  )
}


export default React.memo(MainContent);