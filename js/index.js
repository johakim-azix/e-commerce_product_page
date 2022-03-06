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
    sideNav = document.getElementsByClassName("side-navigation")[0]
    backDrop = document.getElementsByClassName("tooltip-backdrop")[0]
    cart = document.getElementsByClassName("cart-content")[0]
})

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