let gallery_item_img = document.getElementsByClassName("list_img")
let gallery_item_text = document.getElementsByClassName("list_description")
let previewer = document.getElementById("img_previewer")
let img_controller = document.getElementsByClassName("img_controller")[0]
let previewer_img = document.getElementsByClassName("preview_img")[0]
let previewer_text = document.getElementsByClassName("preview_text")[0]
let previewer_exit = document.getElementsByClassName("preview_exit")[0]
let arrow_left = document.getElementsByClassName("preview_arrow_left")[0]
let arrow_right = document.getElementsByClassName("preview_arrow_right")[0]
let profile_data = document.getElementsByClassName("profile_data")[0]
let profile = document.getElementsByClassName("profile")[0]
let exit = false
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

function preview(image, index, desc) {

    arrow_left.onclick = function () {
        exit = false
        let item = prevItem(gallery_item_img, index)
        preview(item.el, item.ind, gallery_item_text[item.ind])
    }
    arrow_right.onclick = function () {
        let item = nextItem(gallery_item_img, index)
        preview(item.el, item.ind, gallery_item_text[item.ind])
    }
    previewer_text.innerHTML = desc.innerHTML
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

for (let index in gallery_item_img) {
    let current_img = gallery_item_img[index]
    let current_text = gallery_item_text[index]
    try {
        addClick(current_img, function () {
            preview(current_img, index, current_text)
        })
    } catch (e) {
        console.log(e + '| Err ' + current_img)
    }
}



addClick(profile, function () {
    openProfileMenu()
})
addClick(previewer_img, function () {
    exit = false
})
addClick(img_controller, function (event) {
    if (img_controller == event.target)
        previewer.style.display = "none"
    exit = false
})
addClick(previewer_exit, function () {
    previewer.style.display = "none"
})
document.addEventListener("keyup", function (e) {
    if (e.key === "Escape") {
        previewer.style.display = "none"
    }
})