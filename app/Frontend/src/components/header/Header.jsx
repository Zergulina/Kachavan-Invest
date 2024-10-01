import React from 'react';
import classes from "./Header.module.css"
import { Outlet, Link } from 'react-router-dom';
import Logo from '../UI/Logo/Logo';

const Header = () => {
    return (
        <>
            <div className={classes.Header}>
                <Link to={"/"}><Logo className={classes.Logo}/></Link>
                <img src={require("./location.png")} alt='location' className={classes.Location}/>
            </div>
            <Outlet />
        </>
    );
};

export default Header;