import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { Grid } from 'antd-mobile';

import BaseLoading from '../../components/common/BaseLoading/index';
import BaseEmpety from '../../components/common/BaseEmpety';
import { GOODS } from '../../httpConfig/api';
import http from '../../httpConfig/http';
import { ROUTE_PATH } from '../../global';

import "./index.less"


const GoodsListItem = React.memo(({ good }) => {
  let history = useHistory();
  return (
    <div
      className="item"
      onClick={() => {
        history.push(`${ROUTE_PATH.HOME_GODDS}/${good.id}`)
      }}
    >
      <img src={good.img_url} />
      <p className="title">{good.title}</p>
      <p className="flexBox">
        <big className="sell_price">￥ {good.sell_price}</big>
        <small className="market_price">￥ {good.market_price}</small>
      </p>
      <p className="flexBox">
        <span className="hot">热卖中</span>
        <span className="stock_quantity">剩 {good.stock_quantity} </span>
      </p>
    </div >
  )
});


function GoodsList() {

  const [loading, set_loading] = useState(false);
  const [goodsList, set_goodsList] = useState([]);

  useEffect(() => {
    let isUnmounted = false;
    const getGoodsList = async () => {
      set_loading(true);
      const result = await http.get(`${GOODS.GET_GOODS}?pageindex=1`);
      set_goodsList(result);
      set_loading(false);
    }
    getGoodsList();
    return () => {
      isUnmounted = true;
    };
  }, []);

  return (
    <div className="page goodList">
      <Grid
        data={goodsList}
        square={false}
        hasLine={true}
        columnNum={2}
        renderItem={(el, index) => <GoodsListItem good={el} />}
      />
      {loading && <BaseLoading />}
      {goodsList.length === 0 && <BaseEmpety text="暂无美食" />}
    </div>
  )
}

export default GoodsList;