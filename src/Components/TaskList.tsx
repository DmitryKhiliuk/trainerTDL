import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";
import {Update} from "./Update";
import {FullButton} from "./Button";
import {TaskType} from "../App";

type TaskListType = {
    tasks: TaskType
    removeTask: (id: string) => void
    changeStatus: (id: string, changeChecked: boolean) => void
    updateTask: (id: string, newTitle: string) => void
}

export const TaskList = (props:TaskListType) => {

            const removeHandler = () => {
            props.removeTask(props.tasks.id)
        }

            const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                let changeChecked = e.currentTarget.checked
                props.changeStatus(props.tasks.id,changeChecked)
        }
            const onUpdateHandler = (newTitle:string) => {
                props.updateTask(props.tasks.id,newTitle)
            }
            return  <li >
                <Checkbox checked={props.tasks.isDone} onChange={onChangeHandler} color="default"/>
                {/*<span>{t.titleTask}</span>*/}
                <Update callBack={(newTitle) => onUpdateHandler(newTitle)} title={props.tasks.titleTask}/>
                <FullButton callBack={removeHandler} titleButton={'Del'} />
            </li>


};

