import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FullButton} from "./Button";
import {TextField} from "@mui/material";



type InputType = {
    callBackInput: (title:string) => void
}

export const Input = (props:InputType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string|null>('')
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }
    const onKeyHandler = (e:KeyboardEvent<HTMLInputElement>) => {
     e.key === 'Enter' && addHandler()
    }
    const addHandler = () => {
        let newTitle = title.trim()
        if (newTitle !== '') {
            setError(null)
            props.callBackInput(newTitle)
        } else setError('Incorrect entry')
        setTitle('')
    }

    return (
        <div>
            {/*<input onChange={onChangeHandler}
                   onKeyPress={onKeyHandler}
                   value={title}
                   className={error ? 'error' : ''}/>*/}

            <TextField id="outlined-basic"
                       label= {!error ? "Entry" : "Error"}
                       variant="outlined"
                       size={"small"}
                       helperText={error}
                        error={!!error}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyHandler}
                       value={title}
                       />

            <FullButton callBack={addHandler} titleButton={'Add'} />
            {/*{error && <div className={'errorMessage'}>{error}</div>}*/}
        </div>
    );
};

