import React from 'react';
import TableRow from '../TableRow/TableRow';
import TableHeader from '../TableHeader/TableHeader';
import classes from './Table.module.css'

const Table = ({ data, setData, inputFilter, className}) => {
    return (
        <div className={classes.Table + " " + className}>
            <TableHeader globalData={data} setGlobalData={setData} className={classes.Header}/>
            {
                data.slice(1).map((_, index) => (
                        <TableRow rowIndex={index + 1} globalData={data} setGlobalData={setData} inputFilter={inputFilter} key={index} className={classes.Row + " " + (index % 2 === 0 ? classes.Row0 : classes.Row1)}/>))
            }
        </div>
    );
};

export default Table; 