import './style.css';

// TODO: complete all code in one JS function
// TODO: make a header
// TODO: make a sidebar
// TODO: make a main body
// TODO: seperate and export into modules

function component() {
    const main = document.querySelector('.main');

    const header = document.createElement('div');
    const headerText = document.createElement('div');
    headerText.innerText = "To-Do"
    headerText.classList.add('headerText');
    header.classList.add('header');

    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    const content = document.createElement('div');
    content.classList.add('content');
    
    header.appendChild(headerText);
    main.appendChild(header);
    main.appendChild(sidebar);
    main.appendChild(content);
}
 
component();
