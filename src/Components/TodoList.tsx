import React, {useCallback} from 'react';
import {Input} from "./Input";
import { TaskType, TodoListsType} from "../App";
import {Update} from "./Update";
import {FullButton} from "./Button";
import styles from './TodoList.module.css'
import {Button, ButtonGroup} from "@mui/material";
import {TaskList} from "./TaskList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../State/store";
import {
    addTaskAC,
    changeFilterAC,
    changeStatusAC,
    removeTaskAC,
    removeTodoListAC, updateTitleTaskAC,
    updateTitleTodoListAC
} from "../State/Action";

type TodoListType = {
    todoLists: TodoListsType
}
export const TodoList = React.memo(({todoLists}:TodoListType) => {

    const {idTDL, titleTDL, filterTDL} = todoLists
    const tasks = useSelector<AppRootStateType,TaskType[]>(state => state.tasks[idTDL])
    const dispatch = useDispatch()

    const onFilterAllHandler = useCallback(() => {dispatch(changeFilterAC(idTDL, 'All'))},[dispatch])
    const onFilterActiveHandler = useCallback(() => {dispatch(changeFilterAC(idTDL, 'Active'))},[dispatch])
    const onFilterCompletedHandler = useCallback(() => {dispatch(changeFilterAC(idTDL, 'Completed'))},[dispatch])

    const addTaskHandler = useCallback((idTDL:string, titleTask: string) => {
        dispatch(addTaskAC(idTDL,titleTask))
    },[dispatch])
    const removeTodoList = useCallback(() => {
        dispatch(removeTodoListAC(idTDL))
    },[dispatch])
    const onUpdateTitleHandler = useCallback((newTitleTasks:string) => {
        dispatch(updateTitleTodoListAC(idTDL, newTitleTasks))
    },[dispatch])

    // let active = props.filterTDL === 'Active' ? ${styles.active} : ${styles.button}


    let TasksForTodoList = tasks
    if (filterTDL === 'Active') {
        TasksForTodoList = TasksForTodoList.filter(el => !el.isDone)
    }
    if (filterTDL === 'Completed') {
        TasksForTodoList = TasksForTodoList.filter(el => el.isDone)
    }

    const removeTask = useCallback((id:string) => {
        dispatch(removeTaskAC(idTDL, id))
    },[dispatch])

    const changeStatus = useCallback((id:string, changeChecked: boolean) => {
        dispatch(changeStatusAC(idTDL, id, changeChecked))
    },[dispatch])

    const updateTask = useCallback((id: string, newTitle: string) => {
        dispatch(updateTitleTaskAC(idTDL, id, newTitle))
    },[dispatch])

    return (
        <div>

                <h3>
                    <Update callBack={onUpdateTitleHandler} title={titleTDL}/>
                    <FullButton callBack={removeTodoList} titleButton={'Del'} />
                </h3>

            <Input callBackInput={(title) => addTaskHandler(idTDL, title)}/>

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
                <Button onClick={onFilterAllHandler} className={filterTDL === 'All' ? `${styles.active}` : `${styles.button}`} style={{border: "white"}}>All</Button>
                <Button onClick={onFilterActiveHandler} className={filterTDL === 'Active' ? `${styles.active}` : `${styles.button}`} style={{border: "white"}}>Active</Button>
                <Button onClick={onFilterCompletedHandler} className={filterTDL === 'Completed' ? `${styles.active}` : `${styles.button}`} >Completed</Button>
            </ButtonGroup>






        </div>
    );
});

