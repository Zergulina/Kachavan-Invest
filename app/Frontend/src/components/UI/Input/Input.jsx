import React from 'react';
import classes from './Input.module.css'

const Input = ({ placeholder, text, value, setValue, className }) => {
    return (
        <div className={classes.InputContainer + " " + className}>
            <div className={classes.Text}>
                {text}
            </div>
            <input placeholder={placeholder} className={classes.Input} value={value} onChange={e => setValue(e.target.value)} />
        </div>
    );
};

export default Input;