const appDiv = document.getElementsByClassName('app')[0];
let array = null;
const keys = ['ID', 'Name', 'Age', 'Nationality', 'Overall', 'Club', 'Value', 'Wage'];
let url = window.location.href;
if (url.includes('?')) {
    const index = url.indexOf('?');
    url = url.substring(index);
} else {
    url = '';
}
$.getJSON('data.json' + url, json => {
    array = json;

    console.log(array);

    createTableIntoDiv(appDiv, array.length, keys.length, array);

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
            const text = document.createTextNode(keys[i]);
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
                let value = array[i][keys[j]];
                value = value.replace(/[^\x00-\x7F]/g, '');
                value = value.replace(/\?/g, '');
                const text = document.createTextNode(value);
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

// document.getElementById('submit').addEventListener('click', () => {
//     const age = document.getElementById('age').innerText;
//     const nationality = document.getElementById('nationality').innerText;
//     if (age !== '') {
//         document.getElementById('form').action = `/?age=${age}`;
//     } else if (nationality !== '') {
//         console.log('in nationality')
//         document.getElementById('form').action = `/?nationality=${nationality}`;
//     }
// });