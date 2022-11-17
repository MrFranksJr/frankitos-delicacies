//import data
import { mainsArray } from '/mains.js'
import { drinksArray } from '/drinks.js'
import { dessertsArray } from '/desserts.js'

//consts
const drinksSection = document.getElementById("drinks-menu-items")
const mainsSection = document.getElementById("main-menu-items")
const dessertsSection = document.getElementById("desserts-menu-items")
let cartContent = []

//eventlisteners
document.addEventListener("click", function(e) {
    if (e.target.dataset.title) {
        collapseSection(e.target.dataset.title)
    }
    else if (e.target.dataset.bigurl) {
        fetchBigImage(e.target.dataset.bigurl)
    }
    else if (e.target.id === 'img-close') {
        document.getElementById("image-modal-content").innerHTML = ''
        document.getElementById("image-modal").classList.toggle("shown")
    }
    else if (e.target.dataset.cart) {
        collapseCart()
    }
    else if (e.target.dataset.id) {
        addToOrder(e.target.dataset.type, e.target.dataset.id)
    }
    else if (e.target.dataset.remove) {
        e.preventDefault()
        removeFromCart(e.target.dataset.remove)
    }
})


///////////BASIC FUNCTIONS/////////////////////////////////////////////////////////////////////////////////////////////
function collapseCart() {
    document.getElementById("cart-modal").classList.toggle("cart-hidden")
    document.getElementById("cart-modal-header").classList.toggle("cart-modal-header-hidden")
}

function collapseSection(sectionDataSet) {
    document.getElementById(sectionDataSet+"-menu-items").classList.toggle("hidden")
    document.getElementById(sectionDataSet+"-arrow").classList.toggle("rotate")
}

function fetchBigImage(imageDataSet) {
    let imgHTML = `
                    <img src="${imageDataSet}" class="img-responsive">
                `
    document.getElementById("image-modal-content").innerHTML = imgHTML
    document.getElementById("image-modal").classList.toggle("shown")
}

////////////////CART FUNCTIONS//////////////////////////////////////////////////////////////////////////////////////
function addToOrder(dishType, dishID) {
    let dishObject
    if (dishType.includes("drink")) {
        const selectedDrink = drinksArray.filter(function(drink){
            return drink.id === Number(dishID)
        })[0]
        dishObject = {
            name: selectedDrink.name,
            id: cartContent.length,
            price: selectedDrink.price
        }
    }
    else if (dishType.includes("main")) {
        const selectedMain = mainsArray.filter(function(main){
            return main.id === Number(dishID)
        })[0]
        dishObject = {
            name: selectedMain.name,
            id: cartContent.length,
            price: selectedMain.price
        }
    }
    else if (dishType.includes("dessert")) {
        const selectedDessert = dessertsArray.filter(function(dessert){
            return dessert.id === Number(dishID)
        })[0]
        dishObject = {
            name: selectedDessert.name,
            id: cartContent.length,
            price: selectedDessert.price
        }
    }
    cartContent.push(dishObject)
    renderCart(cartContent)
}

function renderCart(cartArray) {
    let htmlForCart = ``
    if (cartContent.length > 0) {
        for (let dish of cartArray) {
            htmlForCart += `
            <div class="ordered-item"><p>${dish.name} <a href="#" data-remove='${dish.id}'>remove</a></p><p>$${dish.price}</p></div>
            `
        }
        /* document.getElementById("ordered-items").innerHTML = htmlForCart */
        document.getElementById("cart-modal-header").innerHTML = `<h3 data-cart="cart-header">Your Order (${cartArray.length})</h3>`
    }
    else {
        htmlForCart = `<div class="empty-cart">Your cart is empty</div>`
        document.getElementById("cart-modal-header").innerHTML = `<h3 data-cart="cart-header">Your Order</h3>`
        
    }
    document.getElementById("ordered-items").innerHTML = htmlForCart
    document.getElementById("total-amount").textContent = `$ ${calcTotalPrice(cartArray)}`
    
}

function removeFromCart(itemID) {
    let indexOfDish = cartContent.findIndex(object => {
        return object.id === Number(itemID)
      })
    cartContent.splice(indexOfDish, 1)
    renderCart(cartContent)
}

function calcTotalPrice(cartArray) {
    let totalPrice = 0
    for (let dish of cartArray) {
        totalPrice += Number((dish.price).replace(',','.'))
    }
    
    return (totalPrice.toString()).replace('.',',')
}

//////// BUILD PAGE ////////////////////////////////////////////////////////////////////////////////////////////////
function collectDrinks() {
    let drinksHTMLcontent = ''
    for (const drink of drinksArray) {
        drinksHTMLcontent += `
            <div class="menu-item">
                <div class="col-1">
                    <img src="${drink.image}" class="food-image" data-bigurl="${drink.bigimage}">
                </div>
                <div class="col-2">
                    <h3>${drink.name}</h3>
                    <p class="food-description">${drink.description}</p>
                    <div class="price">$${drink.price}</div>
                    <button class="order-button" data-type="drink" data-id="${drink.id}">ADD TO ORDER</button>
                </div>
            </div>
        `
    }
    return drinksHTMLcontent
}

function collectMains() {
    let mainsHTMLcontent = ''
    for (const main of mainsArray) {
        mainsHTMLcontent += `
            <div class="menu-item">
                <div class="col-1">
                    <img src="${main.image}" class="food-image" data-bigurl="${main.bigimage}">
                </div>
                <div class="col-2">
                    <h3>${main.name}</h3>
                    <p class="food-description">${main.description}</p>
                    <div class="price">$${main.price}</div>
                    <button class="order-button" data-type="main" data-id="${main.id}">ADD TO ORDER</button>
                </div>
            </div>
        `
    }
    return mainsHTMLcontent
}

function collectDesserts() {
    let dessertsHTMLcontent = ''
    for (const dessert of dessertsArray) {
        dessertsHTMLcontent += `
            <div class="menu-item">
                <div class="col-1">
                    <img src="${dessert.image}" class="food-image" data-bigurl="${dessert.bigimage}">
                </div>
                <div class="col-2">
                    <h3>${dessert.name}</h3>
                    <p class="food-description">${dessert.description}</p>
                    <div class="price">$${dessert.price}</div>
                    <button class="order-button" data-type="dessert" data-id="${dessert.id}">ADD TO ORDER</button>
                </div>
            </div>
        `
    }
    return dessertsHTMLcontent
}

////////////RENDER PAGE///////////////////////////////////////////////////////////////////////////////////////
function renderFood() { 
    drinksSection.innerHTML = collectDrinks()
    mainsSection.innerHTML = collectMains()
    dessertsSection.innerHTML = collectDesserts()
}

renderFood()