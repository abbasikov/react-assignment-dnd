import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './TaskList.css';
import Task from "../Task/Task";

import _ from 'lodash';

let tasks = require('../../tasks.json');

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};



const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 8,
    width: 250
});

class TaskList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            allTasks:tasks.tasks,
            loadedTasks:[],
            offset:0
        };
        this.showMore = this.showMore.bind(this);
        this.onChangeCompleted = this.onChangeCompleted.bind(this);
        this.createTask = this.createTask.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    loadTasks(limit){
        let newOffset = this.state.offset + limit;
        let slicedTasks = this.state.allTasks.slice(this.state.offset, newOffset);
        let newTasks = this.state.loadedTasks.concat(slicedTasks);
        this.setState((state, props)=> ({
            loadedTasks : newTasks,
            offset : newOffset,
            showMore: newOffset < state.allTasks.length
        }));
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.loadedTasks,
            result.source.index,
            result.destination.index
        );

        this.setState({
            loadedTasks:items
        });
    }

    componentDidMount() {
        this.loadTasks(5);
    }

    showMore(){
        if(this.state.offset < this.state.allTasks.length){
            this.loadTasks(5);
        }else{
            alert('No more tasks to display');
        }
    }

    onChangeCompleted(taskId,val){
        this.setState((state,props)=>{
            let task = _.find(state.loadedTasks, (o) => o.id === taskId );
            if(task){
                task.completed = val;
            }
            return state;
        });
    }

    createTask(item,index){
        return <Task onChangeCompleted={this.onChangeCompleted} item={item} key={item.id} index={index}/>;
    }

    getTasks(){
        if(this.state.loadedTasks.length<1){
            return (<div>Loading...</div>)
        }else{
            return this.state.loadedTasks.map(this.createTask);
        }
    }

    render() {
        return (

            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            <ul className="theList" style={{
                                background: "lightgrey",
                                padding: 8,
                                width: 500
                            }}>
                                {this.getTasks()}
                                <button  onClick={this.showMore} className="show-more">Show More</button>
                            </ul>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

        );
    }
}

export default TaskList;