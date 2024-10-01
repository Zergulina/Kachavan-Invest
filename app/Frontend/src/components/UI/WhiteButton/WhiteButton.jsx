import React from 'react';
import classes from './WhiteButton.module.css'

const WhiteButton = ({ children, className, ...props }) => {
    return (
        <button className={classes.WhiteButton + " " + className} {...props}>{children}</button>
    );
};

export default WhiteButton;