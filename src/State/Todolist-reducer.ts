import {TodoListsType} from "../App";
import {v1} from "uuid";
import {ActionType} from "./Action";




export let todoListID1 = v1()
export let todoListID2 = v1()
let initialState: TodoListsType[] = [
    {idTDL:todoListID1, titleTDL: 'What to buy?', filterTDL: 'All'},
    {idTDL:todoListID2, titleTDL: 'What to do?', filterTDL: 'All'}
]

export const todoListReducer = (state:TodoListsType[] = initialState, action:ActionType):TodoListsType[] => {
  switch (action.type) {
      case "REMOVE-TODOLIST": {
          return state.filter(el => el.idTDL !== action.idTDL)
      }
      case 'ADD-TODOLIST': {
          /*let newTodoList = {idTDL: action.idTDL,titleTDL: action.titleTDL,filterTDL: 'All'}*/
          return [{idTDL: action.idTDL,titleTDL: action.titleTDL,filterTDL: 'All'}, ...state]
      }
      case 'CHANGE-FILTER': {
          return state.map(el => el.idTDL === action.idTDL ? {...el, filterTDL: action.filterTDL}:el)
      }
      case 'UPDATE-TITLE-TDL': {
          return state.map(el => el.idTDL === action.idTDL ? {...el, titleTDL: action.newTitleTasks}:el)
      }
      default: return state
  }

}

