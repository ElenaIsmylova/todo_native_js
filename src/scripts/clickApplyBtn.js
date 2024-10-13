import { v4 as uuidv4 } from 'uuid';
import createTodo from "./createTodo";

const clickApplyBtn = (domElements, todosData) => {
  if(domElements.inputNote.value.length !== 0) {
    const idChangingElement = domElements.addOrChangeTodoModalWrapper.getAttribute('data-todo-id');
    if(idChangingElement) {
      let todoWrapper = document.getElementById(idChangingElement);
      let todo = todoWrapper.getElementsByClassName('todo')[0];
      if (todo.textContent !== domElements.inputNote.value) {
        todo.textContent = domElements.inputNote.value;
        todosData.todosArray.forEach(todo => {
          todo.id === idChangingElement ? todo.value = domElements.inputNote.value : null;
        });
        domElements.inputNote.value = '';
        domElements.addOrChangeTodoModalWrapper.removeAttribute('data-todo-id');
        domElements.addOrChangeTodoModalWrapper.classList.remove('modal-window__wrapper-visible');
      }
    } else {
      
      const todoObj = {
        value: domElements.inputNote.value,
        status: 'inWork',
        id: uuidv4(),
      }
      const todo = createTodo(todoObj, domElements, todosData);
      domElements.todosWrapper.appendChild(todo);
      domElements.todosWrapper.classList.remove('todos-wrapper-empty');
      domElements.inputNote.value = '';
      domElements.todosWrapper.classList.remove('dark-theme-todos-wrapper-empty');
      domElements.addOrChangeTodoModalWrapper.classList.remove('modal-window__wrapper-visible');
      domElements.switch.checked = false;
    }
  }
}

export default clickApplyBtn;