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