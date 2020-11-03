function loadItems() {
    return fetch('data/data.json')
           .then(response => response.json())
           .then(json => json.items);
}

function displayItems(items) {
    console.log(items);
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item) {
    return `
    <li class="item" data-type="${item.type}" data-color="${item.color}">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `
}

function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    console.log(key);
    console.log(value);

    if(key == null || value == null) {
        //console.log('fffff');
        return;
    }

    if(key == undefined || value == undefined) {
        //console.log('zzzzzz');
        return;
    }
    
//console.log('ggggg');

    //displayItems(items.filter(item => item[key] === value));
    updateItems(items, key, value);
}

function updateItems(items, key, value) {
    console.log('updateItems');
    console.log(key);
    let gubun = "";
    items.forEach(item => {
        console.log(item.dataset[key]);
        if(key == 'color') {
           gubun = 'color';           
        } else {
           gubun = 'type';         
        }

        if (key == null || value == null) {
            item.classList.remove('invisible');
        }
        else {
            if (item.dataset[gubun] === value) {
                item.classList.remove('invisible');
            } else {
                item.classList.add('invisible'); 
            }
        }
    })
}

function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');

    logo.addEventListener('click', () => updateItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));    
}

// main
loadItems()
.then(items => {
    console.log(items);
    displayItems(items);        
    setEventListeners(document.querySelectorAll('.item'))
})
.catch(console.log)

