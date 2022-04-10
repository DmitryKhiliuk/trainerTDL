import React, {ChangeEvent} from 'react';
import {Input} from "./Input";
import {FilterTodoList, TaskType, TodoListsType} from "../App";
import {Button} from "./Button";
import {Update} from "./Update";



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

    return (
        <div>

                <h3>
                    <Update callBack={onUpdateTitleHandler} title={props.titleTDL}/>
                    <Button callBack={onRemoveTodoListHandler} titleButton={'Del'} classButton={''}/>
                </h3>

            <Input callBackInput={(title) => addTaskHandler(props.idTDL, title)}/>
            <ul>
                {props.tasks.map(t => {
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
                        <input type={"checkbox"}
                               checked={t.isDone}
                               onChange={onChangeHandler}/>
                        {/*<span>{t.titleTask}</span>*/}
                        <Update callBack={(newTitle) => onUpdateHandler(newTitle)} title={t.titleTask}/>
                        <Button callBack={removeHandler} titleButton={'Del'} classButton={''}/>
                    </li>
                })}
            </ul>
            <Button callBack={onFilterAllHandler} titleButton={'All'} classButton={props.filterTDL==='All'?'colorButton':''}/>
            <Button callBack={onFilterActiveHandler} titleButton={'Active'} classButton={props.filterTDL==='Active'?'colorButton':''}/>
            <Button callBack={onFilterCompletedHandler} titleButton={'Completed'} classButton={props.filterTDL==='Completed'?'colorButton':''}/>
        </div>
    );
};

