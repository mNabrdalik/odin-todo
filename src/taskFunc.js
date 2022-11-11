import {arrToLocal} from "./localStorage.js";
import {getDMY, addMonths} from './dateConvert.js';
// import { indexOf } from "lodash";

export function deleteTask(id, projectName, arr) {
    document.querySelector(`[data-project="${projectName}"][data-id="${id}"]`).remove();
    let index = arr.find(e => e.id == id);
    let pos = arr.indexOf(index);
    arr.splice(pos , 1);

    arrToLocal(arr);

    return arr;
    
}

export function editTask(id, arr) {

    let index;

    for(let i = 0; i < arr.length; i++) {
        if(arr[i].id == id) {
            index = i;
            break;
        }
    }

   let editForm = new taskForm;
   editForm.render();

   let dateString = getDMY(arr[index].date);

   document.querySelector(".addTask__content h2").innerText = "Edit Task";
   document.querySelector("#titleForm").value = arr[index].title;
   document.querySelector("#descForm").value = arr[index].description;
   document.querySelector("#priorForm").value = arr[index].priority;
   document.querySelector("#dateForm").value = (arr[index].date).toISOString().substring(0,10);
   document.querySelector("#submitForm").value = "Change";

   document.querySelector("#submitForm").remove();

   let submitBtn = document.createElement("input");
   submitBtn.id = "submitEditTask";
   submitBtn.type = "button";
   submitBtn.value = "Save changes";

   document.querySelector(".addTask__content").append(submitBtn);

   document.querySelector("#submitEditTask").addEventListener("click", () => {
  
        let title = document.getElementById("titleForm").value;
        let desc = document.getElementById("descForm").value;
        let prior = document.getElementById("priorForm").value;
        let date = document.getElementById("dateForm").value;

        arr[index].title = title;
        arr[index].description = desc;
        arr[index].priority = prior;
        arr[index].date =  new Date(date);

        let newDateString = getDMY(arr[index].date);

        document.querySelector(`[data-id="${id}"] p`).innerHTML = ` <span>${arr[index].priority}, </span> ${arr[index].title}, ${newDateString} <br> ${arr[index].description}`;

        document.querySelector(".addTask").remove();

        arrToLocal(arr);

    })

    

}

export function deleteProject(projectName, arrProject, arrTasks) {

    let pos = arrProject.indexOf(projectName);
    arrProject.splice(pos , 1);
    let taskToRemove = [];

    for(let i = 0; i < arrTasks.length; i++) {
        
        if(arrTasks[i].project == projectName) {          
            taskToRemove.push(i);
        }
    }

    for(let i = taskToRemove.length - 1; i >= 0; i--) {
        arrTasks.splice(taskToRemove[i], 1);
    }

    document.querySelectorAll(".project").forEach((element) => { 
        if (element.innerText === projectName) {
            element.parentElement.remove();
        }
    });

    arrToLocal(arrProject);
    arrToLocal(arrTasks);

    return arrProject, arrTasks;
}

export class taskForm {

    constructor(projectName, arr) {
        this.projectName = projectName;
        this.arr = arr;
    }

    removeFromBody(elem) {
        document.querySelector(elem).remove();
    }

    render() {
        let addTask = document.createElement("div");
        addTask.classList.add("addTask");
    
        let taskForm = document.createElement("div");    
        let close = document.createElement("button");
        let content = document.createElement("div");
        let submitBtn = document.createElement("input");
    
        addTask.appendChild(taskForm);
    
        close.innerText = "X";
    
        taskForm.classList.add("addTask__form");
        close.classList.add("addTask__close");
        content.classList.add("addTask__content");

        close.addEventListener("click", () => this.removeFromBody(".addTask"));

        content.innerHTML = `
            <h2>Add new task</h2>
            <input type="text" id="titleForm" name"title" placeholder="Task Title">
            <textarea id="descForm" name"desc" placeholder="Short description"></textarea>
            <div>
                <label for="prior">Priority:</label>
                <select id="priorForm" name="prior">
                    <option value="low" selected>Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <input type="date" id="dateForm" name="date" value="">
        `;

    submitBtn.id = "submitForm";
    submitBtn.type = "button";
    submitBtn.value = "Create Task";

    submitBtn.addEventListener("click", () => {
  
        let title = document.getElementById("titleForm").value;
        let desc = document.getElementById("descForm").value;
        let prior = document.getElementById("priorForm").value;
        let date = document.getElementById("dateForm").value;
        let id = this.arr[this.arr.length -1].id + 1;

        let newTask = {
            "id": id,
            "title": title,
            "description": desc,
            "priority": prior,
            "project": this.projectName,
            "date" : new Date(date),
            "isDone": false
        }
    
        this.arr.push(newTask);

        let tasksDIV = document.querySelector(".tasks");
    
        let task = document.createElement("div");
            
        printTask(newTask, newTask.id, this.projectName, this.arr, task);
        
        tasksDIV.appendChild(task);

        this.removeFromBody(".addTask");

        arrToLocal(this.arr);
    })

    taskForm.appendChild(close);
    taskForm.appendChild(content);
    document.body.appendChild(addTask);
    content.append(submitBtn);
    }

}

export function printTask(element, index, projectName, arr, task) {
    if(element.isDone != false) {
        task.classList.add("checked");
    }

    if(projectName == "" ) {
        let taskId = arr.find(e => e.id == index);
        projectName = arr[arr.indexOf(taskId)].project;
    }

    task.classList.add("task");
    task.setAttribute("data-id", index);
    task.setAttribute("data-project", projectName);

    let delBtn = document.createElement("button");
    delBtn.innerHTML = "Delete";

    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";

    delBtn.addEventListener('click', () => deleteTask(index, projectName, arr));
    editBtn.addEventListener('click', () => editTask(index, arr));


    task.innerHTML = ` <div class="task__checkbox"></div>
    <p><span class="task__priority ${element.priority}">${element.priority} </span><span class="task__title">${element.title}</span><span class="task__date">${getDMY(element.date)}</span><span  class="task__desc"> ${element.description}</span></p>`;

    task.appendChild(editBtn);
    task.appendChild(delBtn);
    
    return task;
}

export function checkedFunc(arr) {
    document.querySelectorAll(".task__checkbox").forEach((element) => { 
        element.addEventListener('click', (x) => {
            taskChecked(x, arr);
        })
    });
}

function taskChecked(x, arr) {
    x.target.parentElement.classList.toggle("checked");
    let id = x.target.parentElement.getAttribute("data-id");
    let index = arr.find(e => e.id == id);

    if(x.target.parentElement.classList.contains("checked")) {
        arr[arr.indexOf(index)].isDone = true;
    } else {
        arr[arr.indexOf(index)].isDone = false;
    }

    arrToLocal(arr);
}

export default {deleteTask, taskForm, printTask, checkedFunc, deleteProject};

