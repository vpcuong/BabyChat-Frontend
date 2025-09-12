import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`bg-primary text-white py-2 rounded hover:bg-primary transition-colors cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 