//import data
import { mainsArray } from '/mains.js'
import { drinksArray } from '/drinks.js'
import { dessertsArray } from '/desserts.js'

//consts
const drinksSection = document.getElementById("drinks-menu-items")
const mainsSection = document.getElementById("main-menu-items")
const dessertsSection = document.getElementById("desserts-menu-items")

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
        console.log(e.target.dataset.cart)
        collapseCart()
    }
})

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
                    <button class="order-button">ADD TO ORDER</button>
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
                    <button class="order-button">ADD TO ORDER</button>
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
                    <button class="order-button">ADD TO ORDER</button>
                </div>
            </div>
        `
    }
    return dessertsHTMLcontent
}

function renderFood() { 
    drinksSection.innerHTML = collectDrinks()
    mainsSection.innerHTML = collectMains()
    dessertsSection.innerHTML = collectDesserts()
}

renderFood()