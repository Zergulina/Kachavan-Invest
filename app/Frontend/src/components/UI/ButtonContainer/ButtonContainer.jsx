import React from 'react';
import classes from './ButtonContainer.module.css'
import WhiteButton from '../WhiteButton/WhiteButton';

const ButtonContainer = ({ children, text, onClick, className }) => {
    return (
        <div className={classes.ButtonContainer + " " + className}>
            <div className={classes.Text}>
                {text}
            </div>
            <WhiteButton onClick={onClick}>{children}</WhiteButton>
        </div>
    );
};

export default ButtonContainer;