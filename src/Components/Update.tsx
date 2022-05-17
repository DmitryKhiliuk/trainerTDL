import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type UpdateType = {
    callBack: (newTitle:string) => void
    title: string
}

export const Update = React.memo((props:UpdateType) => {

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
            edit ?
                <TextField id="standard-basic"
                           variant="standard"
                           onChange={onChangeHandler}
                           value={newTitle}
                           autoFocus
                           size={'small'}
                           onBlur={onBlurHandler}

                /> :
                <span onDoubleClick={onDblHandler}>{props.title}</span>
    );
});

