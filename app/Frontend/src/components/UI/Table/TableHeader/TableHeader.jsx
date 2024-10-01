import React from 'react';
import classes from './TableHeader.module.css'
import TableCell from '../TableCell/TableCell';

const TableHeader = ({ globalData, setGlobalData, className }) => {
    return (
        <div className={classes.TableHeader}>
            <TableCell rowIndex={0} columnIndex={0} globalData={globalData} setGlobalData={setGlobalData} inputFilter={()=> {return true}} isDisabled={true} className ={className}/>
            {globalData[0].slice(1).map((_, index) =>
                <TableCell rowIndex={0} columnIndex={index + 1} globalData={globalData} setGlobalData={setGlobalData} inputFilter={()=> {return true}} className ={className}/>
            )}
        </div>
    );
};

export default TableHeader;