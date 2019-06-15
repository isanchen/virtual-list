import React from 'react';
import './Item.css';

function Item({ content, index, onDelete }) {
    return (
        <div className="item-container">
            <div className="header">
                <div className="title">Index: {index}</div>
                <div className="close-button button" onClick={() => onDelete(index)}>X</div>
            </div>
            <div className="content">{content}</div>
        </div>
    );
}

export { Item };