function addToCart(button) {
    let cartCounterBadge = document.getElementsByClassName("cart-item-counter")[0]
    let cartItem = buildCartItem()
    let currentItemIndex = cartHasItem(cartItem)

    if (currentItemIndex !== null) {
        cartQueue.getCartItems()[currentItemIndex].number = parseInt(document.getElementsByClassName("count")[0].innerText)
        cartQueue.getCartItems()[currentItemIndex].total = (parseInt(document.getElementsByClassName("count")[0].innerText) * product.current_price)
    } else {
        cartQueue.getCartItems().push(buildCartItem())
    }
    cartQueue.renderCartItemsList()
    if (document.getElementById("btn-checkout").classList.contains("btn-fade-out")) {
        document.getElementById("btn-checkout").classList.replace("btn-fade-out", "btn-fade-in")
        cartCounterBadge.classList.replace("hide", "show")
    } else {
        document.getElementById("btn-checkout").classList.add("btn-fade-in")
        cartCounterBadge.classList.add("show")
    }
    cartCounterBadge.innerText = cartQueue.getCartItems().length
}

function removeFromCart(button) {
    let itemView = button.parentElement
    itemView.classList.replace("item-fade-in", "item-fade-out")
    document.getElementById("btn-checkout").classList.replace("btn-fade-in", "btn-fade-out")
    document.getElementsByClassName("cart-item-counter")[0].classList.replace("show", "hide")
    cartQueue.getCartItems().splice(parseInt(itemView.getAttribute("id").toString().split("-")[2]), 1)
    setTimeout(() => {
        cartQueue.renderCartItemsList()
    }, 300)
}

function cartHasItem(cartItem) {
    let itemIndex = null
    cartQueue.getCartItems().forEach((item, index) => {
        if (item.product_id === cartItem.product_id) itemIndex = index
    })
    return itemIndex
}

function increaseItems(button) {
    let btnIncreaseCounter = button
    let counter = btnIncreaseCounter.parentElement.getElementsByTagName("span")[0]
    let btnDecreaseCounter = btnIncreaseCounter.parentElement.getElementsByTagName("button")[1]
    let btnAddToCart = (btnIncreaseCounter.parentElement).parentElement.getElementsByTagName("button")[2]

    counter.innerText = (parseInt(counter.innerText) + 1).toString()
    btnDecreaseCounter.disabled = false
    btnAddToCart.disabled = false
}

function decreaseItems(button) {
    let btnDecreaseCounter = button
    let counter = btnDecreaseCounter.parentElement.getElementsByTagName("span")[0]
    let btnIncreaseCounter = btnDecreaseCounter.parentElement.getElementsByTagName("button")[1]
    let btnAddToCart = (btnDecreaseCounter.parentElement).parentElement.getElementsByTagName("button")[2]

    counter.innerText = (parseInt(counter.innerText) - 1).toString()
    if (parseInt(counter.innerText) === 0) {
        btnIncreaseCounter.disabled = true
        btnAddToCart.disabled = true
    }
}

function showCart(button) {
    if (cart.classList.contains("cart-fade-out")) {
        cart.classList.replace("cart-fade-out", "cart-fade-in")
    } else {
        cart.classList.add("cart-fade-in")
    }
}

function hideCart(button) {
    cart.classList.replace("cart-fade-in", "cart-fade-out")
}