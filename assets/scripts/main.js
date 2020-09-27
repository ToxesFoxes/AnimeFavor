let gallery = document.getElementsByClassName("grid_img")
let previewer = document.getElementById("img_previewer")
let previewer_img = document.getElementsByClassName("preview")[0]
let previewer_exit = document.getElementsByClassName("exit")[0]
let arrow_left = document.getElementsByClassName("arrow_left")[0]
let arrow_right = document.getElementsByClassName("arrow_right")[0]
let profile_data = document.getElementsByClassName("profile_data")[0]
let profile = document.getElementsByClassName("profile")[0]

function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    )
}

function getHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    )
}

function nextItem(arr, i) {
    i = i + 1
    i = i % arr.length
    return { el: arr[i], ind: i }
}

function prevItem(arr, i) {
    if (i == 0) {
        i = arr.length
    }
    i = i - 1
    return { el: arr[i], ind: i }
}

function openProfileMenu() {
    switch (profile_data.style.visibility) {
        case "visible":
            profile_data.style.visibility = "hidden"
            profile_data.style.opacity = 0
            break
        case "hidden":
        default:
            profile_data.style.visibility = "visible"
            profile_data.style.opacity = 1
            break
    }
}

function preview(image, index) {

    arrow_left.onclick = function () {
        let item = prevItem(gallery, index)
        preview(item.el, item.ind)
    }
    arrow_right.onclick = function () {
        let item = prevItem(gallery, index)
        preview(item.el, item.ind)
    }
    previewer_img.src = image.src
    previewer.style.display = "flex"
}

function addClick(element, func) {
    try {
        element.addEventListener("click", func)
    } catch (e) {
        console.log(e + "| Element: " + element)
    }
}

for (let img_index in gallery) {
    let current_img = gallery[img_index]
    try {
        addClick(current_img, function () {
            preview(current_img, img_index)
        })
    } catch (e) {
        console.log(e + '| Err ' + current_img)
    }
}



addClick(profile, function () {
    openProfileMenu()
})

addClick(previewer_exit, function () {
    previewer.style.display = "none"
})