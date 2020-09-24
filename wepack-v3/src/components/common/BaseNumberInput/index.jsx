
import React, { useState } from 'react';

import './index.less';

function BaseNumberInput({ label, initialValue, _handleChange }) {

  const [value, set_value] = useState(initialValue)

  const handleChange = (value) => {
    value = parseInt(value)
    if (!isNaN(value) && value >= 1) {
      set_value(value);
      _handleChange(value)
    }
  }

  return (
    <div className="numberInputBox" >
      <div className="inpitLabel">{label}</div>
      <div className="inputContainer">
        <div><button className="subtract" disabled={value === 1} onClick={(event) => handleChange(value - 1)} >-</button></div>
        <div>
          <input
            type='text'
            placeholder="请输入"
            value={value}
            onChange={(event) => handleChange(event.target.value)}
          />
        </div>
        <div><button className="add" onClick={(event) => handleChange(value + 1)}>+</button></div>
      </div>
    </div >
  )
}

export default BaseNumberInput;