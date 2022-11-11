import _, { create } from 'lodash';
import 'bootstrap';

import './scss/style.scss';

import {storageAvailable} from "./localStorage.js";
import {showTasks, todayTasks, showProjects, weekTasks }  from './tasks.js';
import {projectForm, projectFormRender} from './projects.js';
import {showNotes, addNote} from './notes.js';

//ogarnąć localstorage
//stylowanie
//push na github

if (storageAvailable('localStorage')) {
    // Yippee! We can use localStorage awesomeness
    // console.log("Available localStorage");
  }
  else {
    // Too bad, no localStorage for us
    // console.log("No localStorage");
  }

//taks priority: low(green)/medium(yellow)/high(red)
if(localStorage.getItem("projects") == null) {
    const projectsDefault = ["inbox", "Project 01", "Project 02"];
    const tasksDefault = [
    
        {
            "id": 0,
            "title": "Exercise",
            "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi, earum?",
            "priority": "medium",
            "project": "inbox",
            "date" : new Date("2022-10-28"),
            "isDone": false,
        },
        {
            "id": 1,
            "title": "Learn",
            "description": "Lorem ipsum dolor consectetur, adipisicing elit. Eligendi, earum?",
            "priority": "high",
            "project": "inbox",
            "date" : new Date("2022-10-12"),
            "isDone": true,
        },
        {
            "id": 2,
            "title": "Play",
            "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi, earum?",
            "priority": "low",
            "project": "inbox",
            "date" : new Date("2022-10-28"),
            "isDone": false,
        },
        {
            "id": 3,
            "title": "Play",
            "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi, earum?",
            "priority": "low",
            "project": "inbox",
            "date" : new Date("2022-10-28"),
            "isDone": false,
        },
        {
            "id": 4,
            "title": "Test1",
            "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi, earum?",
            "priority": "low",
            "project": "Project 01",
            "date" : new Date("2022-10-31"),
            "isDone": false,
        },
        {
            "id": 5,
            "title": "Test3",
            "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi, earum?",
            "priority": "medium",
            "project": "Project 01",
            "date" : new Date("2022-11-02"),
            "isDone": false,
        },
        {
            "id": 6,
            "title": "Test2",
            "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi, earum?",
            "priority": "low",
            "project": "Project 02",
            "date" : new Date("2022-11-01"),
            "isDone": false,
        }
    
    
    ];
    
    const notesDefault = [
        {
            id: 0,
            title: "lorem",
            content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia exercitationem veniam repellendus harum minima ea omnis et modi possimus maxime quidem voluptatem quaerat explicabo autem, dignissimos nobis. Laudantium, at ratione."
        },
        {
            id: 1,
            title: "lorem2",
            content: "Mollitia exercitationem veniam repellendus harum minima ea omnis et modi possimus maxime quidem voluptatem quaerat explicabo autem, dignissimos nobis. Laudantium, at ratione."
        }
    ]
    
    //data to json
    let jsonProjects = JSON.stringify(projectsDefault);
    let jsonTasks = JSON.stringify(tasksDefault);
    let jsonNotes = JSON.stringify(notesDefault);

    // save to localStorage
    localStorage.setItem("projects", jsonProjects);
    localStorage.setItem("tasks", jsonTasks);
    localStorage.setItem("notes", jsonNotes);

}

// get the string
// from localStorage
const strProjects = localStorage.getItem("projects");
const strTasks = localStorage.getItem("tasks");
const strNotes = localStorage.getItem("notes");

// convert string to valid object
let projects = JSON.parse(strProjects);
let tasks = JSON.parse(strTasks);
let notes = JSON.parse(strNotes);


tasks.forEach((element) => {

    element.date = new Date(element.date);

});

function component() {
    const main = document.createElement('div');
    main.setAttribute('id', 'main'); 

    main.innerHTML += `
    <div class="sidenav d-flex flex-column">
        <button class="inbox sidenav__button"><img src="./img/inbox.svg" alt="inbox icon">INBOX</button>
        <button class="today sidenav__button"><img src="./img/star.svg" alt="today icon">TODAY</button>
        <button class="thisWeek sidenav__button" ><img src="./img/calendar.svg" alt="week icon">THIS WEEK</button>
        <div class="accordion-item accordion-main">
            <p class="accordion-header" id="headingProject">
            <button class="accordion-button accordion-projects collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#projectsList" aria-expanded="false" aria-controls="projectsList">
            <img src="./img/files-stack.svg" alt="project icon"> PROJECTS
            </button>
            </p>
            <div id="projectsList" class="accordion-collapse collapse" aria-labelledby="headingProject" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <ul id="projects"></ul>                      
                </div>
            </div>
        </div>

        <div class="accordion-item accordion-main">
            <p class="accordion-header" id="headingNotes">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#notesList" aria-expanded="false" aria-controls="notesList">
            <img src="./img/notebook.svg" alt="notes icon"> NOTES
            </button>
            </p>
            <div id="notesList" class="accordion-collapse collapse" aria-labelledby="headingNotes" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                        <ul id="notes">

                            
                        </ul>
                        <button id="addNote" class="addNote" >New note</button>
                </div>
            </div>
        </div>
    </div>
    
    <div id="content">
        <div class="tasks">
        </div>

    </div>
    `;

    return main;
}

document.body.appendChild(component());

document.querySelector(".inbox").addEventListener("click", (e) => {
    showTasks("inbox", tasks);
    activeElement(e);
});

document.querySelector(".today").addEventListener("click", (e) => {
    todayTasks(new Date(), tasks);
    activeElement(e);
});

document.querySelector(".thisWeek").addEventListener("click", (e) => {
    weekTasks(tasks);
    activeElement(e);
});

document.querySelector("#headingProject").addEventListener("click", () => {
    showProjects(projects, tasks);
    activeElement("");
});

document.querySelector("#headingNotes").addEventListener("click", () => {
    showNotes(notes);
    activeElement("");
});

document.querySelector("#addNote").addEventListener("click", () => {addNote(notes)});

projectForm();

document.querySelector("#addProject").addEventListener("click", () => {projectFormRender(projects, tasks)});

function activeElement(x) {
    document.querySelectorAll(".sidenav__button").forEach(element => {
        element.classList.remove("activeEl");
    })

    //path[0] - clicked <> 
    if(x != "") {
        x.path[0].classList.add("activeEl");

    }
 
}