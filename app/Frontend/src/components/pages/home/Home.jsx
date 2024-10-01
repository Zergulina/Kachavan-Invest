import React from 'react';
import classes from './Home.module.css'
import SelectionCircle from '../../UI/SelectionCircle/SelectionCircle';

const Home = () => {
    return (
        <div className={classes.Home}>
            <img src={require("./map.png")} className={classes.Map} alt='map' />
            <div className={classes.TextContainer}>
                <h1 className={classes.Title}>Искусственный интеллект для Целей устойчивого развития</h1>
                <span className={classes.Team}>Команда </span>
                <span className={classes.TeamName}>Качаван</span>
            </div>
            <div className={classes.SelectionContainer}>
                <div className={classes.SelectionCircleContainer}>
                    <SelectionCircle />
                </div>
            </div>

        </div>
    );
};

export default Home;