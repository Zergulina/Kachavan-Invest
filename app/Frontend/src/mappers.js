export const tableToJson = (tableData, tableName, curId, tableId) => {
  const tableDataCopy = JSON.parse(JSON.stringify(tableData));
  const output = tableDataCopy[0].map((_, colIndex) => tableDataCopy.map(row => row[colIndex]))
  return {
    sdg: curId,
    id: tableId,
    name: tableName,
    headers: tableDataCopy[0].splice(1),
    values: output.splice(1).map((item) => item.splice(1).join(",")),
  };
};

export const jsonToTable = (jsonData) => {
  let table = [];
  table.push(["Год"]);

  for (let i = 0; i < jsonData.values[0].split(',').length; i++) {
    table[0].push([String(i + 2016)]);
  }

  for (let i = 0; i < jsonData.headers.length; i++) {
    table.push([jsonData.headers[i]]);
  }

  for (let i = 0; i < jsonData.values.length; i++) {
    table[i + 1].push(...jsonData.values[i].split(","));
  }

  return table[0].map((_, colIndex) => table.map(row => row[colIndex]));
};
