import React from 'react';

type ButtonType = {
    callBack: () => void
    titleButton: string
    classButton: string
}

export const Button = (props:ButtonType) => {


    const onClickHandler = () => {
      props.callBack()
    }
    return (

            <button onClick={onClickHandler} className={props.classButton}>{props.titleButton}</button>

    );
};

