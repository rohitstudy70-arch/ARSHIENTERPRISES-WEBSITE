/**
 * Reusable Button Component
 */

import React from 'react';

export const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as: Component = 'button',
  ...props
}, ref) => {
  const baseStyles =
    'font-semibold rounded transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center text-center';

  const variants = {
    primary: 'bg-primary text-white hover:bg-opacity-90',
    secondary: 'bg-secondary text-white hover:bg-opacity-90',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'text-primary hover:bg-primary hover:text-white hover:bg-opacity-10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <Component
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
});

export default Button;
