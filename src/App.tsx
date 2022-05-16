import React from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList";
import {Input} from "./Components/Input";
import {Container, Grid, Paper, StyledEngineProvider} from "@mui/material";
import {Header} from "./Components/Header";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/store";
import {addTodoListAC} from "./State/Action";


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



    const todoLists = useSelector<AppRootStateType, TodoListsType[]>(state => state.todoLists)
    const dispatch = useDispatch()


    const addTodoListHandler = (titleTDL: string) => {
        const action = addTodoListAC(titleTDL)
        dispatch(action)
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


                    return <Grid item key={el.idTDL}>
                    <Paper elevation={3} style={{padding: '10px'}}>
                    <TodoList todoLists={el}/>
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
