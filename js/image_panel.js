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
