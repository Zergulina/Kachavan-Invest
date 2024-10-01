import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './Cur.module.css'
import Select from '../../UI/Select/Select';
import Input from '../../UI/Input/Input';
import GreenButton from '../../UI/GreenButton/GreenButton';
import Container from '../../UI/Container/Container';
import axios from 'axios';
import { curs } from '../../../consts';
import { Chart } from 'highcharts'

const Cur = () => {
    const [tables, setTables] = useState([]);
    const [tableIds, setTableIds] = useState([]);
    const [tableIndex, setTableIndex] = useState(0);

    const [goals, setGoals] = useState([]);
    const [goalsData, setGoalsData] = useState([]);
    const [goalIndex, setGoalIndex] = useState(0);
    const [goalIds, setGoalIds] = useState([]);


    const models = ["ARIMA"];
    const [modelIndex, setModelIndex] = useState(1);

    const [horizon, setHorizon] = useState("");
    const params = useParams();

    const  truncateDecimals = (number, digits) => {
        const rounded = Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
        return parseFloat(rounded.toFixed(digits));
    }


    useEffect(() => {

        axios.get(process.env.REACT_APP_API_URL + `db/sdg/${params.id + 1}`)
            .then(response => {
                
                let newTableIds = response.data.tableIds.split(',').map(item => parseInt(item));
                setTableIds(newTableIds);
                let newTables = [];
                axios.get(process.env.REACT_APP_API_URL + "tables")
                    .then(response => {
                        
                        for (let i = 0; i < response.data.length; i++) {
                            if (newTableIds.indexOf(response.data[i].id) > -1) {
                                newTables.push(response.data[i].name);
                            }
                        }
                        setTables(newTables);
                    })
                    .catch(e => alert(e));
            })
            .catch(e => alert(e));
    }, [])

    useEffect(() => {
        if (tableIndex > 0) {
            axios.get(process.env.REACT_APP_API_URL + `db/table/${tableIds[tableIndex - 1]}`)
                .then(response => {
                    setGoals(response.data.headers);
                    setGoalsData(response.data.values);
                })
                .catch(e => alert(e));

            axios.get(process.env.REACT_APP_API_URL + `tables/${tableIds[tableIndex - 1]}`)
                .then(response => {
                    setGoalIds(response.data.valuesIds.split(','))
                })
                .catch(e => alert(e));
        }
    }, [tableIndex])

    const drawChart = (yData) => {
        var chartGoal = new Chart({
            chart: { renderTo: 'chart' },
            title: { text: '' },
            series: [{
                showInLegend: false,
                data: [],
                name: goals[goalIndex - 1]
            }],
            plotOptions: {
                line: {
                    animation: false,
                    dataLabels: { enabled: true },
                    color: curs[params.id].color,
                }
            },
            xAxis: {
                title: { text: 'Год' }
            },
            yAxis: {
                title: { text: '' }
            },
            credits: { enabled: false }
        });

        for (let i = 0; i < yData.length; i++) {
            chartGoal.series[0].addPoint([2016 + i, yData[i]]);
        }
    }

    useEffect(() => {
        if (goalIndex > 0) {
            let yData = goalsData[goalIndex - 1]
            yData = yData.split(',').map(item => parseFloat(item));
            drawChart(yData)
        }
    }, [goalIndex]);

    const forecast = () => {
        if (parseInt(horizon) > 0 && parseInt(horizon) == parseFloat(horizon)) {
            if (goalIndex > 0) {
                axios.get(process.env.REACT_APP_API_URL + `ml/predict/v=${goalIds[goalIndex - 1]}&m=${models[modelIndex - 1].toLowerCase()}&h=${horizon}`).then(response => {
                    let yData = goalsData[goalIndex - 1]
                    yData = yData.split(',').map(item => parseFloat(item));
                    yData = yData.concat([...response.data.map(item => truncateDecimals(item, 2))])
                    drawChart(yData)
                }).catch(e => alert(e));
            }
        }
        else {
            alert("Горизонт должен быть целым числом больше 0!")
        }
    }

    return (
        <div className={classes.Cur}>
            <div className={classes.TitleContainer}>
                <h1 className={classes.Title}>Прогноз значений ЦУР {parseInt(params.id) + 1}</h1>
            </div>
            <div className={classes.TitleContainer}>
                <h1 className={classes.Name}>{curs[params.id].title}</h1>
            </div>
            <Select text={`Таблица из перечня ЦУР ${parseInt(params.id) + 1}`} title={"Выберите таблицу"} options={tables} currentIndex={tableIndex} setCurrentIndex={setTableIndex} className={classes.TableSelector} />
            <Select text={`Цель из перечня таблицы`} title={"Выберите цель"} options={goals} currentIndex={goalIndex} setCurrentIndex={setGoalIndex} className={classes.GoalSelector} />
            <Select text={`Модель машинного обучения`} title={"Выберите модель"} options={models} currentIndex={modelIndex} setCurrentIndex={setModelIndex} className={classes.ModelSelector} />
            <Input placeholder={"Введите горизонт"} text={"На сколько лет вперед прогнозировать"} value={horizon} setValue={setHorizon} className={classes.InputHorizon} />
            <GreenButton className={classes.Button} onClick={forecast}>РАССЧИТАТЬ ЗНАЧЕНИЯ</GreenButton>
            <Container className={classes.PlotContainer}>
                <div id="chart" className={classes.Chart} />
            </Container>
        </div>
    );
};

export default Cur;