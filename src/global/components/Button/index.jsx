import React from 'react';
import './style.css';

function Button({ value, onClick, width, padding, border }) {
  return (
    <div>
      <button
        className={`button-comp ${border && 'border'}`}
        onClick={onClick}
        style={{ width: width, padding: padding && padding }}>
        {value}
      </button>
    </div>
  );
}

export default Button;
