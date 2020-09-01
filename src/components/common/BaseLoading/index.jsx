import React from 'react';
import { themeColor, fontSize } from "@/global";

import './index.less';

const BaseLoading = () => {
  return (
    <div
      className="myLoading"
      style={{
        color: themeColor,
        fontSize: fontSize,
        textAlign: 'center',
        margin: '.1rem 0'
      }}>
      <div className="k-line k-line11-1" />
      <div className="k-line k-line11-2" />
      <div className="k-line k-line11-3" />
      <div className="k-line k-line11-4" />
    </div>
  )
}
export default BaseLoading; 