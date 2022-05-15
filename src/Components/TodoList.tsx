import React, {ChangeEvent} from 'react';
import {Input} from "./Input";
import {FilterTodoList, TaskType, TodoListsType} from "../App";
import {Update} from "./Update";
import {FullButton} from "./Button";
import styles from './TodoList.module.css'
import {Button, ButtonGroup, Checkbox, StyledEngineProvider} from "@mui/material";
import {TaskList} from "./TaskList";






type TodoListType = {
    tasks:Array<TaskType>
    todoLists: TodoListsType[]
    idTDL:string
    titleTDL:string
    filterTDL: FilterTodoList
    removeTask: (todoListID:string, id:string) => void
    addTask: (todoListID:string, title:string) => void
    changeFilter: (id:string, filter: FilterTodoList) => void
    changeStatus: (todoListID:string, id:string, isDone:boolean) => void
    removeTodoList: (todoListID:string) => void
    updateTask: (todoListID:string, id:string, newTitle:string) => void
    updateTitleTasks: (id: string, newTitleTasks: string) => void

}




export const TodoList = (props:TodoListType) => {

    const onFilterAllHandler = () => {props.changeFilter(props.idTDL,'All')}
    const onFilterActiveHandler = () => {props.changeFilter(props.idTDL,'Active')}
    const onFilterCompletedHandler = () => {props.changeFilter(props.idTDL,'Completed')}



    const addTaskHandler = (todoListID:string, title:string) => {
        props.addTask(props.idTDL, title)
    }
    const onRemoveTodoListHandler = () => {
        props.removeTodoList(props.idTDL)
    }
    const onUpdateTitleHandler = (newTitleTasks:string) => {
        props.updateTitleTasks(props.idTDL, newTitleTasks)
    }

    // let active = props.filterTDL === 'Active' ? ${styles.active} : ${styles.button}


    let TasksForTodoList = props.tasks
    if (props.filterTDL === 'Active') {
        TasksForTodoList = TasksForTodoList.filter(el => !el.isDone)
    }
    if (props.filterTDL === 'Completed') {
        TasksForTodoList = TasksForTodoList.filter(el => el.isDone)
    }

    const removeTask = (id:string) => {
        props.removeTask(props.idTDL, id)
    }

    const changeStatus = (id:string, changeChecked: boolean) => {
        props.changeStatus(props.idTDL, id, changeChecked)
    }

    const updateTask = (id: string, newTitle: string) => {
        props.updateTask(props.idTDL, id, newTitle)
    }

    return (
        <div>

                <h3>
                    <Update callBack={onUpdateTitleHandler} title={props.titleTDL}/>
                    <FullButton callBack={onRemoveTodoListHandler} titleButton={'Del'} />
                </h3>

            <Input callBackInput={(title) => addTaskHandler(props.idTDL, title)}/>

            <ul>
                {TasksForTodoList.map(t => {
                    return <TaskList key={t.id}
                                     tasks={t}
                                     removeTask={removeTask}
                                     changeStatus={changeStatus }
                                     updateTask={updateTask}/>
                })}
            </ul>



            {/*<ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={onFilterAllHandler} className={props.filterTDL === 'All' ? `${styles.active}` : `${styles.button}`} style={{border: "white"}}>All</Button>
                <Button onClick={onFilterActiveHandler} className={props.filterTDL === 'Active' ? `${styles.active}` : `${styles.button}`} style={{border: "white"}}>Active</Button>
                <Button onClick={onFilterCompletedHandler} className={props.filterTDL === 'Completed' ? `${styles.active}` : `${styles.button}`} >Completed</Button>
            </ButtonGroup>*/}

            <ButtonGroup variant="contained" aria-label="outlined primary button group" >
                <Button onClick={onFilterAllHandler} className={props.filterTDL === 'All' ? `${styles.active}` : `${styles.button}`} style={{border: "white"}}>All</Button>
                <Button onClick={onFilterActiveHandler} className={props.filterTDL === 'Active' ? `${styles.active}` : `${styles.button}`} style={{border: "white"}}>Active</Button>
                <Button onClick={onFilterCompletedHandler} className={props.filterTDL === 'Completed' ? `${styles.active}` : `${styles.button}`} >Completed</Button>
            </ButtonGroup>






        </div>
    );
};

