import React, { useState, useEffect } from 'react';

import { Flex, Card, Button, Toast, SwipeAction, Checkbox, InputItem } from 'antd-mobile';

import BaseNumberInput from '../../components/common/BaseNumberInput';
import { COMMENT } from '../../httpConfig/api';
import http from '../../httpConfig/http';

import './index.less';

const CheckboxItem = Checkbox.CheckboxItem;

function CartItem({ cart, handleChange }) {

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
              <Flex.Item style={{ flex: 3 }}>
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
}

function Cart() {

  // 看成异步请求的
  const [cartData, set_cartData] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
  const [totalPrice, set_totalPrice] = useState(0);

  useEffect(() => {
    console.log(cartData);
    let price = 0;
    cartData.forEach(ele => {
      if (ele.selected) {
        price = price + ele.count * ele.sell_price
      }
    })
    set_totalPrice(price);
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
    localStorage.setItem('cart', JSON.stringify([...cartData]));
  }

  return (
    <div className="page cart">
      {
        cartData.map(item =>
          <CartItem
            key={item.id}
            cart={item}
            handleChange={changeCarts}
          />
        )
      }
      <Button type="warning">去结算: ￥ {totalPrice}</Button>
    </div>
  )
}

export default Cart;