
import React, { useState } from 'react';



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
      <span>{label}</span>
      <p>
        <input
          type='text'
          placeholder="请输入"
          value={value}
          onChange={(event) => handleChange(event.target.value)}
        /></p>
    </div >
  )
}

export default BaseNumberInput;