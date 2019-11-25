import React from 'react';

import classes from './Keypad.module.css'

import Key from './../Key/Key';

const keypad = (props) => {

    const buttons = [
        '(', ')', '%', 'AC',
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '.', '0', '=', '+',
    ];

    // const buttonClicked = () => {

    // }

    return (
        <div className={classes.Keypad}>
            {buttons.map((button, index) => {
                return <Key clicked={props.keyPressed} key={index}>{button}</Key>
            })
            }

        </div>
    );
}

export default keypad;