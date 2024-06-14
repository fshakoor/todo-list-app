import { saveTasksToLocalStorage, loadTasksFromLocalStorage } from './task.js';

export function setupProjectListeners(addProjectBtn, sidebar, content, curDisplayHeader) {
    addProjectBtn.addEventListener("click", () => {
        let addProjectDialog = document.createElement("dialog");
        addProjectDialog.innerHTML = `
            <fieldset>
                <form action="" method="GET" id="addProjectForm">
                    <legend>Add New Project</legend>
                    <div class="input_title">
                        <label for="projectName">Project Name</label>
                        <input id="projectName" type="text" name="projectName" required />
                    </div>
                    <button autofocus type="submit" class="add">Add</button>
                </form>
            </fieldset>
        `;
        document.body.appendChild(addProjectDialog);
        addProjectDialog.showModal();

        let addProjectForm = document.getElementById('addProjectForm');

        addProjectForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const projectName = addProjectForm.projectName.value;
            createProject(projectName, sidebar, content, curDisplayHeader);
            addProjectDialog.close();
            saveProjectsToLocalStorage(sidebar);
        });
    });
}

export function createProject(projectName, sidebar, content, curDisplayHeader) {
    let newProjectBtn = document.createElement('button');
    newProjectBtn.classList.add('btn');
    newProjectBtn.innerText = projectName;

    newProjectBtn.addEventListener('click', () => {
        curDisplayHeader.innerHTML = projectName;
        document.querySelectorAll('.new-task').forEach(task => {
            if (task.classList.contains('project-task') && task.classList.contains(projectName)) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    });

    sidebar.insertBefore(newProjectBtn, sidebar.lastChild);
}

export function saveProjectsToLocalStorage(sidebar) {
    const projects = [];
    sidebar.querySelectorAll('.btn').forEach(btn => {
        if (!btn.classList.contains('active') && !['Inbox', 'Today', 'Next 7 Days', '+ Add Project'].includes(btn.innerText)) {
            projects.push(btn.innerText);
        }
    });
    localStorage.setItem('projects', JSON.stringify(projects));
}

export function loadProjectsFromLocalStorage(sidebar, content, curDisplayHeader) {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.forEach(projectName => {
        createProject(projectName, sidebar, content, curDisplayHeader);
    });
}
