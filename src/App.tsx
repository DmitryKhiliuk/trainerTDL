import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList";
import {v1} from "uuid";
import {Input} from "./Components/Input";

export type FilterTodoList = 'All' | 'Active' | 'Completed'

export type TodoListsType = {
    idTDL: string
    titleTDL: string
    filterTDL: FilterTodoList
}

export type TaskType = {
    id: string
    titleTask: string
    isDone: boolean
}

export type TaskObjectType = {
    [key: string]: TaskType[]
}


function App() {

    let todoListID1 = v1()
    let todoListID2 = v1()
    const [todoLists, setTodoLists] = useState<TodoListsType[]>([
        {idTDL:todoListID1, titleTDL: 'What to buy?', filterTDL: 'All'},
        {idTDL:todoListID2, titleTDL: 'What to do?', filterTDL: 'All'}
        ]
    )
    const [tasks, setTasks] = useState<TaskObjectType>({
        [todoListID1]:[
            {id:v1(), titleTask:'Milk', isDone: true},
            {id:v1(), titleTask:'Salt', isDone: false}
        ],
        [todoListID2]:[
            {id:v1(), titleTask:'to sleep', isDone: true},
            {id:v1(), titleTask:'to walk', isDone: false}
        ]
    })

    const removeTask = (todoListID:string, id:string) => {
        setTasks({...tasks, [todoListID]:tasks[todoListID].filter(el => el.id !== id)})
    }
    const addTask = (todoListID:string, title:string) => {
        const newTask = {id:v1(), titleTask: title, isDone: false}
        setTasks({...tasks, [todoListID]:[newTask, ...tasks[todoListID]]})
    }
    const changeFilter = (id:string, filter:FilterTodoList) => {
        setTodoLists(todoLists.map(el => el.idTDL === id ? {...el,filterTDL:filter}:el))
    }
    const changeStatus = (todoListID:string, id:string, isDone:boolean) => {
        setTasks({...tasks, [todoListID]:tasks[todoListID].map(el => el.id === id ? {...el,isDone:isDone}:el)})
    }
    const removeTodoList = (todoListID:string) => {
        setTodoLists(todoLists.filter(el => el.idTDL !== todoListID))
        delete tasks[todoListID]
    }
    const addTodoListHandler = (title: string) => {
        let newId = v1();
        setTodoLists([{idTDL:newId, titleTDL: title, filterTDL: 'All'}, ...todoLists])
        setTasks({...tasks, [newId]:[]})
    }
    const updateTask = (todoListID:string, id:string, newTitle:string) => {
        setTasks({...tasks, [todoListID]:tasks[todoListID].map(el => el.id === id ? {...el, titleTask: newTitle} : el)})
    }
    const updateTitleTasks = (id: string, newTitleTasks: string) => {
        setTodoLists(todoLists.map(el => el.idTDL === id ? {...el, titleTDL:newTitleTasks} : el))
    }

  return (
    <div className="App">
        <Input callBackInput={addTodoListHandler}/>
        {todoLists.map((el) => {
            let TasksForTodoList = tasks[el.idTDL]
            if (el.filterTDL === 'Active') {
                TasksForTodoList = TasksForTodoList.filter(el => !el.isDone)
            }
            if (el.filterTDL === 'Completed') {
                TasksForTodoList = TasksForTodoList.filter(el => el.isDone)
            }

            return <TodoList tasks={TasksForTodoList}
                             todoLists={todoLists}
                             idTDL={el.idTDL}
                             key={el.idTDL}
                             titleTDL={el.titleTDL}
                             filterTDL={el.filterTDL}
                             removeTask={removeTask}
                             addTask={addTask}
                             changeFilter={changeFilter}
                             changeStatus={changeStatus}
                             removeTodoList={removeTodoList}
                             updateTask={updateTask}
                             updateTitleTasks={updateTitleTasks}/>
        })}






    </div>
  );
}

export default App;
