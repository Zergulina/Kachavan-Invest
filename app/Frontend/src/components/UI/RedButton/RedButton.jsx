import React from 'react';
import classes from './RedButton.module.css'

const RedButton = ({ children, className, ...props }) => {
    return (
        <button className={classes.RedButton + " " + className} {...props}>{children}</button>
    );
};

export default RedButton;