import React from 'react';
import './App.css';
import { List } from './components/List';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { gererateItemsFromText } from './helpers';
import { withItemsCache } from './components/ItemsCacheHOC';
import { withDnDManager } from './components/dnd/DnDManagerHOC';

const DNDList = withDnDManager(List);

class App extends React.Component {
    state = {
        count: "",
        items: this.props.items
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    list = React.createRef()

    updateCount = (e) => this.setState({ count: e.target.value })

    generateItems = () => {
        const newItems = gererateItemsFromText(this.state.count);

        const items = this.state.items.concat(newItems);

        try {
            this.props.setCache(items);
        } catch (error) {
            alert(error);
            return;
        }

        this.setState({
            items
        }, this.scrollToBottom);
    }

    reset = () => {
        const items = [];

        this.setState({
            count: "",
            items
        });

        this.props.setCache(items);
    }

    deleteItem = (index) => {
        this.state.items.splice(index, 1);

        const items = [...this.state.items];

        this.setState({
            items
        });

        this.props.setCache(items);
    }

    handleScroll = ({ target }) => {
        const { scrollTop, scrollHeight, clientHeight } = target;

        if (scrollHeight - scrollTop > clientHeight) {
            this.setState({ showBackToBottom: true });
        }
        
    }

    scrollToBottom = () => {
        this.setState({ showBackToBottom: false });

        this.list.current.scrollToRow(this.state.items.length - 1)
    };

    handleMove = (start, end) => {
        console.log(start, end);
        const items = [...this.state.items];
        const removed = items.splice(start, 1);
        if (start > end) {
            items.splice(end + 1, 0, removed[0]);
        }
        else {
            items.splice(end - 1, 0, removed[0]);
        }
        this.setState({ items });
        this.props.setCache(items);
    }

    render() {
        const { count, items } = this.state;

        return (
            <div className="App">
                <div className="form">
                    <Input placeholder="# of items" value={count} onChange={this.updateCount} />
                    <Button label="Generate" onClick={this.generateItems} />
                    <Button label="Reset" onClick={this.reset} />
                    {!!this.state.showBackToBottom && <Button label="Back To Bottom" onClick={this.scrollToBottom} />}
                </div>
                <DNDList ref={this.list} items={items} onDeleteItem={this.deleteItem} onScroll={this.handleScroll} onMove={this.handleMove} />
            </div>
        );
    }
}



export default withItemsCache(App);
