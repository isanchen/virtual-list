import React from 'react';
import './Button.css';

function Button({ label, onClick }) {
    return (
        <div className="button" onClick={onClick} tabIndex={0}>
            {label}
        </div>
    );
}

export { Button };