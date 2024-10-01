import React, { useState, useEffect } from 'react';
import classes from './Admin.module.css'
import Select from '../../UI/Select/Select';
import ButtonContainer from '../../UI/ButtonContainer/ButtonContainer';
import Container from '../../UI/Container/Container';
import GreenButton from '../../UI/GreenButton/GreenButton';
import RedButton from '../../UI/RedButton/RedButton';
import Input from '../../UI/Input/Input';
import Table from '../../UI/Table/Table/Table';
import { curs } from '../../../consts';
import axios from 'axios';
import { jsonToTable, tableToJson } from '../../../mappers';

const curSelection = [
    1 + ". " + curs[0].title,
    2 + ". " + curs[1].title,
    3 + ". " + curs[2].title,
    4 + ". " + curs[3].title,
    5 + ". " + curs[4].title,
    6 + ". " + curs[5].title,
    7 + ". " + curs[6].title,
    8 + ". " + curs[7].title,
    9 + ". " + curs[8].title,
    10 + ". " + curs[9].title,
    11 + ". " + curs[10].title,
    12 + ". " + curs[11].title,
    13 + ". " + curs[12].title,
    14 + ". " + curs[13].title,
    15 + ". " + curs[14].title,
    16 + ". " + curs[15].title,
    17 + ". " + curs[16].title

]

const defaultTable = [
    ["Год", "Название столбца"],
    ["2016", ""]
];

const Admin = () => {
    const [data, setData] = useState(JSON.parse(JSON.stringify(defaultTable)));

    const [curIndex, setCurIndex] = useState(0);

    const [tables, setTables] = useState([]);
    const [tableIndex, setTableIndex] = useState(0);

    const [tableName, setTableName] = useState("Новая таблица");
    const [tableId, setTableId] = useState(0);
    const [tableIds, setTableIds] = useState([]);

    let [tableChanged, setTableChanged] = useState(false);

    useEffect(() => {
        if (curIndex != 0)
            setTableIndex(0);
        setTableId(0);
        setData(JSON.parse(JSON.stringify(defaultTable)));
        axios.get(process.env.REACT_APP_API_URL + `utils/sdg-tables/${curIndex}`).then(response => {
            setTables(response.data.map((item, index) => (index + 1) + ". " + item.name));
            setTableIds(response.data.map(item => item.id))
        }).catch(() => {
            setTables([]);
            setTableId(0);
            setTableIds([]);
            setTableName("Новая таблица");
        })
    }, [curIndex])

    useEffect(() => {
        if (tableIndex != 0 && !tableChanged) {
            axios.get(process.env.REACT_APP_API_URL + `db/table/${tableIds[tableIndex - 1]}`)
                .then(response => {
                    setData(jsonToTable(response.data));
                    setTableId(response.data.id);
                    setTableName(response.data.name);
                })
        }
        else {
            setTableChanged(false);
        }
    }, [tableIndex])

    const addNewTable = () => {
        if (curIndex > 0) {
            setTableIndex(0);
            setTableId(0);
            setTableName("Новая таблица");
            setData(JSON.parse(JSON.stringify(defaultTable)));
        }
        else {
            alert("Выберите ЦУР!");
        }
    }

    const deleteTable = () => {
        if (curIndex > 0) {
            axios.delete(process.env.REACT_APP_API_URL + `db/table/${tableId}`).catch(e => alert(e));
            let newTables = [...tables];
            newTables.splice(tableIndex - 1, 1);
            setTables(newTables);
            let newTableIds = [...tableIds];
            newTableIds.splice(tableIndex - 1, 1);
            setTableIds(newTableIds);
            setTableIndex(0);
            setTableId(0);
            setTableName("Новая таблица");
            setData(JSON.parse(JSON.stringify(defaultTable)));
        }
        else {
            alert("Выберите ЦУР!");
        }
    }

    const addRow = () => {
        let newData = [...data];
        let newRow = [];
        newRow.push(String(parseInt(data[data.length - 1][0]) + 1));
        for (let i = 1; i < data[0].length; i++) {
            newRow.push("");
        }
        newData.push(newRow)
        setData(newData);
    }

    const deleteRow = () => {
        if (data.length > 2) {
            let newData = [...data];
            newData.pop();
            setData(newData);
        }
    }

    const addColumn = () => {
        let newData = [...data];
        newData[0].push("Название столбца")
        newData.slice(1).map((item) => item.push(""));
        setData(newData);
    }

    const deleteColumn = () => {
        if (data[0].length > 2) {
            let newData = [...data];
            newData.map((item) => item.pop());
            setData(newData);
        }
    }

    const tableCellInputFilter = (newValue) => {
        const exp = /^([0-9]+\.?[0-9]*)?$/;
        return exp.test(newValue);
    }

    const applyChanges = () => {
        if (curIndex > 0) {
            const jsonData = tableToJson(data, tableName, curIndex, tableId);
            if (tableId == 0) {
                axios.post(process.env.REACT_APP_API_URL + "db/table", jsonData)
                    .then(response => {
                        setTableChanged(true);
                        setTableId(response.data.id);
                        let newTables = [...tables];
                        newTables.push((tables.length + 1) + ". " + tableName);
                        setTables(newTables);
                        let newTableIds = [...tableIds];
                        newTableIds.push(response.data.id);
                        setTableIds(newTableIds);
                        setTableIndex(newTables.length);
                        axios.get(process.env.REACT_APP_API_URL + `ml/learn`).catch(e => alert(e))
                    })
                    .catch(() => {
                        alert("Ошибка! Имена таблиц должны быть уникальными!");
                    }
                    )
            }
            else {
                axios.put(process.env.REACT_APP_API_URL + `db/table`, jsonData)
                    .then(response => {
                        let newTables = [...tables];
                        newTables[tableIndex - 1] = (tableIndex) + ". " + tableName;
                        setTables(newTables);
                        setTableId(response.data.id);
                        let newTableIds = [...tableIds];
                        newTableIds[tableIndex - 1] = response.data.id;
                        setTableIds(newTableIds);
                        axios.get(process.env.REACT_APP_API_URL + `ml/learn`).catch(e => alert(e))
                    })
                    .catch(
                        () => {
                            alert("Ошибка! Имена таблиц должны быть уникальными!");
                        }
                    )
            }
        }
        else {
            alert("Выберите ЦУР!");
        }
    }

    const denyChanges = () => {
        if (curIndex > 0) {
            if (tableId != 0) {
                axios.get(process.env.REACT_APP_API_URL + `db/table/${tableId}`)
                    .then(response => {
                        setTableName(response.data.name);
                        setData(jsonToTable(response.data));
                    })
                    .catch(e => alert(e));
            }
        }
        else {
            alert("Выберите ЦУР!");
        }
    }

    return (
        <div className={classes.Admin}>
            <div className={classes.TitleContainer}>
                <h1 className={classes.Title}>Панель управления сервисом</h1>
            </div>
            <Select text={`База данных ЦУР для редактирования`} title={"Выберите раздел ЦУР"} options={curSelection} currentIndex={curIndex} setCurrentIndex={setCurIndex} className={classes.CurSelector} />
            <Select text={`Таблица из выбранного ЦУР`} title={"Выберите таблицу"} options={tables} currentIndex={tableIndex} setCurrentIndex={setTableIndex} className={classes.TableSelector} />
            <ButtonContainer className={classes.NewTable} onClick={addNewTable} text={"Добавить новую таблицу в текущий ЦУР"}>ДОБАВИТЬ ТАБЛИЦУ</ButtonContainer>
            <ButtonContainer className={classes.DeleteTable} onClick={deleteTable} text={"Удалить текущую таблицу"}>УДАЛИТЬ ТАБЛИЦУ</ButtonContainer>
            <RedButton className={classes.Deny} onClick={denyChanges}>ОТМЕНИТЬ ИЗМЕНЕНИЯ</RedButton>
            <GreenButton className={classes.Apply} onClick={applyChanges}>ПРИМЕНИТЬ ИЗМЕНЕНИЯ</GreenButton>
            <Container className={classes.TableContainer}>
                <Input className={classes.TableName} value={tableName} setValue={setTableName} placeholder={"Введите название таблицы"} text={"Название таблицы"} />
                <Table data={data} setData={setData} inputFilter={tableCellInputFilter} className={classes.Table} />
                <ButtonContainer className={classes.AddRow} onClick={addRow} text={"Добавить строку в конец таблицы"}>ДОБАВИТЬ СТРОКУ</ButtonContainer>
                <ButtonContainer className={classes.DeleteRow} onClick={deleteRow} text={"Удалить строку в конце таблицы"}>УДАЛИТЬ СТРОКУ</ButtonContainer>
                <ButtonContainer className={classes.AddColumn} onClick={addColumn} text={"Добавить столбец в конец таблицы"}>ДОБАВИТЬ СТОЛБЕЦ</ButtonContainer>
                <ButtonContainer className={classes.DeleteColumn} onClick={deleteColumn} text={"Удалить столбец в конце таблицы"}>УДАЛИТЬ СТОЛБЕЦ</ButtonContainer>
            </Container>
        </div>
    );
};

export default Admin;