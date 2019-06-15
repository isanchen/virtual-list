import React from 'react';

export function withDnDManager(Comp) {
    class DnDManager extends React.Component {
        state = {}

        handleDrag = (start) => {
            this.setState({ start });
        }

        handleDrop = (end) => {
            if (this.state.start !== end) {
                this.props.onMove(this.state.start, end)
            }
        }

        render() {
            const { forwaredRef, onDragStart, onDrop, ...props } = this.props;
            return (
                <Comp ref={forwaredRef} {...props} onDragStart={this.handleDrag} onDrop={this.handleDrop} />
            );
        }
    }

    return React.forwardRef((props, ref) => <DnDManager forwaredRef={ref} {...props} />);
}