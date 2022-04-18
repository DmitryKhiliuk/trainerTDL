import React from 'react';
import {Button, ButtonGroup, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material"
import classes from './Button.module.css'


type FullButtonType = {
    callBack: () => void
    titleButton: string

}

export const FullButton = (props:FullButtonType) => {


    const onClickHandler = () => {
      props.callBack()
    }
    return (
        <>
            {props.titleButton==='Del' && <IconButton aria-label="delete" onClick={onClickHandler}><Delete/></IconButton>}
            {props.titleButton==='Add' && <Button variant="contained" onClick={onClickHandler} className={classes.button}>{props.titleButton}</Button>}

        </>
        // <button onClick={onClickHandler} className={props.classButton}>{props.titleButton}</button>

    );
};

