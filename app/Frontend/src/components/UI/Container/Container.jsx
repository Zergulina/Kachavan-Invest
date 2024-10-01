import React from 'react';
import classes from './Container.module.css'

const Container = ({className, children, ...props}) => {
    return (
        <div className={classes.Container + " " + className} {...props}>
            {children}
        </div>
    );
};

export default Container;