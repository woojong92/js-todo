const todoDate = document.querySelector(".todo-date")

const dayArray = ["일","월","화","수","목","금","토"]

function getTime() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    const day = today.getDay();
    todoDate.innerText = `${month+1}월 ${date}일, ${dayArray[day]}`
    // const minutes = date.getMinutes();
    // const hours = date.getHours();
    // const seconds = date.getSeconds();
    // clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function paintDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    const day = today.getDay();
    todoDate.innerText = `${month+1}월 ${date}일, ${dayArray[day]}`
    // const mi
}


function init() {
    getTime()
    paintDate()
}

init()