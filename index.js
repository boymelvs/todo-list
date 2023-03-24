"use strict";

const getModal = document.querySelector("#modal-container");
const confirmBtn = document.querySelector(".confirm");
const cancelBtn = document.querySelector(".cancel");
const form = document.getElementById("form");

let today = new Date();
let getMonth = today.getMonth().toString().length <= 1 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
let newDate = `${today.getFullYear()}-${getMonth}-${today.getDate()}`;
form["task-date"].min = newDate;


//create html tag
const createTag = (elem, name, value = "") => {
    const tag = document.createElement(elem);
    tag.setAttribute("class", name);
    tag.textContent = value;

    return tag;
}

//display the task after saving
const taskList = [];

const displayTask = (lists) => {
    const listDisplay = document.querySelector(".list-display");

    const sorted = lists.sort((a, b) => {
        const dateA = new Date(a.date.split('-').reverse().join('-'));
        const dateB = new Date(b.date.split('-').reverse().join('-'));
        return dateA - dateB;
    });


    for (let i = 0; i < lists.length; i++) {
        listDisplay.append(lists[i].task);
    }
}


// once save button is click do this function
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const ddmmyyyy = form["task-date"].value.split("-").reverse().join("-");
    const myTask = form["task"].value;

    const taskListTag = createTag("div", "task-list");
    const dateTag = createTag("div", "date", ddmmyyyy);
    const listTag = createTag("div", "list", myTask);

    const btnContainerTag = createTag("div", "btn-container");
    const btnCompleteTag = createTag("button", "complete-btn", "✔");
    const btnDeleteTag = createTag("button", "delete-btn", "✘");
    btnCompleteTag.type = "text";
    btnCompleteTag.title = "complete";
    btnDeleteTag.type = "text";
    btnDeleteTag.title = "delete";


    taskListTag.append(dateTag, listTag);
    btnContainerTag.append(btnCompleteTag, btnDeleteTag);
    taskListTag.append(btnContainerTag);

    const addedList = { date: ddmmyyyy, task: taskListTag };

    taskList.push(addedList);
    displayTask(taskList);

    btnCompleteTag.addEventListener("click", () => {

        dateTag.style.color = "red";
        dateTag.style.textDecoration = "line-through";

        listTag.style.color = "red";
        listTag.style.textDecoration = "line-through";

    });


    btnDeleteTag.addEventListener("click", (e) => {
        // taskListTag.parentNode.removeChild(taskListTag);
        taskListTag.remove(taskListTag);
        taskList.splice(taskList.indexOf(addedList), 1);
    });

    form.reset();

});


confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.querySelector(".userName");

    name.textContent = e.target.form[1].value;
    getModal.setAttribute("class", "");

});


cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.form.reset();
    getModal.setAttribute("class", "active show");
});


