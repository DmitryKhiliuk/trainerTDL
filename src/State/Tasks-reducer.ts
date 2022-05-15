import {TaskObjectType} from "../App";
import {v1} from "uuid";
import {todoListID1, todoListID2} from "./Todolist-reducer";

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

export const tasksReducer = (state:TaskObjectType = initialState, action:any) => {

}