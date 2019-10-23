import React from 'react';
import './Task.css';
import {Draggable} from "react-beautiful-dnd";

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 16,
    margin: `0 0 8px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});


class Task extends React.Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(item){
        this.props.onChangeCompleted(item.id, !item.completed)
    }

    render() {
        return (
            <Draggable key={this.props.item.id} draggableId={this.props.item.id} index={this.props.index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}
                    >
                        <li style={{textDecoration: this.props.item.completed ? "line-through" : "none"}}>
                            <input type="checkbox" checked={this.props.item.completed} onChange={
                                (e)=> this.handleClick(this.props.item)
                            }/>
                            {this.props.item.details}
                        </li>
                    </div>
                )}
            </Draggable>
        );
    }
}

export default Task;