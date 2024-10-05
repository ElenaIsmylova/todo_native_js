function toggleTheme(
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
) {
  body.classList.toggle('dark-theme-body');
  title.classList.toggle('dark-theme-title');
  inputSearch.classList.toggle('dark-theme-input');
  themeBtn.classList.toggle('dark-theme-btn');
  themeBtn.classList.toggle('light-theme-btn');
  modalWindow.classList.toggle('dark-theme-modal-window');
  modalWindowTitle.classList.toggle('dark-theme-title');
  inputNote.classList.toggle('dark-theme-input');
  cancelBtn.classList.toggle('dark-theme-cancel-btn');

  if(todosArray.length === 0) {
    todosWrapper.classList.add('dark-theme-todos-wrapper-empty');
  } else {
    todosWrapper.classList.remove('dark-theme-todos-wrapper-empty');
  };
  const todos = document.getElementsByClassName('todo');
  for (let i = 0; i < todos.length; i++) {
    todos[i].classList.toggle('dark-theme-todo');
  };
}

export default toggleTheme;