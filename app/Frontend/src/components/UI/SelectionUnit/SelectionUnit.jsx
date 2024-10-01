import React from 'react';
import { Link } from 'react-router-dom';
import classes from './SelectionUnit.module.css'

const SelectionUnit = ({ angle, imageSrc, imageAlt, color, title, index, setSmallCircleStyle, setNumberText, setTitleText }) => {
    return (
        <div className={classes.SelectionUnit} style={{ rotate: angle + "deg" }}>
            <Link to={`/cur/${index}`}>
                <img src={imageSrc} alt={imageAlt} className={classes.Image}
                    onMouseEnter={() => {
                        setSmallCircleStyle({ backgroundColor: color, color: "white" });
                        setNumberText("ЦУР " + (index + 1));
                        setTitleText(title);
                    }
                    }
                    onMouseLeave={() => {
                        setSmallCircleStyle({ backgroundColor: "white", color: "black" });
                        setNumberText("ЦУР");
                        setTitleText("Выберите ЦУР");
                    }} />
            </Link>
        </div>
    );
};

export default SelectionUnit;