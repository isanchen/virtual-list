import React from 'react';
import './Input.css';

function Input({ placeholder, value, onChange }) {
    return (
        <input className="input" type="number" placeholder={placeholder} value={value} onChange={onChange} />
    );
}

export { Input };