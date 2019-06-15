import React from 'react';

const setItems = (items = []) => {
    try {
        localStorage.setItem("items", JSON.stringify(items));
    } catch (error) {
        throw error;
    }
};
const getItems = () => {
    const items = JSON.parse(localStorage.getItem("items"));
    return items || [];
};

export function withItemsCache(Comp) {
    const items = getItems();

    return ({ ...props }) => (
        <Comp {...props} items={items} setCache={setItems} />
    );
}