import {arrToLocal} from "./localStorage.js";
import { showAcc, showSide } from "./animation.js";

class Note {

    constructor(arr, title, content, id) {
        this.arr = arr;
        this.title = title;
        this.content = content;
        this.id = id;
    }

    render() {

        let newNote = {
            "id": this.id,
            "title": this.title,
            "content": this.content,
        }
    
        this.arr.push(newNote);

        showNotes(this.arr);

        arrToLocal(this.arr);
    }

}

function showNote(x, arr) {

    let contentSection = document.querySelector("#content");

    contentSection.innerHTML = "";

    let noteDIV = document.createElement("div");
    noteDIV.classList.add("noteAll");

    contentSection.appendChild(noteDIV);

    let contentDiv = document.querySelector(".noteAll");

    let id = x.getAttribute('data-id');

    let index = arr.find(e => e.id == id);
    let pos = arr.indexOf(index);

    contentDiv.innerHTML = `<h1 class="note__header">${arr[pos].title}</h1>
                            <p class="note__content">${arr[pos].content}</p>
                            <div class="editNote" data-id="${arr[pos].id}}">Edit note</div>
                            <div class="deleteNote" data-id="${arr[pos].id}}">Delete note</div>`;

    document.querySelector(".editNote").addEventListener('click', () => {
        editNote(arr[pos].id, arr);
    })

    document.querySelector(".deleteNote").addEventListener('click', () => {
        deleteNote(arr[pos].id, arr);
    })  
}

export function showNotes(arr) {
    let notesList = document.querySelector("#notes");
    notesList.innerHTML = "";

    arr.forEach(element => {
        notesList.innerHTML += `<li class="note" data-id="${element.id}">${element.title}</li>`
    });


    document.querySelectorAll(".note").forEach(element => {
        element.addEventListener('click', () => {
            showNote(element, arr);
            showSide(); 
            showAcc();
        })
    })

}

export function addNote(arr) {

        let addNote = document.createElement("div");
        addNote.classList.add("addTask");
    
        let noteForm = document.createElement("div");    
        let close = document.createElement("button");
        let content = document.createElement("div");
        let submitBtn = document.createElement("input");
    
        addNote.appendChild(noteForm);
    
        close.innerText = "X";
    
        noteForm.classList.add("addTask__form");
        close.classList.add("addTask__close");
        content.classList.add("addTask__content");
    
        close.addEventListener("click", () => removeFromBody(".addTask"));

        content.innerHTML = `
            <h2>Add new note</h2>
            <input type="text" id="titleNote" name"title" placeholder="Task Title">
            <textarea id="contentNote" name"desc" placeholder="Content"></textarea>
        `;

        submitBtn.id = "submitForm";
        submitBtn.type = "button";
        submitBtn.value = "Create Note";

        submitBtn.addEventListener("click", () => {
            let title = document.getElementById("titleNote").value;
            let content = document.getElementById("contentNote").value;
            let id = arr[arr.length -1].id + 1;

            let newObj = new Note(arr,title,content,id);
            newObj.render();

            removeFromBody(".addTask");
                   
        })

        noteForm.appendChild(close);
        noteForm.appendChild(content);
        document.body.appendChild(addNote);
        content.append(submitBtn);
        
        
}


function removeFromBody(elem) {
    document.querySelector(elem).remove();
}

function editNote(id, arr) {
    addNote(arr);

    let index = arr.find(e => e.id == id);
    let pos = arr.indexOf(index);


    document.querySelector(".addTask__content h2").innerText = "Edit Note";
    document.querySelector("#titleNote").value = arr[pos].title;
    document.querySelector("#titleNote").style.display = "none";
    document.querySelector("#contentNote").value = arr[pos].content;
    document.querySelector("#submitForm").remove();

    let submitBtn = document.createElement("input");
    submitBtn.id = "submitEditNote";
    submitBtn.type = "button";
    submitBtn.value = "Save change";
 
    document.querySelector(".addTask__content").append(submitBtn);

    document.querySelector("#submitEditNote").addEventListener("click", () => {
  
        let contentNote = document.querySelector("#contentNote").value;

        arr[pos].content = contentNote;

        document.querySelector(".note__content").innerText = arr[pos].content ;

        document.querySelector(".addTask").remove();

        arrToLocal(arr);
    })

}

function deleteNote(id, arr) {

    document.querySelectorAll(".note").forEach(element => {
        if(element.getAttribute('data-id') == id) {
            element.remove();
            document.querySelector(".noteAll").innerHTML = "";

            let index = arr.find(e => e.id == id);
            let pos = arr.indexOf(index);
            arr.splice(pos , 1);
        
            arrToLocal(arr);
        }
    })


}

export default {showNotes, addNote};