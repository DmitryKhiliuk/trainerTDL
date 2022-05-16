import {combineReducers, createStore} from "redux";
import {todoListReducer} from "./Todolist-reducer";
import {tasksReducer} from "./Tasks-reducer";

export const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer
});

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>