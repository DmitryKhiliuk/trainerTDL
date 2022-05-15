import React, {ChangeEvent} from 'react';
import {Input} from "./Input";
import {FilterTodoList, TaskType, TodoListsType} from "../App";
import {Update} from "./Update";
import {FullButton} from "./Button";
import styles from './TodoList.module.css'
import {Button, ButtonGroup, Checkbox, StyledEngineProvider} from "@mui/material";






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

    return (
        <div>

                <h3>
                    <Update callBack={onUpdateTitleHandler} title={props.titleTDL}/>
                    <FullButton callBack={onRemoveTodoListHandler} titleButton={'Del'} />
                </h3>

            <Input callBackInput={(title) => addTaskHandler(props.idTDL, title)}/>

            <ul>
                {TasksForTodoList.map(t => {
                    const removeHandler = () => {
                        props.removeTask(props.idTDL, t.id)
                    }
                    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(props.idTDL,t.id,e.currentTarget.checked)
                    }
                    const onUpdateHandler = (newTitle:string) => {
                      props.updateTask(props.idTDL,t.id,newTitle)
                    }
                    return  <li key={t.id}>
                        <Checkbox checked={t.isDone} onChange={onChangeHandler} color="default"/>
                        {/*<span>{t.titleTask}</span>*/}
                        <Update callBack={(newTitle) => onUpdateHandler(newTitle)} title={t.titleTask}/>
                        <FullButton callBack={removeHandler} titleButton={'Del'} />
                    </li>
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

