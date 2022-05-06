import React from 'react';
import './button.css';

export const Button = ({className, value, btnType, btnName}) => {
  return (
    <div>
        <button 
            className={className}
            type={btnType}
            name={btnName}> 
            {value}
        </button>
    </div>
  )
}
