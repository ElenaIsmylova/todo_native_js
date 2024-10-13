const toggleTheme = (
  domElements,
  todosData
) => {
  todosData.isLightTheme = !todosData.isLightTheme;
  domElements.body.classList.toggle('dark-theme-body');
  domElements.title.classList.toggle('dark-theme-title');
  domElements.inputSearch.classList.toggle('dark-theme-input');
  domElements.inputSearch.classList.toggle('dark-theme-input-search');
  domElements.themeBtn.classList.toggle('dark-theme-btn');
  domElements.themeBtn.classList.toggle('light-theme-btn');
  domElements.addOrChangeTodoModal.classList.toggle('dark-theme-modal-window');
  domElements.modalWindowTitle.classList.toggle('dark-theme-title');
  domElements.inputNote.classList.toggle('dark-theme-input');
  domElements.cancelBtn.classList.toggle('dark-theme-cancel-btn');

  if(todosData.todosArray.length === 0) {
    todosData.isLightTheme && domElements.todosWrapper.classList.add('todos-wrapper-empty');
    !todosData.isLightTheme && domElements.todosWrapper.classList.add('dark-theme-todos-wrapper-empty');
  } else {
    domElements.todosWrapper.classList.remove('dark-theme-todos-wrapper-empty');
    domElements.todosWrapper.classList.remove('todos-wrapper-empty');
  };
  const todos = document.getElementsByClassName('todo');
  for (let i = 0; i < todos.length; i++) {
    if (!todosData.isLightTheme) {
      todos[i].classList.add('dark-theme-todo');
    } else {
      todos[i].classList.remove('dark-theme-todo');
    }
  };

  return todosData.isLightTheme;
}

export default toggleTheme;