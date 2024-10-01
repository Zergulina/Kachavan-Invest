import React from 'react';
import TableCell from '../TableCell/TableCell';
import classes from './TableRow.module.css'

const TableRow = ({ rowIndex, globalData, setGlobalData, inputFilter, className }) => {
    return (
        <div className={classes.TableRow}>
            <TableCell rowIndex={rowIndex} columnIndex={0} globalData={globalData} setGlobalData={setGlobalData} inputFilter={()=> {return true}} className={className} isDisabled={true} />
            {
                globalData[rowIndex].slice(1).map((_, index) =>
                        <TableCell rowIndex={rowIndex} columnIndex={index + 1} globalData={globalData} setGlobalData={setGlobalData} inputFilter={inputFilter} key={index} className={className} />)
            }
        </div>
    );
};

export default TableRow;