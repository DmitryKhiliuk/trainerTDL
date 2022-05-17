import React, {ChangeEvent, useCallback} from 'react';
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

export const TaskList = React.memo(({tasks, removeTask, changeStatus, updateTask}:TaskListType) => {

            const removeHandler = useCallback(() => {
            removeTask(tasks.id)
        },[removeTask, tasks.id])

            const onChangeHandler = useCallback((e:ChangeEvent<HTMLInputElement>) => {
                let changeChecked = e.currentTarget.checked
                changeStatus(tasks.id,changeChecked)
        },[changeStatus, tasks.id])
            const onUpdateHandler = useCallback((newTitle:string) => {
                updateTask(tasks.id,newTitle)
            }, [updateTask, tasks.id])
            return  <div >
                <Checkbox checked={tasks.isDone} onChange={onChangeHandler} color="default"/>
                {/*<span>{t.titleTask}</span>*/}
                <Update callBack={(newTitle) => onUpdateHandler(newTitle)} title={tasks.titleTask}/>
                <FullButton callBack={removeHandler} titleButton={'Del'} />
            </div>


});

