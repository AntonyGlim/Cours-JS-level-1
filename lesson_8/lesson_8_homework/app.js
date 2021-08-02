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


//
//
//

let cartCounter = document.querySelector("span.cartIconWrap span");

/**
 * Array with products and count:
 * [ 
 *      { 
 *          name: "name",
 *          price: "$50", 
 *          text: "Description",
 *          count: 4,
 *          summ: "$200"
 *      }
 */
let cart = [];

/**
 * Increment cart counter value
 */
function incrementCartCounterValue() {
    let counter = +cartCounter.innerText;
    cartCounter.innerText = ++counter;
    showOrHideCartCounter();
}

/**
 * Show or hide cart counter value
 */
function showOrHideCartCounter() {
    let counter = +cartCounter.innerText;
    if (counter > 0) cartCounter.style.display = "inline-block";
    else cartCounter.style.display = "none";
}

/**
 * Return name, price and text from html
 * @param {MauseEvent} event 
 * @returns product from html
 */
function buildProduct(event) {
    let featuredItem = event.target.parentElement.parentElement.parentElement;
    return {
        name: featuredItem.querySelector("div.featuredName").innerText,
        price: featuredItem.querySelector("div.featuredPrice").innerText,
        text: featuredItem.querySelector("div.featuredText").innerText,
    }
}

/**
 * What we do on add-to-cart-button click
 * @param {MauseEvent} event 
 */
function onAddToCartButtonClick(event) {
    incrementCartCounterValue();
    let product = buildProduct(event);
    addProductToCart(product);
}

/**
 * Add product to cart or update cart
 * @param {*} product 
 */
function addProductToCart(product) {
    let productFromCart = findProductInCartByProductNameOrNull(product.name);
    if (productFromCart == null) { //insert new item
        product.count = 1;
        product.summ = product.price;
        cart.push(product);
    } else { //update existent item
        productFromCart.count++;
        productFromCart.summ = calculatePriceSumm(productFromCart.count, productFromCart.price);
    }
    console.log(cart);
}

/**
 * Find product in cart by product name or null
 * @param {string} productName 
 * @returns product with count
 */
function findProductInCartByProductNameOrNull(productName) {
    for (let index = 0; index < cart.length; index++) {
        if (cart[index].name === productName) {
            return cart[index];
        }
    }
    return null;
}

/**
 * Preparing in advance productPrice (сut extra sumbols)
 * Multiplay productsCount * productPrice 
 * @param {number} productsCount - like 4
 * @param {string} productPrice - start with $
 */
function calculatePriceSumm(productsCount, productPrice) {
    let price = productPrice;
    if (price.startsWith("$")) {
        price = price.substring(1, price.length - 1);
    }
    return "$" + productsCount * price;
}

/**
 * Add event click listiner for all add-to-cart-button`s
 */
function addEventClickListinerForAddToCartButtons() {
    let addToCartButtons = document.querySelectorAll("button.add-to-cart-button");
    for (const button of addToCartButtons) {
        button.addEventListener("click", onAddToCartButtonClick);
    }
}

showOrHideCartCounter();
addEventClickListinerForAddToCartButtons();