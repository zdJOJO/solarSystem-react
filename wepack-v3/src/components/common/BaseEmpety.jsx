import React from 'react';

const BaseEmpety = ({ text }) => {
  return (
    <div
      className="myBaseEmpety"
      style={{
        color: '#b8b8b9',
        backgroundColor: '#f5f5f9',
        textAlign: 'center',
        fontSize: '0.36rem',
        width: '100vw',
        marginTop: '2.5rem'
      }}>
      {text || '空空如也'}
    </div>
  )
}
export default BaseEmpety; 