//import data
import { mainsArray } from '/mains.js'
import { drinksArray } from '/drinks.js'
import { dessertsArray } from '/desserts.js'

//consts
const drinksSection = document.getElementById("drinks-menu-items")
const mainsSection = document.getElementById("main-menu-items")
const dessertsSection = document.getElementById("desserts-menu-items")
const couponBtn = document.getElementById("redeem")
const checkoutBtn = document.getElementById("checkout-btn")
const checkoutCloseBtn = document.getElementById("checkout-modal-close")
const checkoutModal = document.getElementById("checkout-modal")
const payButton = document.getElementById("pay-button")
let cartContent = []
let hasDiscount = false
let subTotal = ''
let totalPrice = 0

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
couponBtn.addEventListener("click", applyDiscount)
checkoutBtn.addEventListener("click", function() {
    checkoutModal.style.display = "block"
    document.querySelector('footer').style = 'filter: blur(5px)'
    document.querySelector('header').style = 'filter: blur(5px)'
    document.querySelector('main').style = 'filter: blur(5px)'
    document.querySelector('nav').style = 'filter: blur(5px)'
    couponBtn.style.display = "block"

    document.getElementById("checkout-subtotal-number").textContent = "$ " + totalPrice
})
checkoutCloseBtn.addEventListener("click", function() {
    checkoutModal.style.display = "none"
    document.querySelector('footer').style = 'filter: blur(0px)'
    document.querySelector('header').style = 'filter: blur(0px)'
    document.querySelector('main').style = 'filter: blur(0px)'
    document.querySelector('nav').style = 'filter: blur(0px)'

    hasDiscount = false
    couponBtn.disabled = false
    document.getElementById("coupon-code").value = ""
    document.getElementById("coupon-code").disabled = false
    document.getElementById("discount-overview").style.display = "none"
    document.getElementById("total-to-pay").style.display = "none"
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
    //WHEN CART IS NOT EMPTY
    if (cartContent.length > 0) {
        for (let dish of cartArray) {
            htmlForCart += `
            <div class="ordered-item"><p>${dish.name} <a href="#" data-remove='${dish.id}'>remove</a></p><p>$${dish.price}</p></div>
            `
        }
        document.getElementById("cart-modal-header").innerHTML = `
            <h3 data-cart="cart-header">Your Order (${cartArray.length})</h3>
            `
        document.getElementById("checkout-btn").disabled = false
    }
    //WHEN CART IS EMPTY
    else {
        htmlForCart = `<div class="empty-cart">Your cart is empty</div>`
        document.getElementById("cart-modal-header").innerHTML = `<h3 data-cart="cart-header">Your Order</h3>`
        document.getElementById("checkout-btn").disabled = true
        }
    document.getElementById("ordered-items").innerHTML = htmlForCart
    
    const totalAmount = calcTotalPrice(cartArray)
    document.getElementById("total-amount").textContent = `${totalAmount}`
}

function removeFromCart(itemID) {
    let indexOfDish = cartContent.findIndex(object => {
        return object.id === Number(itemID)
      })
    cartContent.splice(indexOfDish, 1)
    renderCart(cartContent)
}

function calcSubTotal(cartArray) {
    let subTotal = 0
    for (let dish of cartArray) {
        subTotal += Number((dish.price).replace(',','.'))
    }
    document.getElementById("subtotal-amount").textContent = `${"$ " + subTotal.toString().replace('.',',')}`
    return subTotal
}

function calcTotalPrice(cartArray) {
    subTotal = calcSubTotal(cartArray)
    if (subTotal === 0) {
        totalPrice = subTotal
    }
    else if (subTotal < 35) {
        totalPrice = Math.floor((subTotal + 4.99)*100)/100
        document.getElementById("delivery-amount").style.textDecoration = "none"
    }
    else if (subTotal > 35) {
        document.getElementById("delivery-amount").style.textDecoration = "line-through"
        totalPrice = subTotal
    }
    return ("$ " + totalPrice.toString()).replace('.',',')
}

function applyDiscount() {
    const couponInput = document.getElementById("coupon-code")
    if (couponInput.value === '') {
        alert('Enter a valid code!')
    }
    else {
            if (couponInput.value === 'neffi' || couponInput.value === 'NEFFI' || couponInput.value === 'Neffi') 
            {
                document.getElementById("loading-img").style.display = "inline-block"
                couponBtn.style.display = "none"
                setTimeout(function() {
                    hasDiscount = true
                    couponBtn.disabled = true
                    document.getElementById("coupon-code").disabled = true
                    document.getElementById("discount-overview").style.display = "flex"
                    document.getElementById("total-to-pay").style.display = "flex"
                    document.getElementById("discounted-price").textContent = "$ " + Math.floor((totalPrice - 10)*100)/100
                    payButton.disabled = false
                    document.getElementById("loading-img").style.display = "none"
                }, 1500)
                
                if (totalPrice < 15) {
                    setTimeout(function() {
                        alert("To use this coupon, a minimum of order of $15 is required.")
                        payButton.disabled = true
                    },1500)
                }
            }
            else {
                    document.getElementById("loading-img").style.display = "inline-block"
                    couponBtn.style.display = "none"
                    setTimeout(function() {
                        alert('Your coupon code is invalid!')
                        couponInput.value = ''
                        couponBtn.style.display = "inline-block"
                        document.getElementById("loading-img").style.display = "none"
                    }, 1500)
                }
        }
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