import './style.css';

function component() {
    const element = document.createElement('div');
    element.innerHTML = 'Completed Setup';
 
    return element;
  }
 
document.body.appendChild(component());