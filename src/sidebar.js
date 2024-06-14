export function setupSidebarListeners(inboxBtn, todayBtn, thisWeekBtn, sidebar, content, curDisplayHeader) {
    inboxBtn.addEventListener('click', () => {
        curDisplayHeader.innerHTML = inboxBtn.innerText;

        sidebar.childNodes.forEach(element => {
            if (element.classList.contains('active')) {
                element.classList.remove('active');
            }
        });

        content.childNodes.forEach(element => {
            if (element.classList.contains('hidden')) {
                element.classList.remove('hidden');
            }
            if (element.classList.contains('project-task')) {
                element.classList.add('hidden');
            }
        });

        inboxBtn.classList.add('active');
    });

    todayBtn.addEventListener('click', () => {
        curDisplayHeader.innerHTML = todayBtn.innerText;

        sidebar.childNodes.forEach(element => {
            if (element.classList.contains('active')) {
                element.classList.remove('active');
            }
        });

        todayBtn.classList.add('active');

        content.childNodes.forEach(element => {
            if (element.classList.contains('new-task') && element.classList.contains('today')) {
                element.classList.remove('hidden');
            } else if (element.classList.contains('new-task')) {
                element.classList.add('hidden');
            }

            if (element.classList.contains('project-task')) {
                element.classList.add('hidden');
            }
        });
    });

    thisWeekBtn.addEventListener('click', () => {
        curDisplayHeader.innerHTML = thisWeekBtn.innerText;

        sidebar.childNodes.forEach(element => {
            if (element.classList.contains('active')) {
                element.classList.remove('active');
            }
        });

        thisWeekBtn.classList.add('active');

        content.childNodes.forEach(element => {
            if (element.classList.contains('new-task') && element.classList.contains('thisWeek')) {
                element.classList.remove('hidden');
            } else if (element.classList.contains('new-task')) {
                element.classList.add('hidden');
            }

            if (element.classList.contains('project-task')) {
                element.classList.add('hidden');
            }
        });
    });
}
