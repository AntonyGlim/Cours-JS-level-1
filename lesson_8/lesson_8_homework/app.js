'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});



//change cart counter
let cartCounter = document.querySelector("span.cartIconWrap span");
let addToCartButtons = document.querySelectorAll("button.add-to-cart-button");
for (const button of addToCartButtons) {
    button.addEventListener("click", function(event) {
        let counter = +cartCounter.innerText;
        cartCounter.innerText = ++counter;
        showOrHideCartCounter();
    });
}

function showOrHideCartCounter() {
    let counter = +cartCounter.innerText;
    if (counter > 0) {
        cartCounter.style.display = "inline-block";
    } else {
        cartCounter.style.display = "none";
    }
}

showOrHideCartCounter();

let cartTable = querySelector("table.cartTable");

function findRowInTableByProductNameIfPresent(table, productName) {
    for (const row in table.rows) {
        if (row.cells[0] === productName) {
            return row;
        }
    }
    return null;
}

/**
 * Get existent row or create new
 * @param {*} cartTable - html table
 * @param {*} product - DTO item
 * @returns table row element
 */
function getOrCreateRow(cartTable, product) {
    let row = findRowInTableByProductNameIfPresent(cartTable, product);
    if (!row) {
        row = cartTable.insertRow();
    }
    return row
}

/**
 * Insetr new row in table or update existent
 * @param {*} cartTable - html table
 * @param {*} product - DTO item
 */
function addTableRow(cartTable, product) {
    let row = getOrCreateRow(cartTable, product);

    let cellProductName = row.insertCell(0);
    let cellCount = row.insertCell(1);
    let cellOneItemPrice = row.insertCell(2);
    let cellTotalPrice = row.insertCell(3);

    if (!cellProductName) { //add new row
        cellProductName.innerHTML = product.name;
        cellCount.innerHTML = 1;
        cellOneItemPrice.innerHTML = product.price;
    } else { //update existent
        cellCount.innerHTML = +cellCount.innerHTML + 1;
    }
    cellTotalPrice.innerHTML = cellOneItemPrice.innerHTML * cellCount.innerHTML;
}

let cartIconWrap = document.querySelector("span.cartIconWrap");
cartIconWrap.addEventListener("click", function(event) {
    console.log("click");
});