import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from "react-router-dom";

import { Button, Card, WingBlank, WhiteSpace, Toast } from 'antd-mobile';

import BaseSwiper from '../../components/common/BaseSwiper';
import BaseNumberInput from '../../components/common/BaseNumberInput/index';
import { GOODS } from '../../httpConfig/api';
import http from '../../httpConfig/http';
import { ROUTE_PATH, transformTime } from '../../global';
import AppDispatch from '../bus';

import "./index.less"


function GoodsInfo() {

  let params = useParams();
  let history = useHistory();
  const dispatch = useContext(AppDispatch);

  const [loading, set_loading] = useState(true);
  const [count, set_count] = useState(1);
  const [imgs, set_imgs] = useState([]);
  const [goodsInfo, set_goodsInfo] = useState({});

  // 获取信息 && 获取轮播图
  const fetchData = async () => {
    if (goodsInfo.id === params.id) return;
    set_loading(true);
    const result1 = await http.get(`${GOODS.GOOD_INFO}${params.id}`);
    const result2 = await http.get(`${GOODS.GOOD_SWIPER_IMGS}${params.id}`);
    if (!!result1) {
      set_goodsInfo(result1[0]);
    }
    if (!!result2) {
      set_imgs(result2);
    }
    set_loading(false);
  }

  useEffect(() => {
    let isUnmounted = false;
    fetchData();
    return () => {
      isUnmounted = true;
    };
  }, []);

  const addToCar = () => {
    let cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    let num = 0;
    let flag = false; //是否已经存在
    let index2 = 0;
    cartData.forEach((ele, index) => {
      if (ele.selected) {
        num += ele.count
      }
      if (ele.id === goodsInfo.id) {
        index2 = index;
        flag = true;
      }
    })
    if (!flag || cartData.length === 0) {
      cartData.push({
        count: count,
        id: goodsInfo.id,
        price: goodsInfo.market_price,
        selected: true,
        sell_price: goodsInfo.sell_price,
        thumb_path: imgs[0].src,
        title: goodsInfo.title
      })
    } else {
      cartData[index2].count += count
    }
    dispatch({ type: 'SET_TOTALNUM', cartTotalNum: count + num });
    localStorage.setItem('cart', JSON.stringify([...cartData]));
  }


  return (
    <div className="page goodInfo">
      <BaseSwiper
        async
        imgList={imgs}
      />
      <WingBlank size="md">
        <WhiteSpace size="md" />
        <Card>
          <Card.Header title={goodsInfo.title} />
          <Card.Body>
            <p className='market_price'>市场价: ￥ {goodsInfo.market_price}</p>
            <p className='sell_price'>销售价: ￥ {goodsInfo.sell_price}</p>
            <div style={{ paddingLeft: "0.2rem" }}>
              <BaseNumberInput
                label='购买数量'
                initialValue={count}
                _handleChange={((value) => { set_count(value) })}
              />
            </div>
          </Card.Body>
          <Card.Footer
            content={
              <div style={{ display: "flex" }}>
                <Button size="small" type="primary" onClick={() => { Toast.info("暂未开发购买功能", 2) }}>立即购买</Button>
                <Button size="small" type="warning" style={{ marginLeft: 20 }} onClick={addToCar} disabled={loading} >加入购物袋</Button>
              </div>
            }
          />
        </Card>
        <WhiteSpace />
      </WingBlank>

      <WingBlank size="md">
        <WhiteSpace size="md" />
        <Card>
          <Card.Header title="商品参数" />
          <Card.Body>
            <p>商品货号: {goodsInfo.goods_no}</p>
            <p>库存情况: {goodsInfo.stock_quantity}</p>
            <p>上架时间: {transformTime(goodsInfo.add_time)}</p>
          </Card.Body>
          <Card.Footer content={<Button size="small" type="primary" onClick={() => { history.push(`${ROUTE_PATH.COMMENT}/${params.id}`) }}>查看评论</Button>} />
        </Card>
        <WhiteSpace />
      </WingBlank>

    </div>
  )
}


export default React.memo(GoodsInfo);