import React from 'react';
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material"

type FullButtonType = {
    callBack: () => void
    titleButton: string
    classButton: string
}

export const FullButton = (props:FullButtonType) => {


    const onClickHandler = () => {
      props.callBack()
    }
    return (
        <div>
            {props.titleButton==='Del' && <IconButton aria-label="delete"><Delete/></IconButton>}
            {props.titleButton==='Add' && <Button variant="contained" onClick={onClickHandler} className={props.classButton}>{props.titleButton}</Button>}

        </div>
        // <button onClick={onClickHandler} className={props.classButton}>{props.titleButton}</button>

    );
};

