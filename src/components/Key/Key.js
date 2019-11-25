import React from 'react';

import classes from './Key.module.css'

const key = (props) => {
    return (
        <div className={classes.Key} onClick={props.clicked}>
            {props.children}
        </div>
    );
}

export default key;