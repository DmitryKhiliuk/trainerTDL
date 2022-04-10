import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {Button} from "./Button";

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
        } else setError('error')
        setTitle('')
    }

    return (
        <div>
            <input onChange={onChangeHandler}
                   onKeyPress={onKeyHandler}
                   value={title}
                   className={error ? 'error' : ''}/>

            <Button callBack={addHandler} titleButton={'Add'} classButton={''}/>
            {error && <div className={'errorMessage'}>{error}</div>}
        </div>
    );
};

