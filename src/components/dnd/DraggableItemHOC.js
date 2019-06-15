import React from 'react';

function preventDefault(ev) {
    ev.preventDefault();
}

export function withDraggable(Comp) {
    return ({ onDragStart, onDrop, ...props }) => (
        <div className="draggable-item" draggable="true" onDragStart={onDragStart} onDrop={onDrop} onDragOver={preventDefault}>
            <Comp {...props} />
        </div>
    );
}