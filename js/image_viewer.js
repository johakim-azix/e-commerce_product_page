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