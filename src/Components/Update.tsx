import React, {ChangeEvent, useState} from 'react';

type UpdateType = {
    callBack: (newTitle:string) => void
    title: string
}

export const Update = (props:UpdateType) => {

    const [newTitle, setNewTitle] = useState(props.title)
    const [edit, setEdit] = useState(false)
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onDblHandler = () => {
        setEdit(true)
    }
    const onBlurHandler = () => {
        setEdit(false)
        props.callBack(newTitle)

    }

    return (
            edit ? <input onChange={onChangeHandler}
                          value={newTitle} autoFocus
                          onBlur={onBlurHandler}/> :
                <span onDoubleClick={onDblHandler}>{props.title}</span>
    );
};

