import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList";
import {v1} from "uuid";
import {Input} from "./Components/Input";
import {Container, Grid, Paper, StyledEngineProvider} from "@mui/material";
import {Header} from "./Components/Header";

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

    const changeStatus = (todoListID:string, id:string, isDone:boolean) => {
        setTasks({...tasks, [todoListID]:tasks[todoListID].map(el => el.id === id ? {...el,isDone:isDone}:el)})
    }

    const updateTask = (todoListID:string, id:string, newTitle:string) => {
        setTasks({...tasks, [todoListID]:tasks[todoListID].map(el => el.id === id ? {...el, titleTask: newTitle} : el)})
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



    const changeFilter = (id:string, filter:FilterTodoList) => {
        setTodoLists(todoLists.map(el => el.idTDL === id ? {...el,filterTDL:filter}:el))
    }
    const updateTitleTasks = (id: string, newTitleTasks: string) => {
        setTodoLists(todoLists.map(el => el.idTDL === id ? {...el, titleTDL:newTitleTasks} : el))
    }

  return (
      <StyledEngineProvider injectFirst>
            <div className="App">
                <Header />
                <Container fixed>
                <Grid container style={{padding:'20px'}}>
                <Input callBackInput={addTodoListHandler}/>
                </Grid>
                <Grid container spacing={8}>
                {todoLists.map((el) => {
                    /*let TasksForTodoList = tasks[el.idTDL]
                    if (el.filterTDL === 'Active') {
                        TasksForTodoList = TasksForTodoList.filter(el => !el.isDone)
                    }
                    if (el.filterTDL === 'Completed') {
                        TasksForTodoList = TasksForTodoList.filter(el => el.isDone)
                    }*/

                    return <Grid item key={el.idTDL}>
                    <Paper elevation={3} style={{padding: '10px'}}>
                    <TodoList tasks={tasks[el.idTDL]}
                                     todoLists={todoLists}
                                     idTDL={el.idTDL}
                                     /*key={el.idTDL}*/
                                     titleTDL={el.titleTDL}
                                     filterTDL={el.filterTDL}
                                     removeTask={removeTask}
                                     addTask={addTask}
                                     changeFilter={changeFilter}
                                     changeStatus={changeStatus}
                                     removeTodoList={removeTodoList}
                                     updateTask={updateTask}
                                     updateTitleTasks={updateTitleTasks}/>
                    </Paper>
                    </Grid>
                })}
                </Grid>
                </Container>
            </div>
      </StyledEngineProvider>
  );
}

export default App;
