import React, { useState } from 'react';

import { Carousel } from 'antd-mobile';

import { themeColor } from '@/global';



function BaseSwiper({ imgList, async }) {

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
          <div
            key={val + index}
            style={{ display: 'inline-block', width: '100%', height: imgHeight }}
          >
            <img
              src={!async ? `https://zos.alipayobjects.com/rmsportal/${val}.png` : val.src}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                set_imgHeight('auto')
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

BaseSwiper.defaultProps = {
  async: false
}

export default BaseSwiper 