

import React from 'react';

import './index.less';

const baseStyle = {
  margin: 0,
  backgroundColor: "rgb(239, 239, 239)",
};

const Default = ({ width, height }) => (
  <div
    className="skeleton-square"
    style={{
      ...baseStyle,
      width,
      height
    }}
  />
)

const Square = ({ width, height }) => (
  <div
    className="skeleton-square"
    style={{
      ...baseStyle,
      width,
      height: width
    }}
  />
)

const Circle = ({ width, height }) => (
  <div
    className="skeleton-square"
    style={{
      ...baseStyle,
      width,
      height: width,
      borderRadius: '50%'
    }}
  />
)

const BaseSkeleton = ({ type, width, height, padding }) => {
  let component = <Default width={width} height={height} />;
  if (type === 'square') {
    component = <Square width={width} height={width} />
  } else if (type === 'circle') {
    component = <Circle width={width} height={width} />
  }
  return (
    <div className="skeleton-loading">
      <div className="skeleton-bac-animation" />
      <div
        className="skeleton-row"
        style={{
          width: 'auto',
          padding,
          justifyContent: 'flex-start'
        }}
      >
        <div className="skeleton-square-wrap">
          {component}
        </div>
      </div>
    </div>
  )
}

BaseSkeleton.defaultProps = {
  type: "default",  // default | square | circle
  width: "4rem",
  height: "0.4rem",
  padding: "0.2rem 0.2rem 0 0"
}

export default BaseSkeleton;