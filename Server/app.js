const appDiv = document.getElementsByClassName('app')[0];

createTableIntoDiv(appDiv, 5, 5);

function createTableIntoDiv(div, rows, cols) {
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++){
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let text = document.createTextNode('Text');
            td.appendChild(text);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    div.appendChild(table);
}