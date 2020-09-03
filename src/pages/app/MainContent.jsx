
import React from 'react';
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import routes from '@/route';

function MainContent() {
  let location = useLocation();
  return (
    <main>
      <Switch location={location}>
        {
          routes.map((route, index) => (
            <Route key={index} {...route} />
          ))
        }
        <Redirect from="/*" to="/" />
      </Switch>
    </main>
  )
}


export default React.memo(MainContent);