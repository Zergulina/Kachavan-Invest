import React from 'react';
import classes from "./SelectionCircle.module.css"
import SelectionUnit from '../SelectionUnit/SelectionUnit';
import { useState } from 'react';
import { curs } from '../../../consts';

const SelectionCircle = () => {

    const [smallCircleStyle, setSmallCircleStyle] = useState({ backgroundColor: "white", color: "black" });
    const [numberText, setNumberText] = useState("ЦУР")
    const [titleText, setTitleText] = useState("Выберите ЦУР")


    const selectionUnits = [{ angle: 10.592, imageSrc: process.env.PUBLIC_URL + "images/unit1.png", imageAlt: "unit1", color: curs[0].color, title: curs[0].title },
    { angle: 31.768, imageSrc: process.env.PUBLIC_URL + "images/unit2.png", imageAlt: "unit2", color: curs[1].color, title: curs[1].title },
    { angle: 52.944, imageSrc: process.env.PUBLIC_URL + "images/unit3.png", imageAlt: "unit3", color: curs[2].color, title: curs[2].title},
    { angle: 74.12, imageSrc: process.env.PUBLIC_URL + "images/unit4.png", imageAlt: "unit4", color: curs[3].color, title: curs[3].title },
    { angle: 95.296, imageSrc: process.env.PUBLIC_URL + "images/unit5.png", imageAlt: "unit5", color: curs[4].color, title: curs[4].title },
    { angle: 116.472, imageSrc: process.env.PUBLIC_URL + "images/unit6.png", imageAlt: "unit6", color: curs[5].color, title: curs[5].title},
    { angle: 137.648, imageSrc: process.env.PUBLIC_URL + "images/unit7.png", imageAlt: "unit7", color: curs[6].color, title: curs[6].title },
    { angle: 158.824, imageSrc: process.env.PUBLIC_URL + "images/unit8.png", imageAlt: "unit8", color: curs[7].color, title: curs[7].title },
    { angle: 180, imageSrc: process.env.PUBLIC_URL + "images/unit9.png", imageAlt: "unit9", color: curs[8].color, title: curs[8].title },
    { angle: -158.824, imageSrc: process.env.PUBLIC_URL + "images/unit10.png", imageAlt: "unit10", color: curs[9].color, title: curs[9].title },
    { angle: -137.648, imageSrc: process.env.PUBLIC_URL + "images/unit11.png", imageAlt: "unit11", color: curs[10].color, title: curs[10].title },
    { angle: -116.472, imageSrc: process.env.PUBLIC_URL + "images/unit12.png", imageAlt: "unit12", color: curs[11].color, title: curs[11].title },
    { angle: -95.296, imageSrc: process.env.PUBLIC_URL + "images/unit13.png", imageAlt: "unit13", color: curs[12].color, title: curs[12].title },
    { angle: -74.12, imageSrc: process.env.PUBLIC_URL + "images/unit14.png", imageAlt: "unit14", color: curs[13].color, title: curs[13].title },
    { angle: -52.944, imageSrc: process.env.PUBLIC_URL + "images/unit15.png", imageAlt: "unit15", color: curs[14].color, title: curs[14].title },
    { angle: -31.768, imageSrc: process.env.PUBLIC_URL + "images/unit16.png", imageAlt: "unit16", color: curs[15].color, title: curs[15].title },
    { angle: -10.592, imageSrc: process.env.PUBLIC_URL + "images/unit17.png", imageAlt: "unit17", color: curs[16].color, title: curs[16].title },
    ];

    return (
        <div className={classes.SelectionCircle}>
            {selectionUnits.map(({ angle, imageSrc, imageAlt, color, title }, index) => {
                return <SelectionUnit angle={angle} imageSrc={imageSrc} imageAlt={imageAlt} color={color} title={title} index={index} key={imageAlt}
                    setSmallCircleStyle={setSmallCircleStyle} setNumberText={setNumberText} setTitleText={setTitleText} />
            })}
            <div className={classes.SmallCircle} style={smallCircleStyle}>
                <div className={classes.Text}>
                    <div className={classes.NumberText}>
                        {numberText}
                    </div>

                    <div className={classes.TitleText}>
                        {titleText}
                    </div>
                </div>
                <div className={classes.Title}></div>
            </div>
        </div>
    );
};

export default SelectionCircle;