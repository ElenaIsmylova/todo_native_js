import toggleTheme from "./scripts/toggleTheme";
import createTodo from "./scripts/createTodo";

document.addEventListener('DOMContentLoaded', function() {
  
  const body = document.body;
  const title = document.getElementById('title');
  const inputSearch = document.getElementById('input-search');
  const themeBtn = document.getElementById('theme-btn');
  const addTodoBtn = document.getElementById('add-todo-btn');
  const modalWindowWrapper = document.getElementById('modal-window__wrapper');
  const modalWindow = document.getElementById('modal-window__window');
  const modalWindowTitle = document.getElementById('modal-window__title');
  const inputNote = document.getElementById('input-note');
  const cancelBtn = document.getElementById('cancel-btn');
  const applyBtn = document.getElementById('apply-btn');
  const todosWrapper = document.getElementById('todos-wrapper');
  
  const todosArray = [];

  if (todosArray.length === 0) {
    todosWrapper.classList.add('todos-wrapper-empty');
  } else {
    todosArray.map(todo => {
      todosWrapper.appendChild(todo);
    })
  }

  modalWindowWrapper.addEventListener('click', (e) => {
    if(e.target === modalWindowWrapper) {
      modalWindowWrapper.classList.remove('modal-window__wrapper-visible');
    }
  })

  cancelBtn.addEventListener('click', () => {
    modalWindowWrapper.classList.remove('modal-window__wrapper-visible');
  })

  applyBtn.addEventListener('click', () => {
    if(inputNote.value.length !== 0) {
      const todo = createTodo(inputNote);
      todosArray.push(todo);
      todosWrapper.classList.remove('todos-wrapper-empty');
      todosArray.map(todo => {
        todosWrapper.appendChild(todo);
      })
      modalWindowWrapper.classList.remove('modal-window__wrapper-visible');
    }
  })

  themeBtn.addEventListener('click', () => {
    toggleTheme(
      body, 
      title, 
      inputSearch, 
      themeBtn, 
      todosArray, 
      todosWrapper, 
      modalWindow, 
      modalWindowTitle, 
      inputNote, 
      cancelBtn
    );
  });

  addTodoBtn.addEventListener('click', () => {
    modalWindowWrapper.classList.toggle('modal-window__wrapper-visible')
  })
});