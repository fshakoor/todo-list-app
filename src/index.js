import './style.css';

// TODO
// - Clicking on view will clear the current view and bring up the new view
// - If date is today or this week, task needs to be stored to add to those views
// - Delete a task
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
thisWeekBtn.innerText = "Next 7 Days"

const projectsDivider = document.createElement('div');
projectsDivider.classList.add('project-divider');
projectsDivider.innerText = "Projects"

const addProjectBtn = document.createElement('button');
addProjectBtn.classList.add('btn');
addProjectBtn.innerText = "+ Add Project"

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
taskDescription.innerHTML = "Fold all clothes on the bed!";
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
    taskName.addEventListener('click', () => {
        let showTaskDescription = document.createElement("dialog");
        showTaskDescription.classList.add('modal-task-description')
    
        let expandedTaskTitle = document.createElement('div');
        let expandedTaskDescription = document.createElement('div');
        let closeTaskDescriptionButton = document.createElement('button');
    
        let titleText = document.createElement('div');
        titleText.innerText = 'Title'
        titleText.classList.add('title-text');
        let descriptionText = document.createElement('div');
        descriptionText.innerText = 'Notes'
        descriptionText.classList.add('description-text');
    
        expandedTaskTitle.innerHTML = addTaskForm.title.value;
        expandedTaskDescription.innerHTML = addTaskForm.description.value;
        closeTaskDescriptionButton.innerHTML = 'Close';
        closeTaskDescriptionButton.classList.add('closeBtn')
    
        showTaskDescription.appendChild(titleText)
        showTaskDescription.appendChild(expandedTaskTitle)
        showTaskDescription.appendChild(descriptionText)
        showTaskDescription.appendChild(expandedTaskDescription)
        showTaskDescription.appendChild(closeTaskDescriptionButton)
        main.appendChild(showTaskDescription);
    
        showTaskDescription.showModal();
    
        closeTaskDescriptionButton.addEventListener('click', () => {
            showTaskDescription.close();
        })
    })
    content.appendChild(newTask);
    console.log(addTaskForm.duedate.value);
    // current task: if the date = today, then give it a "today" attribute. then go into the today view event listener and loop through tasks
    // to only show today tasks and hide all the other ones
    
    let dateInput = addTaskForm.duedate.value;
    let dateInputObj = new Date(dateInput);
    const today = new Date();

    dateInputObj.setMinutes(dateInputObj.getMinutes() + dateInputObj.getTimezoneOffset());

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 7);
    
    console.log(dateInputObj.toDateString());
    console.log(today.toDateString());
    console.log(endDate.toDateString());
    
    const isToday = (
      today.getFullYear() === dateInputObj.getFullYear() &&
      today.getMonth() === dateInputObj.getMonth() &&
      today.getDate() === dateInputObj.getDate()
    );

    const isWithinWeek = (
        dateInputObj >= today &&
        dateInputObj <= endDate
      );

    if (isToday) {newTask.classList.add('today')}
    if (isWithinWeek) {newTask.classList.add('thisWeek')}
    
    addTaskForm.reset();
});

// Checks off a task
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

// Show's task's description
taskName.addEventListener('click', () => {
    let showTaskDescription = document.createElement("dialog");
    showTaskDescription.classList.add('modal-task-description')

    let expandedTaskTitle = document.createElement('div');
    let expandedTaskDescription = document.createElement('div');
    let closeTaskDescriptionButton = document.createElement('button');

    let titleText = document.createElement('div');
    titleText.innerText = 'Title'
    titleText.classList.add('title-text');
    let descriptionText = document.createElement('div');
    descriptionText.innerText = 'Notes'
    descriptionText.classList.add('description-text');

    expandedTaskTitle.innerHTML = taskName.innerHTML;
    expandedTaskDescription.innerHTML = taskDescription.innerHTML;
    closeTaskDescriptionButton.innerHTML = 'Close';
    closeTaskDescriptionButton.classList.add('closeBtn')

    showTaskDescription.appendChild(titleText)
    showTaskDescription.appendChild(expandedTaskTitle)
    showTaskDescription.appendChild(descriptionText)
    showTaskDescription.appendChild(expandedTaskDescription)
    showTaskDescription.appendChild(closeTaskDescriptionButton)
    main.appendChild(showTaskDescription);

    showTaskDescription.showModal();

    closeTaskDescriptionButton.addEventListener('click', () => {
        showTaskDescription.close();
    })
})

// For adding a new project
addProjectBtn.addEventListener('click', () => {
    let titleAndInputContainer = document.createElement('div');
    titleAndInputContainer.classList.add('project-title-input-container');

    let showProjectModal = document.createElement("dialog");
    showProjectModal.classList.add('modal-add-project')
    let addProjectButton = document.createElement('button');

    let titleText = document.createElement('div');
    titleText.innerText = 'Title:'
    titleText.classList.add('title-text');
    let nameNewProject = document.createElement('input');
    nameNewProject.id = 'title';

    addProjectButton.innerHTML = 'Add Project';
    addProjectButton.classList.add('closeBtn');
    addProjectBtn.type = 'submit';

    titleAndInputContainer.appendChild(titleText)
    titleAndInputContainer.appendChild(nameNewProject)
    showProjectModal.appendChild(titleAndInputContainer)

    showProjectModal.appendChild(addProjectButton)
    main.appendChild(showProjectModal);

    showProjectModal.showModal();

    addProjectButton.addEventListener('click', () => {
        showProjectModal.close();
        createProject(nameNewProject.value)
    })
})

function createProject(projectName) {
    const newProject = document.createElement('button');
    newProject.classList.add('btn');
    newProject.innerText = projectName
    sidebar.appendChild(newProject);

    newProject.addEventListener('click', () => {
        curDisplayHeader.innerHTML = projectName;

        sidebar.childNodes.forEach(element => {
            if (element.classList.contains('active')) {
                element.classList.remove('active')
            }
        });
    
        newProject.classList.add('active');
    })
}

inboxBtn.addEventListener('click', () => {
    curDisplayHeader.innerHTML = inboxBtn.innerText;

    sidebar.childNodes.forEach(element => {
        if (element.classList.contains('active')) {
            element.classList.remove('active')
        }
    });

    inboxBtn.classList.add('active');
})

todayBtn.addEventListener('click', () => {
    curDisplayHeader.innerHTML = todayBtn.innerText;

    sidebar.childNodes.forEach(element => {
        if (element.classList.contains('active')) {
            element.classList.remove('active')
        }
    });

    todayBtn.classList.add('active');
})

thisWeekBtn.addEventListener('click', () => {
    curDisplayHeader.innerHTML = thisWeekBtn.innerText;

    sidebar.childNodes.forEach(element => {
        if (element.classList.contains('active')) {
            element.classList.remove('active')
        }
    });

    thisWeekBtn.classList.add('active');
})