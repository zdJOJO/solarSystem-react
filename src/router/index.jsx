/**
 * Created by zdjojo on 2017/03/23 0023.
 */

import React from "react";
import Bundle from "../components/common/Bundle";

const Loading = () => <div> loading...... </div>;

export const createRouteView = _component => () => (
  <Bundle load={_component}>
    {Component => Component ? <Component /> : <Loading />}
  </Bundle>
);