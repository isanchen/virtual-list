import React, { Component } from 'react';
import './List.css';
import { List as VList, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import { Item } from './Item';
import { withDraggable } from './dnd/DraggableItemHOC';

const DNDItem = withDraggable(Item);

class List extends Component {
    cache = new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 100
    });

    deleteItem = (index) => this.props.onDeleteItem(index);

    scrollToRow = (index) => this.list.scrollToRow(index);

    render() {
        const Row = ({ index, key, style, parent }) => (
            <CellMeasurer
                key={key}
                cache={this.cache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}>
                <div style={style} className="row">
                    <DNDItem index={index} content={this.props.items[index]} onDelete={this.deleteItem}
                        onDragStart={() => this.props.onDragStart(index)} onDrop={() => this.props.onDrop(index)} />
                </div>
            </CellMeasurer>
        );

        return (
            <div className="list-container" onScroll={this.props.onScroll}>
                <AutoSizer>
                    {
                        ({ width, height }) => {
                            return <VList
                                ref={ref => this.list = ref}
                                width={width}
                                height={height}
                                deferredMeasurementCache={this.cache}
                                rowHeight={this.cache.rowHeight}
                                rowRenderer={Row}
                                rowCount={this.props.items.length}
                                overscanRowCount={30} />
                        }
                    }
                </AutoSizer>
            </div>
        );
    }
}

export { List };