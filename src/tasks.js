import {arrToLocal} from "./localStorage.js";
import { printTask, taskForm, checkedFunc, deleteProject} from './taskFunc.js';
import { getDMY, addMonths } from './dateConvert.js';

export function showTasks(projectName, arr) {

    let contentSection = document.querySelector("#content");

    contentSection.innerHTML = "";

    let tasksDIV = document.createElement("div");
    tasksDIV.classList.add("tasks");

    contentSection.appendChild(tasksDIV);

    let nameDIV = document.createElement("div");
    nameDIV.innerHTML = projectName;
    nameDIV.classList.add("tasks__header");
    tasksDIV.appendChild(nameDIV);

    arr.forEach((element) => {

        if (element.project == projectName) {

            let task = document.createElement("div");

            printTask(element, element.id, projectName, arr, task);

            tasksDIV.appendChild(task);
        }

    });

    let newTaskBtn = document.createElement("button");
    newTaskBtn.classList.add("newTask");
    newTaskBtn.innerText = "Add task";

    newTaskBtn.addEventListener('click', () => {
        let newTaskVar = new taskForm(projectName, arr);
        newTaskVar.render();
    }
    );

    checkedFunc(arr);

    contentSection.appendChild(newTaskBtn);

    return contentSection;
}

export function todayTasks(date, arr) {
    let convertedDate = getDMY(date);

    let contentSection = document.querySelector("#content");

    contentSection.innerHTML = "";

    let tasksDIV = document.createElement("div");
    tasksDIV.classList.add("tasks");

    contentSection.appendChild(tasksDIV);

    arr.forEach((element) => {

        if (getDMY(element.date) == convertedDate) {

            let task = document.createElement("div");

            printTask(element, element.id, "", arr, task);

            tasksDIV.appendChild(task);
        }

    });

    checkedFunc(arr);
}

export function weekTasks(arr) {

    let curr = new Date(); // get current date
    let first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    let last = first + 6; // last day is the first day + 6

    let firstday = new Date(curr.setDate(first));
    let lastday = new Date(curr.setDate(last));

    if (firstday.getDate() > lastday.getDate()) {
        addMonths(1, lastday);
    }

    let contentSection = document.querySelector("#content");

    contentSection.innerHTML = "";

    let tasksDIV = document.createElement("div");
    tasksDIV.classList.add("tasks");

    contentSection.appendChild(tasksDIV);

    arr.forEach((element) => {

        if ((element.date).getTime() >= firstday.getTime() && (element.date).getTime() <= lastday.getTime()) {

            let task = document.createElement("div");

            printTask(element, element.id, "", arr, task);

            tasksDIV.appendChild(task);
        }

    });

    checkedFunc(arr);
}

export function showProjects(arrProject, arrTasks) {

    let projectsList = document.querySelector("#projects");
    projectsList.innerHTML = "";

    for (let i = 1; i < arrProject.length; i++) {
        projectsList.innerHTML += `<li><div class="project">${arrProject[i]}</div><div class="deleteProject" data-project="${arrProject[i]}">X</div></li>`;
    }

    document.querySelectorAll(".project").forEach((element) => {
        element.addEventListener('click', () => {
            showTasks(element.textContent, arrTasks);
        })
    });

    document.querySelectorAll(".deleteProject").forEach((element) => {
        element.addEventListener('click', () => {
            deleteProject(element.getAttribute('data-project'), arrProject, arrTasks);
        })
    });

}

// edit task

//notes function (add new, showAll, delete etc.)

export default { showTasks, todayTasks, weekTasks };
