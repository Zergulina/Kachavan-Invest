import React from 'react';
import classes from './TableCell.module.css'

const TableCell = ({ rowIndex, columnIndex, globalData, setGlobalData, isDisabled, inputFilter, className }) => {

    const setValue = (globalData, setGlobalData, rowIndex, columnIndex, newValue) => {
        if (isDisabled) return;
        let editedData = [...globalData];
        editedData[rowIndex][columnIndex] = newValue;
        setGlobalData(editedData);
    }

    return (
        <input className={classes.TableCell + " " + className} value={globalData[rowIndex][columnIndex]}
            onChange={e => {
                if (inputFilter(e.target.value))
                    setValue(globalData, setGlobalData, rowIndex, columnIndex, e.target.value)
            }} />
    );
};

export default TableCell;