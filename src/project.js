export function setupProjectListeners(addProjectBtn, sidebar, content, curDisplayHeader) {
    addProjectBtn.addEventListener('click', () => {
        let titleAndInputContainer = document.createElement('div');
        titleAndInputContainer.classList.add('project-title-input-container');

        let showProjectModal = document.createElement("dialog");
        showProjectModal.classList.add('modal-add-project');
        let addProjectButton = document.createElement('button');

        let titleText = document.createElement('div');
        titleText.innerText = 'Title:';
        titleText.classList.add('title-text');
        let nameNewProject = document.createElement('input');
        nameNewProject.id = 'title';

        addProjectButton.innerHTML = 'Add Project';
        addProjectButton.classList.add('closeBtn');
        addProjectBtn.type = 'submit';

        titleAndInputContainer.appendChild(titleText);
        titleAndInputContainer.appendChild(nameNewProject);
        showProjectModal.appendChild(titleAndInputContainer);

        showProjectModal.appendChild(addProjectButton);
        document.querySelector('.main').appendChild(showProjectModal);

        showProjectModal.showModal();

        addProjectButton.addEventListener('click', () => {
            showProjectModal.close();
            createProject(nameNewProject.value, sidebar, content, curDisplayHeader);
        });
    });
}

export function createProject(projectName, sidebar, content, curDisplayHeader) {
    const newProject = document.createElement('button');
    newProject.classList.add('btn');
    newProject.innerText = projectName;
    sidebar.appendChild(newProject);

    newProject.addEventListener('click', () => {
        curDisplayHeader.innerHTML = projectName;

        sidebar.childNodes.forEach(element => {
            if (element.classList.contains('active')) {
                element.classList.remove('active');
            }
        });
    
        newProject.classList.add('active');

        content.childNodes.forEach(element => {
            if (element.classList.contains('new-task') && element.classList.contains('project-task') && element.classList.contains(curDisplayHeader.innerHTML)) {
                element.classList.remove('hidden');
            } else if (element.classList.contains('new-task')) {
                element.classList.add('hidden');
            }
        });
    });
}
