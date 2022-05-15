import {TodoListsType} from "../App";
import {v1} from "uuid";
import {ActionType} from "./Action";



export let todoListID1 = v1()
export let todoListID2 = v1()
let initialState: TodoListsType[] = [
    {idTDL:todoListID1, titleTDL: 'What to buy?', filterTDL: 'All'},
    {idTDL:todoListID2, titleTDL: 'What to do?', filterTDL: 'All'}
]

export const todoListReducer = (state:TodoListsType[] = initialState, action:ActionType) => {
  switch (action.type) {
      case "REMOVE-TODOLIST": {
          return state.filter(el => el.idTDL !== action.payload.todoListID)
      }
      default: return state
  }

}

