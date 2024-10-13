import toggleTheme from "./scripts/toggleTheme";
import createTodo from "./scripts/createTodo";
import clickApplyBtn from './scripts/clickApplyBtn';

document.addEventListener('DOMContentLoaded', function() {
  
  const domElements = {
    body: document.body,
    title: document.getElementById('title'),
    inputSearch: document.getElementById('input-search'),
    themeBtn: document.getElementById('theme-btn'),
    switch: document.getElementById('switch'),
    deleteTodosModalWrapper: document.getElementById('delete-todos-modal-wrapper'),
    deleteTodosModal: document.getElementById('delete-note-modal'),
    closeBtn: document.getElementById('close-btn'),
    agreeBtn: document.getElementById('agree-btn'),
    addTodoBtn: document.getElementById('add-todo-btn'),
    addOrChangeTodoModalWrapper: document.getElementById('add-or-change-todo-modal__wrapper'),
    addOrChangeTodoModal: document.getElementById('add-or-change-todo-modal'),
    modalWindowTitle: document.getElementById('modal-window__title'),
    inputNote: document.getElementById('input-note'),
    cancelBtn: document.getElementById('cancel-btn'),
    applyBtn: document.getElementById('apply-btn'),
    todosWrapper: document.getElementById('todos-wrapper'),
  }
  
  const todosData = {
    isLightTheme: true,
    todosArray: [],
  };

  if (localStorage.getItem('todosData') !== null) {
    const storedTodosJSON = localStorage.getItem('todosData');
    const storedTodosObject = JSON.parse(storedTodosJSON);

    if (storedTodosObject.todosArray.length > 0) {
      todosData.todosArray = [...storedTodosObject.todosArray];
      todosData.todosArray.map(todoObj => {
        const todoNode = createTodo(todoObj, domElements, todosData);
        domElements.todosWrapper.appendChild(todoNode);
      });
      domElements.todosWrapper.classList.remove('dark-theme-todos-wrapper-empty');
      domElements.todosWrapper.classList.remove('todos-wrapper-empty');
    }
    
    if (!storedTodosObject.isLightTheme) {
      todosData.isLightTheme = toggleTheme(domElements, todosData);
    }
  }

  domElements.themeBtn.addEventListener('click', () => {
    todosData.isLightTheme = toggleTheme(domElements, todosData);
    localStorage.setItem('todosData', JSON.stringify(todosData));
  });

  domElements.switch.addEventListener('change', (e) => {
    if(e.currentTarget.checked && todosData.todosArray.length === 0) {
      domElements.addOrChangeTodoModalWrapper.classList.add('modal-window__wrapper-visible');
      domElements.modalWindowTitle.textContent = 'NEW NOTE';
    }
    if(e.currentTarget.checked && todosData.todosArray.length > 0) {
      domElements.deleteTodosModalWrapper.classList.add('modal-window__wrapper-visible');
    }
  })

  domElements.addTodoBtn.addEventListener('click', () => {
    domElements.addOrChangeTodoModalWrapper.classList.toggle('modal-window__wrapper-visible');
    domElements.modalWindowTitle.textContent = 'NEW NOTE';
  });

  domElements.applyBtn.addEventListener('click', () => {
    clickApplyBtn(domElements, todosData);
    domElements.addOrChangeTodoModalWrapper.classList.remove('modal-window__wrapper-visible');
    localStorage.setItem('todosData', JSON.stringify(todosData));
  });

  domElements.addOrChangeTodoModal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      clickApplyBtn(domElements, todosData);
    }
  })

  domElements.addOrChangeTodoModalWrapper.addEventListener('click', (e) => {
    if(e.target === domElements.addOrChangeTodoModalWrapper) {
      domElements.inputNote.value = '';
      domElements.addOrChangeTodoModalWrapper.classList.remove('modal-window__wrapper-visible');
      domElements.switch.checked = false;
    }
  });

  domElements.deleteTodosModalWrapper.addEventListener('click', (e) => {
    if(e.target === domElements.deleteTodosModalWrapper) {
      domElements.deleteTodosModalWrapper.classList.remove('modal-window__wrapper-visible');
      domElements.switch.checked = false;
    }
  });

  domElements.cancelBtn.addEventListener('click', () => {
    domElements.inputNote.value = '';
    domElements.addOrChangeTodoModalWrapper.classList.remove('modal-window__wrapper-visible');
    domElements.switch.checked = false;
  });

  domElements.closeBtn.addEventListener('click', () => {
    domElements.deleteTodosModalWrapper.classList.remove('modal-window__wrapper-visible');
    domElements.switch.checked = false;
  })

  domElements.agreeBtn.addEventListener('click', () => {
    domElements.todosWrapper.innerHTML = '';
    if(todosData.isLightTheme) {
      domElements.todosWrapper.classList.add('todos-wrapper-empty');
    } else {
      domElements.todosWrapper.classList.add('dark-theme-todos-wrapper-empty');
    }
    domElements.deleteTodosModalWrapper.classList.remove('modal-window__wrapper-visible');
    domElements.switch.checked = false;
    todosData.todosArray = [];
    localStorage.setItem('todosData', JSON.stringify(todosData));
  })
});