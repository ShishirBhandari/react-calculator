import React from 'react';

import classes from './Display.module.css';

const display = (props) => {
  return (
    <div className={classes.display}>
      <p>{props.output === '' ? '0' : props.output}</p>
    </div>
  );
}

export default display;