
import {arrToLocal} from "./localStorage.js";
import { showProjects } from './tasks';


export function projectForm() {

    let form = document.querySelector("#projectsList .accordion-body");

    let formDiv = document.createElement("div");
    formDiv.classList.add("newProject");
    formDiv.classList.add("sidenav__button");

    formDiv.innerHTML = `<input type="text" name="projectNameForm" id="projectNameForm" placeholder="Type project name" value="" />
    <input id="addProject" type="submit" value="Add" />`;

    form.appendChild(formDiv);
}

export function projectFormRender(projectArr, arrTasks) {
    
    let name = document.querySelector('[name="projectNameForm"').value;
    projectArr.push(name);

    showProjects(projectArr, arrTasks);

    // let projectsList = document.querySelector("#projects");

    // projectsList.innerHTML += `<li><div class="project">${name}</div><div class="deleteProject" data-project="${name}">X</div></li>`;

    arrToLocal(projectArr);
}

export default {projectForm, projectFormRender};
