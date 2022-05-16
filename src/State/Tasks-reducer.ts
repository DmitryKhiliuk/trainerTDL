import {TaskObjectType} from "../App";
import {v1} from "uuid";
import {todoListID1, todoListID2} from "./Todolist-reducer";
import {ActionType} from "./Action";

let initialState:TaskObjectType = {
    [todoListID1]:[
        {id:v1(), titleTask:'Milk', isDone: true},
        {id:v1(), titleTask:'Salt', isDone: false}
    ],
    [todoListID2]:[
        {id:v1(), titleTask:'to sleep', isDone: true},
        {id:v1(), titleTask:'to walk', isDone: false}
    ]
}

export const tasksReducer = (state:TaskObjectType = initialState, action:ActionType):TaskObjectType => {
    switch (action.type){
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.idTDL]
            return stateCopy;
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.idTDL]:[]}
        }
        case 'ADD-TASK': {
            let newTask = {id:v1(), titleTask:action.titleTask, isDone: false}
            return {...state, [action.idTDL]: [newTask, ...state[action.idTDL]]}
        }
        case 'REMOVE-TASK': {
            return {...state, [action.idTDL]: state[action.idTDL].filter(el => el.id !== action.id)}
        }
        case 'CHANGE-STATUS': {
            return {...state, [action.idTDL]: state[action.idTDL].map(el => el.id === action.id ? {...el,isDone:action.isDone}:el)}
        }
        case 'UPDATE-TITLE-TASK': {
            return {...state, [action.idTDL]: state[action.idTDL].map(el => el.id === action.id ? {...el,titleTask:action.newTitle}:el)}
        }
        default: return state

    }
}