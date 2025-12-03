import React from 'react';

/**
 * Button
 * Props:
 *  - children
 *  - onClick
 *  - disabled
 *  - variant: 'primary' | 'secondary' | 'ghost'
 *  - style: object
 */
export default function Button({ children, onClick, disabled = false, variant = 'primary', style = {} }) {
  const base = {
    padding: '10px 14px',
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
  };

  const variants = {
    primary: { background: '#0a84ff', color: '#fff' },
    secondary: { background: '#f3f4f6', color: '#111' },
    ghost: { background: 'transparent', color: '#0a84ff', border: '1px solid #0a84ff' }
  };

  const applied = { ...base, ...(variants[variant] || variants.primary), ...style };

  return (
    <button onClick={onClick} disabled={disabled} style={applied}>
      {children}
    </button>
  );
}
