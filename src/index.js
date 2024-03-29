import './style.css';

// TODO:
// - Form submit adds task to page
// - Clicking on a task brings up a description vie
// - Checking off a task is toggleable
// - Checking off a task crosses out the title and greys out other text
// - Clicking on view will clear the current view and bring up the new view
// - Clicking on a view will highlight it in the sidebar
// - If date is today or this week, task needs to be stored to add to those views
// - Projects
// - Local storage?
// - seperate and export into modules

let isEmpty = true;
const main = document.querySelector('.main');
const header = document.createElement('div');
const headerText = document.createElement('div');
headerText.innerText = "To-Do"
headerText.classList.add('headerText');
header.classList.add('header');

const sidebar = document.createElement('div');
sidebar.classList.add('sidebar');
const inboxBtn = document.createElement('button');
inboxBtn.classList.add('btn');
inboxBtn.classList.add('active');
inboxBtn.innerText = "Inbox"

const todayBtn = document.createElement('button');
todayBtn.classList.add('btn');
todayBtn.innerText = "Today"

const thisWeekBtn = document.createElement('button');
thisWeekBtn.classList.add('btn');
thisWeekBtn.innerText = "This Week"

const projectsDivider = document.createElement('div');
projectsDivider.classList.add('project-divider');
projectsDivider.innerText = "Projects"

const addProjectBtn = document.createElement('button');
addProjectBtn.classList.add('btn');
addProjectBtn.innerText = "Add Project"

const content = document.createElement('div');
content.classList.add('content');

let curDisplayHeader = document.createElement('div');
curDisplayHeader.classList.add('cur-display-header');
curDisplayHeader.innerText = "Inbox";
content.appendChild(curDisplayHeader);

let task = document.createElement('button');
const dialog = document.querySelector("dialog");
task.innerHTML = "+ Add Task";
task.classList.add('add-task');
content.appendChild(task);

header.appendChild(headerText);
main.appendChild(header);
sidebar.appendChild(inboxBtn);
sidebar.appendChild(todayBtn);
sidebar.appendChild(thisWeekBtn);
sidebar.appendChild(projectsDivider);
sidebar.appendChild(addProjectBtn);
main.appendChild(sidebar);
main.appendChild(content);

task.addEventListener("click", () => {
    dialog.showModal();
});
const closeButton = document.querySelector(".add");
let addTaskForm = document.getElementById('addTaskForm');

let left = document.createElement('div');
left.classList.add('left-side-task')
let right = document.createElement('div');
right.classList.add('right-side-task')
let newTask = document.createElement('div');
newTask.classList.add('new-task');
let completeTaskBtn = document.createElement('button');
completeTaskBtn.classList.add('complete-task-btn');
let taskName = document.createElement('div');
taskName.classList.add('task-name');
let taskDueDate = document.createElement('div');
taskDueDate.classList.add('task-due-date');
let taskPriority = document.createElement('div');
taskPriority.classList.add('task-priority');

// for onclick
let taskDescription = document.createElement('div');

left.appendChild(completeTaskBtn);
left.appendChild(taskName);
right.appendChild(taskDueDate);
right.appendChild(taskPriority);
newTask.appendChild(left);
newTask.appendChild(right);
completeTaskBtn.innerHTML = '';
taskName.innerHTML = "Fold Clothes";
taskDueDate.innerHTML = "Due: 2024-02-04";
taskPriority.innerHTML = "Priority: Low";
content.appendChild(newTask)

closeButton.addEventListener("click", () => {
    dialog.close();
  });

addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let left = document.createElement('div');
    left.classList.add('left-side-task')
    let right = document.createElement('div');
    right.classList.add('right-side-task')
    let newTask = document.createElement('div');
    newTask.classList.add('new-task');
    let completeTaskBtn = document.createElement('button');
    completeTaskBtn.classList.add('complete-task-btn');
    let taskName = document.createElement('div');
    taskName.classList.add('task-name');
    let taskDueDate = document.createElement('div');
    taskDueDate.classList.add('task-due-date');
    let taskPriority = document.createElement('div');
    taskPriority.classList.add('task-priority');

    // for onclick
    let taskDescription = document.createElement('div');
    console.log(addTaskForm.description.value)
    
    left.appendChild(completeTaskBtn);
    left.appendChild(taskName);
    right.appendChild(taskDueDate);
    right.appendChild(taskPriority);
    newTask.appendChild(left);
    newTask.appendChild(right);
    completeTaskBtn.innerHTML = ' ';
    taskName.innerHTML = addTaskForm.title.value;
    taskDueDate.innerHTML = 'Due: ' + addTaskForm.duedate.value;
    taskPriority.innerHTML = 'Priority: ' + addTaskForm.priority.value;

    completeTaskBtn.addEventListener("click", () => {
        if (completeTaskBtn.classList.contains('complete-task')) {
            completeTaskBtn.classList.remove('complete-task')
            completeTaskBtn.innerHTML = ''
            right.classList.remove('task-completed')
            taskName.classList.remove('task-completed')
        } else {
            completeTaskBtn.classList.add('complete-task')
            completeTaskBtn.innerHTML = '✓'
            right.classList.add('task-completed')
            taskName.classList.add('task-completed')
        }
    })
    content.appendChild(newTask);
});

completeTaskBtn.addEventListener("click", () => {
    if (completeTaskBtn.classList.contains('complete-task')) {
        completeTaskBtn.classList.remove('complete-task')
        completeTaskBtn.innerHTML = ''
        right.classList.remove('task-completed')
        taskName.classList.remove('task-completed')
    } else {
        completeTaskBtn.classList.add('complete-task')
        completeTaskBtn.innerHTML = '✓'
        right.classList.add('task-completed')
        taskName.classList.add('task-completed')
    }
})

