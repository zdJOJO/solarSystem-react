import React, { useState } from 'react';

import { Carousel } from 'antd-mobile';

import { themeColor } from '@/global';



function BaseSwiper({ imgList }) {

  const [imgHeight, set_imgHeight] = useState(200)

  return (
    <div>
      <Carousel
        autoplay={true}
        infinite
        dotActiveStyle={{
          background: themeColor
        }}
        beforeChange={(from, to) => {
          // console.log(`slide from ${from} to ${to}`)
        }}
        afterChange={index => {
          // console.log('slide to', index)
        }}
      >
        {imgList.map((val, index) => (
          <a
            key={val}
            href="#"
            style={{ display: 'inline-block', width: '100%', height: imgHeight }}
          >
            <img
              src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                set_imgHeight('auto')
              }}
            />
          </a>
        ))}
      </Carousel>
    </div>
  )
}

export default BaseSwiper 