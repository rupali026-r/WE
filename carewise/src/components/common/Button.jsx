import React from 'react';

const Button = ({ 
  children, 
  type = 'button', 
  disabled = false, 
  className = '', 
  onClick,
  ...props 
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`btn ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;