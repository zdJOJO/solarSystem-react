import React, { useState, useEffect, useContext } from 'react';

import { Flex, Card, Button, SwipeAction, Checkbox } from 'antd-mobile';

import BaseNumberInput from '../../components/common/BaseNumberInput/index';
import BaseEmpety from '../../components/common/BaseEmpety';
import { GOODS } from '../../httpConfig/api';
import http from '../../httpConfig/http';
import AppDispatch from '../bus';

import './index.less';

const CheckboxItem = Checkbox.CheckboxItem;

// 购物车颗粒组件



const MemoCartItem = React.memo(function CartItem({ cart, handleChange }) {

  const [isChecked, set_isChecked] = useState(cart.selected)

  return (
    <div className="cartItemBox">
      <SwipeAction
        style={{ backgroundColor: 'gray' }}
        autoClose
        right={[
          {
            text: '取消',
            onPress: () => console.log('cancel'),
            style: { backgroundColor: '#ddd', color: 'white' },
          },
          {
            text: '删除',
            onPress: () => {
              handleChange('delete', cart.id)
            },
            style: { backgroundColor: '#F4333C', color: 'white' },
          },
        ]}
        onOpen={() => console.log('global open')}
        onClose={() => console.log('global close')}
      >
        <Card>
          <Card.Header
            title={cart.title}
            thumb={cart.thumb_path}
            thumbStyle={{
              width: "1.5rem",
              height: "1.5rem"
            }}
            style={{
              fontSize: "0.3rem"
            }}
          />
          <Card.Body
            style={{
              fontSize: "0.26rem",
              minHeight: "20px",
              display: "flex"
            }}
          >
            <Flex align="start">
              <Flex.Item style={{ flex: 1 }}>
                <CheckboxItem
                  checked={isChecked}
                  onChange={() => {
                    set_isChecked(!isChecked)
                    handleChange('select', cart.id)
                  }}
                />
              </Flex.Item>
              <Flex.Item style={{ flex: 2 }}>
                <p className="flex-item price">价格：{cart.sell_price}</p>
              </Flex.Item>
              <Flex.Item style={{ flex: 4 }}>
                <BaseNumberInput
                  label="数量:"
                  initialValue={cart.count}
                  _handleChange={(value) => {
                    handleChange('changeNum', cart.id, value)
                  }}
                />
              </Flex.Item>
            </Flex>
          </Card.Body>
        </Card>
      </SwipeAction>
    </div>
  )
});

function Cart() {

  // 看成异步请求的
  const [cartData, set_cartData] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
  const [cartIds, set_cartIds] = useState([]);
  const [totalPrice, set_totalPrice] = useState(0);
  const [totalNum, set_totalNum] = useState(0);

  const dispatch = useContext(AppDispatch);

  // 结算商品总数 | 总价格  type: price |  totalNum
  const calculateTotalNum = (type) => {
    let price = 0;
    let num = 0;
    cartData.forEach(ele => {
      if (ele.selected) {
        num += ele.count
        price += ele.count * ele.sell_price;
      }
    })
    if (type === "price") {
      return price
    } else if (type === "totalNum") {
      return num
    }
  }

  useEffect(() => {
    let unmounted = false;
    let ids = cartData.map(ele => ele.id).join(',');
    if (ids.length === 0) return;
    const getThumbImgs = async () => {
      const result = http.get(`${GOODS.CART_LIST}${ids}`);
      if (!!result && result.length > 0) {
        result.forEach(k => {
          cartData.forEach((ele, index) => {
            if (k.id === ele.id) {
              cartData[index] = {
                ...cartData[index],
                thumb_path: k.thumb_path
              }
            }
          })
        });
        set_cartData([...cartData]);
        set_cartIds(ids);
      }
    }
    getThumbImgs();
    return () => {
      unmounted = true;
    }
  }, [cartIds])

  useEffect(() => {
    let price = 0;
    let num = 0;
    cartData.forEach(ele => {
      if (ele.selected) {
        num += ele.count
        price += ele.count * ele.sell_price;
      }
    })
    set_totalPrice(calculateTotalNum('price'));
    set_totalNum(calculateTotalNum('totalNum'));
  }, [cartData]);

  const changeCarts = (type, id, _value) => {
    if (type === 'select') {
      cartData.forEach((ele, index) => {
        if (ele.id === id) {
          cartData[index].selected = !ele.selected;
        }
      })
    } else if (type === 'delete') {
      cartData.forEach((ele, index) => {
        if (ele.id === id) {
          cartData.splice(index, 1)
        }
      })
    } else if (type === 'changeNum') {
      cartData.forEach((ele, index) => {
        if (ele.id === id) {
          cartData[index].count = _value;
        }
      })
    }
    set_cartData([...cartData]);
    dispatch({ type: 'SET_TOTALNUM', cartTotalNum: calculateTotalNum('totalNum') });
    localStorage.setItem('cart', JSON.stringify([...cartData]));
  }

  return (
    <div className='page cart'>
      {
        cartData.map(item =>
          <MemoCartItem
            key={item.id}
            cart={item}
            handleChange={changeCarts}
          />
        )
      }
      {cartData.length !== 0 && <Button type="warning">去结算( {totalNum} ) ￥ {totalPrice}</Button>}
      {cartData.length === 0 && <BaseEmpety text="您的购物包空空如也" />}
    </div>
  )
}

export default React.memo(Cart);