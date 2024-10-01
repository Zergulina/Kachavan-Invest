import React from 'react';
import classes from './Select.module.css'

const Select = ({ title, text, options, currentIndex, setCurrentIndex, className}) => {

    return (
        <div className={classes.SelectContainer + " " + className}>
            <div className={classes.Text}>
                {text}
            </div>
            <select value={currentIndex} className={classes.List} onChange={e => setCurrentIndex(e.target.value)}>
                <option value={0} hidden selected>{title}</option>
                {
                    options.map((item, index) => (
                        <option value={index + 1}>{item}</option>
                    ))
                }
            </select>

        </div>
    );
};

export default Select;