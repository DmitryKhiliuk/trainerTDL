import {v1} from "uuid";
import {FilterTodoList} from "../App";

export type ActionType = RemoveTodoListACType |
                            addTodoListACType |
                            changeFilterType |
                            updateTitleTodoListType |
                            addTaskACType |
                            removeTaskACType |
                            changeStatusACType |
                            updateTitleTaskACType


export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (idTDL:string) => {
    return {
        type: 'REMOVE-TODOLIST',
        idTDL
    } as const
}

export type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (titleTDL:string) => {
    return {
        type: 'ADD-TODOLIST',
        titleTDL,
        idTDL: v1()
    } as const
}

export type changeFilterType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (idTDL:string, filterTDL:FilterTodoList) => {
    return {
        type: 'CHANGE-FILTER',
        idTDL,
        filterTDL
    } as const
}

export type updateTitleTodoListType = ReturnType<typeof updateTitleTodoListAC>
export const updateTitleTodoListAC = (idTDL:string, newTitleTasks: string) => {
    return {
        type: 'UPDATE-TITLE-TDL',
        idTDL,
        newTitleTasks
    } as const
}

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (idTDL:string, titleTask: string) => {
    return {
        type: 'ADD-TASK',
        idTDL,
        titleTask
    } as const
}

export type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (idTDL:string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        idTDL,
        id
    } as const
}

export type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (idTDL:string, id: string, isDone: boolean) => {
    return {
        type: 'CHANGE-STATUS',
        idTDL,
        id,
        isDone
    } as const
}

export type updateTitleTaskACType = ReturnType<typeof updateTitleTaskAC>
export const updateTitleTaskAC = (idTDL:string, id: string, newTitle: string) => {
    return {
        type: 'UPDATE-TITLE-TASK',
        idTDL,
        id,
        newTitle
    } as const
}