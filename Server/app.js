const appDiv = document.getElementsByClassName('app')[0];

let array = null;
const keys = ['Name', 'Age', 'Nationality', 'Overall', 'Club', 'Value', 'Wage', 'Special'];
$.getJSON('data.json', function (json) {
    array = json;

    console.log(array);

    createTableIntoDiv(appDiv, array.length, _.size(array[0]), array);

    function createTableIntoDiv(div, rows, cols, array) {
        if (rows === 0 || cols === 0) {
            return '';
        }
        const table = document.createElement('table');
        const header = document.createElement('tr');
        const leftTopEmpty = document.createElement('th');
        leftTopEmpty.appendChild(document.createTextNode(''));
        header.appendChild(leftTopEmpty);
        for (let i = 0; i < cols; i++) {
            const th = document.createElement('th');
            const text = document.createTextNode('Text');
            th.appendChild(text);
            header.appendChild(th);
        }
        table.appendChild(header);
        for (let i = 0; i < rows; i++){
            const tr = document.createElement('tr');
            const autoAI = document.createElement('td');
            const k = i + 1;
            autoAI.appendChild(document.createTextNode(`${k}`));
            tr.appendChild(autoAI);
            for (let j = 0; j < cols; j++) {
                const td = document.createElement('td');
                const text = document.createTextNode('Text');
                td.appendChild(text);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        div.appendChild(table);
    }
});



function isNumberKey(evt){
    const charCode = evt.which ? evt.which : event.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
}

document.getElementById('submit').addEventListener('click', () => {
    console.log('clicked');
});