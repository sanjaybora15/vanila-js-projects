import {data} from "./data.js"

let input = document.getElementById("search-box");
let recommend = document.getElementById("recommend")

const resetClass = () => {
    recommend.classList.remove("visible")
}

const handleItemClick = (e) => {
    let {key} = e.target.dataset;
    if (key) {
        input.value = key;
        resetClass()
    }
 }

const renderItems = (list) => {
    let fragment = document.createDocumentFragment()

    list.forEach(element => {
        let el = document.createElement("div")
        el.classList.add("search-item");
        el.setAttribute("data-key", element);
    
        el.innerHTML = element
        fragment.appendChild(el);
    });
    recommend.innerHTML  = ""
    recommend.appendChild(fragment);
}

const handleKeySearch = (key) => {
    let filterData = data.filter(item => item.substring(0, key.length).toLowerCase() === key.toLowerCase())
    if (filterData.length) {
        recommend.classList.add("visible");
        renderItems(filterData);
    }
}
const handleInput = (e) => {
    let val = e.target.value
    if (val) {
        handleKeySearch(e.target.value);
    } else {
        resetClass()
    }
}

const useDebounce = (callback, delay = 500) => {
    let timer
    return function (){
        let self = this;
        let args = arguments
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            callback.apply(self, args)
        }, delay)
    }
}


(() => {
    input.addEventListener("input", useDebounce(handleInput, 500))
    recommend.addEventListener("click" , handleItemClick)
})()