"use strict";

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

    for (let list of sorted) {
        listDisplay.appendChild(list.task);
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
    btnCompleteTag.title = "complete";
    btnDeleteTag.title = "delete";


    taskListTag.append(dateTag, listTag);
    btnContainerTag.append(btnCompleteTag, btnDeleteTag);
    taskListTag.append(btnContainerTag);

    const addedList = { date: ddmmyyyy, task: taskListTag };

    taskList.push(addedList);
    displayTask(taskList);

    btnCompleteTag.addEventListener("click", (e) => checkDeleteBtn(e, dateTag, listTag));
    btnDeleteTag.addEventListener("click", (e) => checkDeleteBtn(e, taskListTag, taskList));

    form.reset();

});

const checkDeleteBtn = (e, taskTag, taskList) => {
    const classValue = e.target.classList.value;

    if (classValue === "delete-btn") {
        taskTag.parentNode.removeChild(taskTag);
        taskList.splice(taskList.indexOf(taskTag), 1);
    }
    else {

        taskTag.style.color = "red";
        taskTag.style.textDecoration = "line-through";

        taskList.style.color = "red";
        taskList.style.textDecoration = "line-through";
    }

};



