import './style.css';

// TODO
// - Form should not submit until required fields done

import { setupTaskListeners, loadTasksFromLocalStorage } from './task.js';
import { setupProjectListeners, loadProjectsFromLocalStorage, createProject } from './project.js';
import { setupSidebarListeners } from './sidebar.js';

const main = document.querySelector('.main');
const header = document.createElement('div');
const headerText = document.createElement('div');
headerText.innerText = "To-Do";
headerText.classList.add('headerText');
header.classList.add('header');

const sidebar = document.createElement('div');
sidebar.classList.add('sidebar');
const inboxBtn = document.createElement('button');
inboxBtn.classList.add('btn');
inboxBtn.classList.add('active');
inboxBtn.innerText = "Inbox";

const todayBtn = document.createElement('button');
todayBtn.classList.add('btn');
todayBtn.innerText = "Today";

const thisWeekBtn = document.createElement('button');
thisWeekBtn.classList.add('btn');
thisWeekBtn.innerText = "Next 7 Days";

const projectsDivider = document.createElement('div');
projectsDivider.classList.add('project-divider');
projectsDivider.innerText = "Projects";

const todosDivider = document.createElement('div');
todosDivider.classList.add('project-divider');
todosDivider.innerText = "To-Do";

const addProjectBtn = document.createElement('button');
addProjectBtn.classList.add('btn');
addProjectBtn.innerText = "+ Add Project";

const content = document.createElement('div');
content.classList.add('content');

let curDisplayHeader = document.createElement('div');
curDisplayHeader.classList.add('cur-display-header');
curDisplayHeader.innerText = "Inbox";
content.appendChild(curDisplayHeader);

let task = document.createElement('button');
let addDialog = document.createElement("dialog");
addDialog.innerHTML = `
<fieldset>
    <form action="" method="GET" id="addTaskForm">
        <legend>Add New To-Do</legend>
        <div class="input_title">
            <label for="title">Title</label>
            <input id="title" type="text" name="title" required />
        </div>
        <div class="input_description">
            <label for="description">Description</label>
            <textarea id="description" name="description" rows="4" cols="50"></textarea>
        </div>
        <div class="input_duedate">
            <label for="duedate">Due Date</label>
            <input id="duedate" type="date" name="duedate" required />
        </div>
        <div class="input_priority">
            <label for="priority">Priority</label>
            <input id="low" type="radio" name="priority" value="Low" required />Low
            <input id="medium" type="radio" name="priority" value="Medium" required />Medium
            <input id="high" type="radio" name="priority" value="High" required/>High
        </div>                    
        <button autofocus type="submit" class="add">Add</button>
    </form>
</fieldset>
`;

main.appendChild(addDialog);

task.innerHTML = "+ Add Task";
task.classList.add('add-task');
content.appendChild(task);

sidebar.appendChild(todosDivider);
sidebar.appendChild(inboxBtn);
sidebar.appendChild(todayBtn);
sidebar.appendChild(thisWeekBtn);
sidebar.appendChild(projectsDivider);
sidebar.appendChild(addProjectBtn);
main.appendChild(sidebar);
main.appendChild(content);

setupTaskListeners(task, addDialog, content, curDisplayHeader);
setupProjectListeners(addProjectBtn, sidebar, content, curDisplayHeader);
setupSidebarListeners(inboxBtn, todayBtn, thisWeekBtn, sidebar, content, curDisplayHeader);

// Load tasks and projects from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProjectsFromLocalStorage(sidebar, content, curDisplayHeader);
    loadTasksFromLocalStorage(content);
});