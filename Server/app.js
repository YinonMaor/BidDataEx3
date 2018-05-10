const appDiv = document.getElementsByClassName('app')[0];

createTableIntoDiv(appDiv, 5, 5);

function createTableIntoDiv(div, rows, cols) {
    if (rows === 0 || cols === 0) {
        return '';
    }
    let table = document.createElement('table');
    let header = document.createElement('tr');
    let leftTopEmpty = document.createElement('th');
    leftTopEmpty.appendChild(document.createTextNode(''));
    header.appendChild(leftTopEmpty);
    for (let i = 0; i < cols; i++) {
        let th = document.createElement('th');
        let text = document.createTextNode('Text');
        th.appendChild(text);
        header.appendChild(th);
    }
    table.appendChild(header);
    for (let i = 0; i < rows; i++){
        let tr = document.createElement('tr');
        let autoAI = document.createElement('td');
        let k = i + 1;
        autoAI.appendChild(document.createTextNode(`${k}`));
        tr.appendChild(autoAI);
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

function isNumberKey(evt){
    let charCode = (evt.which) ? evt.which : event.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
}

document.getElementById("submit").addEventListener("click", () => {
    console.log('clicked')
});