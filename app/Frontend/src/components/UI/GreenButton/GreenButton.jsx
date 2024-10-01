import React from 'react';
import classes from './GreenButton.module.css'

const GreenButton = ({ children, className, ...props }) => {
    return (
        <button className={classes.GreenButton + " " + className} {...props}>{children}</button>
    );
};

export default GreenButton;