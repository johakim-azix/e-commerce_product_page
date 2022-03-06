let product = null
let currentDisplayedImgIndex = 0
let currentDisplayedImageViewImgIndex = 0
let sideNav = null
let backDrop = null
let cart = null
let cartQueue = null
document.addEventListener("DOMContentLoaded", () => {
    product = getProduct()
    cartQueue = new CartQueue([], document.getElementsByClassName("item-queue")[0])


    // let btnMenu = document.getElementsByClassName("logo")[0].getElementsByTagName("button")[0]
    sideNav = document.getElementsByClassName("side-navigation")[0]
    backDrop = document.getElementsByClassName("tooltip-backdrop")[0]
    cart = document.getElementsByClassName("cart-content")[0]
})

/*============ start image viewer ====================*/
function showImageViewer(){
    let imgShower = document.getElementsByClassName("image-shower")[0]
    if (imgShower.classList.contains("image-shower-fade-out")){
        imgShower.classList.replace("image-shower-fade-out","image-shower-fade-in")
    }else{
        imgShower.classList.add("image-shower-fade-in")
    }
}
function closeImageViewer(){
    let imgShower = document.getElementsByClassName("image-shower")[0]
    imgShower.classList.replace("image-shower-fade-in","image-shower-fade-out")
}
function onImgViewerNavBtnClick(button, direction){
    let thumbs = (document.getElementsByClassName("image-shower")[0]).getElementsByClassName("thumbs")[0].getElementsByClassName("thumb")
    if (direction === "prev") {
        currentDisplayedImageViewImgIndex--
    } else {
        currentDisplayedImageViewImgIndex++
    }
    for (let i = 0; i < thumbs.length; i++) {
        thumbs[i].getElementsByClassName("cover")[0].classList.remove("active")
    }
    thumbs[currentDisplayedImageViewImgIndex].getElementsByClassName("cover")[0].classList.add("active")
    imgViewerImageAnimation()
}

function imgViewerShowImage(thumb){
    let thumbs = (thumb.parentElement).getElementsByClassName("thumb")
    for (let i = 0; i < thumbs.length; i++) {
        thumbs[i].getElementsByClassName("cover")[0].classList.remove("active")
    }
    thumb.getElementsByClassName("cover")[0].classList.add("active")

    for (let i = 0; i < thumbs.length; i++) {
        if (thumbs[i].getElementsByClassName("cover")[0].classList.contains("active")) {
            currentDisplayedImageViewImgIndex = i
        }
    }
    imgViewerImageAnimation()
}

function imgViewerImageAnimation() {
    let mainImage1 = document.getElementsByClassName("image-container")[0].getElementsByClassName("item")[0].getElementsByTagName("img")[0]
    let mainImageItem2 = document.getElementsByClassName("image-container")[0].getElementsByClassName("item")[1]
    let mainImage2 = document.getElementsByClassName("image-container")[0].getElementsByClassName("item")[1].getElementsByTagName("img")[0]
    let navigationBtns = document.getElementsByClassName("image-view-btn-navigation")

    navigationBtns[1].disabled = currentDisplayedImageViewImgIndex === (product.image_urls.images.length - 1);
    navigationBtns[0].disabled = currentDisplayedImageViewImgIndex === 0;

    mainImage1.setAttribute("src", product.image_urls.images[currentDisplayedImageViewImgIndex])
    setTimeout(() => {
        if (mainImageItem2.classList.contains("main-image-item-fade-in")) {
            mainImageItem2.classList.replace("main-image-item-fade-in", "main-image-item-fade-out")
        } else {
            mainImageItem2.classList.add("main-image-item-fade-out")
        }
    }, 0)

    setTimeout(() => {
        mainImage2.setAttribute("src", product.image_urls.images[currentDisplayedImageViewImgIndex])
        mainImageItem2.classList.replace("main-image-item-fade-out", "main-image-item-fade-in")
    }, 400)
}
/*============ end image viewer ====================*/


/*============= start image panel area ===============*/
function onImgBtnNavClick(button, direction) {
    let thumbs = (document.getElementsByClassName("images-panel")[0]).getElementsByClassName("thumbs")[0].getElementsByClassName("thumb")
    if (direction === "next") {
        currentDisplayedImgIndex++
    } else {
        currentDisplayedImgIndex--
    }
    for (let i = 0; i < thumbs.length; i++) {
        thumbs[i].getElementsByClassName("cover")[0].classList.remove("active")
    }
    thumbs[currentDisplayedImgIndex].getElementsByClassName("cover")[0].classList.add("active")
    imageAnimation()
}

function showImage(thumb) {
    let thumbs = (thumb.parentElement).getElementsByClassName("thumb")
    for (let i = 0; i < thumbs.length; i++) {
        thumbs[i].getElementsByClassName("cover")[0].classList.remove("active")
    }
    thumb.getElementsByClassName("cover")[0].classList.add("active")

    for (let i = 0; i < thumbs.length; i++) {
        if (thumbs[i].getElementsByClassName("cover")[0].classList.contains("active")) {
            currentDisplayedImgIndex = i
        }
    }
    imageAnimation()
}

function imageAnimation() {
    let mainImage1 = document.getElementsByClassName("image-scene")[0].getElementsByClassName("image-item")[0].getElementsByTagName("img")[0]
    let mainImageItem2 = document.getElementsByClassName("image-scene")[0].getElementsByClassName("image-item")[1]
    let mainImage2 = document.getElementsByClassName("image-scene")[0].getElementsByClassName("image-item")[1].getElementsByTagName("img")[0]
    let navigationBtns = document.getElementsByClassName("image-btn-navigation")

    navigationBtns[1].disabled = currentDisplayedImgIndex === (product.image_urls.images.length - 1);
    navigationBtns[0].disabled = currentDisplayedImgIndex === 0;

    mainImage1.setAttribute("src", product.image_urls.images[currentDisplayedImgIndex])
    setTimeout(() => {
        if (mainImageItem2.classList.contains("main-image-item-fade-in")) {
            mainImageItem2.classList.replace("main-image-item-fade-in", "main-image-item-fade-out")
        } else {
            mainImageItem2.classList.add("main-image-item-fade-out")
        }
    }, 0)

    setTimeout(() => {
        mainImage2.setAttribute("src", product.image_urls.images[currentDisplayedImgIndex])
        mainImageItem2.classList.replace("main-image-item-fade-out", "main-image-item-fade-in")
    }, 400)
}

/*============= end image panel area ===============*/


/*=============== start cart area ====================*/
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

/*================= end cart area ================*/


function showSideNavigation(button) {
    if (backDrop.classList.contains("back-drop-fade-out")) {
        backDrop.classList.replace("back-drop-fade-out", "back-drop-fade-in")
        sideNav.classList.replace("nav-slide-out", "nav-slide-in")
    } else {
        backDrop.classList.add("back-drop-fade-in")
        sideNav.classList.add("nav-slide-in") // .style = "left:0;"
    }
}

function hideSideNavigation(button) {
    sideNav.classList.replace("nav-slide-in", "nav-slide-out")
    setTimeout(() => {
        backDrop.classList.replace("back-drop-fade-in", "back-drop-fade-out")
    }, 155)
}

function buildCartItem() {
    return {
        "product_id": product.product_id,
        "thumb_url": product.image_urls.thumbs[0],
        "product_name": product.product_name,
        "number": parseInt(document.getElementsByClassName("count")[0].innerText),
        "currency": "$",
        "current_price": product.current_price,
        "total": parseInt(document.getElementsByClassName("count")[0].innerText) * product.current_price
    }
}

function getProduct() {
    return {
        "product_id": 1,
        "company": "SNEAKER COMPANY",
        "product_name": "Fall Limited Edition Sneakers",
        "description": "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
        "currency": "$",
        "current_price": 125.00,
        "reduction_percentage": "50%",
        "old_price": 250.00,
        "image_urls": {
            "thumbs": [
                "images/image-product-1-thumbnail.jpg",
                "images/image-product-2-thumbnail.jpg",
                "images/image-product-3-thumbnail.jpg",
                "images/image-product-4-thumbnail.jpg"
            ],
            "images": [
                "images/image-product-1.jpg",
                "images/image-product-2.jpg",
                "images/image-product-3.jpg",
                "images/image-product-4.jpg"
            ],
        }
    }
}