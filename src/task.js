export function setupTaskListeners(task, addDialog, content, curDisplayHeader) {
    task.addEventListener("click", () => {
        addDialog.showModal();
    });

    const closeButton = document.querySelector(".add");
    let addTaskForm = document.getElementById('addTaskForm');

    closeButton.addEventListener("click", () => {
        addDialog.close();
    });

    addTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let left = document.createElement('div');
        left.classList.add('left-side-task');
        let right = document.createElement('div');
        right.classList.add('right-side-task');
        let newTask = document.createElement('div');
        newTask.classList.add('new-task');
        if (curDisplayHeader.innerHTML != 'Inbox' && curDisplayHeader.innerHTML != 'Today' && curDisplayHeader.innerHTML != 'Next 7 Days') {
            newTask.classList.add('project-task'); // generic tag to distinguish projects from the main 3 tabs
            newTask.classList.add(curDisplayHeader.innerHTML); // specific tag to distinguish project tabs between each other
        }
        let completeTaskBtn = document.createElement('button');
        completeTaskBtn.classList.add('complete-task-btn');
        let deleteTaskBtn = document.createElement('button');
        let editTaskBtn = document.createElement('button');
        editTaskBtn.classList.add('edit-task-btn');
        deleteTaskBtn.classList.add('delete-task-btn');
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
        right.append(editTaskBtn);
        right.append(deleteTaskBtn);
        newTask.appendChild(left);
        newTask.appendChild(right);
        completeTaskBtn.innerHTML = ' ';
        editTaskBtn.innerHTML = '✎';
        deleteTaskBtn.innerHTML = '✕';
        taskName.innerHTML = addTaskForm.title.value;
        taskDueDate.innerHTML = 'Due: ' + addTaskForm.duedate.value;
        taskPriority.innerHTML = 'Priority: ' + addTaskForm.priority.value;

        let taskDescription = addTaskForm.description.value;

        completeTaskBtn.addEventListener("click", () => {
            if (completeTaskBtn.classList.contains('complete-task')) {
                completeTaskBtn.classList.remove('complete-task');
                completeTaskBtn.innerHTML = '';
                right.classList.remove('task-completed');
                taskName.classList.remove('task-completed');
            } else {
                completeTaskBtn.classList.add('complete-task');
                completeTaskBtn.innerHTML = '✓';
                right.classList.add('task-completed');
                taskName.classList.add('task-completed');
            }
            saveTasksToLocalStorage();
        });

        let expandedTaskTitle = document.createElement('div');
        expandedTaskTitle.classList.add('expanded-task-title');
        let expandedTaskDescription = document.createElement('div');
        expandedTaskTitle.classList.add('expanded-desc');

        taskName.addEventListener('click', () => {
            let showTaskDescription = document.createElement("dialog");
            showTaskDescription.classList.add('modal-task-description');
        
            let closeTaskDescriptionButton = document.createElement('button');
        
            let titleText = document.createElement('div');
            titleText.innerText = 'Title';
            titleText.classList.add('title-text');
            let descriptionText = document.createElement('div');
            descriptionText.innerText = 'Notes';
            descriptionText.classList.add('description-text');

            expandedTaskTitle.innerHTML = taskName.innerHTML;
            expandedTaskDescription.innerHTML = taskDescription;

            closeTaskDescriptionButton.innerHTML = 'Close';
            closeTaskDescriptionButton.classList.add('closeBtn');
        
            showTaskDescription.appendChild(titleText);
            showTaskDescription.appendChild(expandedTaskTitle);
            showTaskDescription.appendChild(descriptionText);
            showTaskDescription.appendChild(expandedTaskDescription);
            showTaskDescription.appendChild(closeTaskDescriptionButton);
            document.querySelector('.main').appendChild(showTaskDescription);
        
            showTaskDescription.showModal();
        
            closeTaskDescriptionButton.addEventListener('click', () => {
                showTaskDescription.close();
            });
        });

        editTaskBtn.addEventListener('click', () => {
            // Create the dialog element
            const editDialog = document.createElement('dialog');
            editDialog.className = 'editDialog';
        
            // Create the form element inside the dialog
            editDialog.innerHTML = `
                <fieldset>
                    <form action="" method="GET" id="editTaskForm">
                        <legend>Edit Task</legend>
                        <div class="input_title">
                            <label for="title">New Title</label>
                            <input id="title" type="text" name="title" required />
                        </div>
                        <div class="input_description">
                            <label for="description">New Description</label>
                            <textarea id="description" name="description" rows="4" cols="50"></textarea>
                        </div>
                        <div class="input_duedate">
                            <label for="duedate">New Due Date</label>
                            <input id="duedate" type="date" name="duedate" required />
                        </div>
                        <div class="input_priority">
                            <label for="priority">New Priority</label>
                            <input id="low" type="radio" name="priority" value="Low" required />Low
                            <input id="medium" type="radio" name="priority" value="Medium" required />Medium
                            <input id="high" type="radio" name="priority" value="High" required />High
                        </div>                    
                        <button autofocus type="submit" class="updateSubmit">Update</button>
                    </form>
                </fieldset>
            `;
            
            // Append the dialog to the body
            document.body.appendChild(editDialog);
            
            // Show the dialog
            editDialog.showModal();
            
            // Handle form submission
            const form = editDialog.querySelector('#editTaskForm');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                taskName.innerHTML = form.querySelector('#title').value;
                taskDueDate.innerHTML = 'Due: ' + form.querySelector('#duedate').value;
                const formData = new FormData(form);
                const priorityValue = formData.get('priority');
                taskPriority.innerHTML = 'Priority: ' + priorityValue;
                expandedTaskTitle.innerHTML = form.querySelector('#title').value;
                taskDescription = form.querySelector('#description').value;
                expandedTaskDescription.innerHTML = taskDescription;
                editDialog.close();
                saveTasksToLocalStorage();
            });
        });

        content.appendChild(newTask);

        deleteTaskBtn.addEventListener("click", () => {
            content.removeChild(newTask);
            saveTasksToLocalStorage();
        });

        let dateInput = addTaskForm.duedate.value;
        let dateInputObj = new Date(dateInput);
        const today = new Date();

        dateInputObj.setMinutes(dateInputObj.getMinutes() + dateInputObj.getTimezoneOffset());

        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 7);
        
        const isToday = (
        today.getFullYear() === dateInputObj.getFullYear() &&
        today.getMonth() === dateInputObj.getMonth() &&
        today.getDate() === dateInputObj.getDate()
        );

        const isWithinWeek = (
            dateInputObj >= today &&
            dateInputObj <= endDate
        );

        if (isToday) {
            newTask.classList.add('today');
            newTask.classList.add('thisWeek');
        }
        if (isWithinWeek) {newTask.classList.add('thisWeek');}
        
        addTaskForm.reset();
        saveTasksToLocalStorage();
    });
}

export function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.new-task').forEach(task => {
        tasks.push({
            name: task.querySelector('.task-name').innerHTML,
            dueDate: task.querySelector('.task-due-date').innerHTML.replace('Due: ', ''),
            priority: task.querySelector('.task-priority').innerHTML.replace('Priority: ', ''),
            description: task.querySelector('.expanded-desc') ? task.querySelector('.expanded-desc').innerHTML : '',
            completed: task.querySelector('.complete-task-btn').classList.contains('complete-task'),
            classes: [...task.classList]
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function loadTasksFromLocalStorage(content) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskData => {
        let left = document.createElement('div');
        left.classList.add('left-side-task');
        let right = document.createElement('div');
        right.classList.add('right-side-task');
        let newTask = document.createElement('div');
        newTask.classList.add('new-task');
        taskData.classes.forEach(cls => newTask.classList.add(cls));
        let completeTaskBtn = document.createElement('button');
        completeTaskBtn.classList.add('complete-task-btn');
        let deleteTaskBtn = document.createElement('button');
        let editTaskBtn = document.createElement('button');
        editTaskBtn.classList.add('edit-task-btn');
        deleteTaskBtn.classList.add('delete-task-btn');
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
        right.append(editTaskBtn);
        right.append(deleteTaskBtn);
        newTask.appendChild(left);
        newTask.appendChild(right);
        completeTaskBtn.innerHTML = taskData.completed ? '✓' : ' ';
        editTaskBtn.innerHTML = '✎';
        deleteTaskBtn.innerHTML = '✕';
        taskName.innerHTML = taskData.name;
        taskDueDate.innerHTML = 'Due: ' + taskData.dueDate;
        taskPriority.innerHTML = 'Priority: ' + taskData.priority;

        let taskDescription = taskData.description;

        if (taskData.completed) {
            completeTaskBtn.classList.add('complete-task');
            right.classList.add('task-completed');
            taskName.classList.add('task-completed');
        }

        completeTaskBtn.addEventListener("click", () => {
            if (completeTaskBtn.classList.contains('complete-task')) {
                completeTaskBtn.classList.remove('complete-task');
                completeTaskBtn.innerHTML = '';
                right.classList.remove('task-completed');
                taskName.classList.remove('task-completed');
            } else {
                completeTaskBtn.classList.add('complete-task');
                completeTaskBtn.innerHTML = '✓';
                right.classList.add('task-completed');
                taskName.classList.add('task-completed');
            }
            saveTasksToLocalStorage();
        });

        let expandedTaskTitle = document.createElement('div');
        expandedTaskTitle.classList.add('expanded-task-title');
        let expandedTaskDescription = document.createElement('div');
        expandedTaskTitle.classList.add('expanded-desc');

        taskName.addEventListener('click', () => {
            let showTaskDescription = document.createElement("dialog");
            showTaskDescription.classList.add('modal-task-description');
        
            let closeTaskDescriptionButton = document.createElement('button');
        
            let titleText = document.createElement('div');
            titleText.innerText = 'Title';
            titleText.classList.add('title-text');
            let descriptionText = document.createElement('div');
            descriptionText.innerText = 'Notes';
            descriptionText.classList.add('description-text');

            expandedTaskTitle.innerHTML = taskName.innerHTML;
            expandedTaskDescription.innerHTML = taskDescription;

            closeTaskDescriptionButton.innerHTML = 'Close';
            closeTaskDescriptionButton.classList.add('closeBtn');
        
            showTaskDescription.appendChild(titleText);
            showTaskDescription.appendChild(expandedTaskTitle);
            showTaskDescription.appendChild(descriptionText);
            showTaskDescription.appendChild(expandedTaskDescription);
            showTaskDescription.appendChild(closeTaskDescriptionButton);
            document.querySelector('.main').appendChild(showTaskDescription);
        
            showTaskDescription.showModal();
        
            closeTaskDescriptionButton.addEventListener('click', () => {
                showTaskDescription.close();
            });
        });

        editTaskBtn.addEventListener('click', () => {
            // Create the dialog element
            const editDialog = document.createElement('dialog');
            editDialog.className = 'editDialog';
        
            // Create the form element inside the dialog
            editDialog.innerHTML = `
                <fieldset>
                    <form action="" method="GET" id="editTaskForm">
                        <legend>Edit Task</legend>
                        <div class="input_title">
                            <label for="title">New Title</label>
                            <input id="title" type="text" name="title" required />
                        </div>
                        <div class="input_description">
                            <label for="description">New Description</label>
                            <textarea id="description" name="description" rows="4" cols="50"></textarea>
                        </div>
                        <div class="input_duedate">
                            <label for="duedate">New Due Date</label>
                            <input id="duedate" type="date" name="duedate" required />
                        </div>
                        <div class="input_priority">
                            <label for="priority">New Priority</label>
                            <input id="low" type="radio" name="priority" value="Low" required />Low
                            <input id="medium" type="radio" name="priority" value="Medium" required />Medium
                            <input id="high" type="radio" name="priority" value="High" required />High
                        </div>                    
                        <button autofocus type="submit" class="updateSubmit">Update</button>
                    </form>
                </fieldset>
            `;
            
            // Append the dialog to the body
            document.body.appendChild(editDialog);
            
            // Show the dialog
            editDialog.showModal();
            
            // Handle form submission
            const form = editDialog.querySelector('#editTaskForm');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                taskName.innerHTML = form.querySelector('#title').value;
                taskDueDate.innerHTML = 'Due: ' + form.querySelector('#duedate').value;
                const formData = new FormData(form);
                const priorityValue = formData.get('priority');
                taskPriority.innerHTML = 'Priority: ' + priorityValue;
                expandedTaskTitle.innerHTML = form.querySelector('#title').value;
                taskDescription = form.querySelector('#description').value;
                expandedTaskDescription.innerHTML = taskDescription;
                editDialog.close();
                saveTasksToLocalStorage();
            });
        });

        content.appendChild(newTask);

        deleteTaskBtn.addEventListener("click", () => {
            content.removeChild(newTask);
            saveTasksToLocalStorage();
        });
    });
}
