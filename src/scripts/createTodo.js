const createTodo = (todoObj, domElements, todosData) => {

  const todoWrapper = document.createElement('div');
  todoWrapper.id = todoObj.id;
  todoWrapper.classList.add('todo-wrapper');

  const checkboxWrapper = document.createElement('label');
  checkboxWrapper.classList.add('checkbox-wrapper');
  const checkbox = document.createElement('input');
  checkboxWrapper.appendChild(checkbox);
  const checkmark = document.createElement('span');
  checkmark.classList.add('checkmark');
  checkboxWrapper.appendChild(checkmark);

  checkbox.type = 'checkbox';
  checkbox.classList.add('checkbox');

  const todo = document.createElement('div');
  todo.classList.add('todo');
  if (!todosData.isLightTheme) {
    todo.classList.add('dark-theme-todo');
  } else {
    todo.classList.remove('dark-theme-todo');
  }
  if (todoObj.status === 'done') {
    checkbox.checked = true;
    todo.classList.add('is-done');
  }
  todo.textContent = todoObj.value;

  const editBtn = document.createElement('div');
  editBtn.classList.add('edit');
  
  const deleteBtn = document.createElement('div');
  deleteBtn.classList.add('delete');

  todoWrapper.addEventListener('click', (e) => {
    let todoNode = document.getElementById(e.currentTarget.id);
    let todoObject = todosData.todosArray.find(todo => todo.id === e.currentTarget.id);

    if(e.target && e.target.className === 'checkbox') {
      let todoText = todoNode.getElementsByClassName('todo')[0];
      if(e.target.checked) {
        todoText.classList.add('is-done');
        todoObject.status = 'done';
      } else {
        todoText.classList.remove('is-done');
        todoObject.status = 'inWork';
      }
    }
    
    if(e.target && e.target.className === 'edit') {
      domElements.modalWindowTitle.textContent = 'CHANGE NOTE';
      let value = todoObject.value;
      if (value.length > 3) {
        domElements.addOrChangeTodoModalWrapper.setAttribute('data-todo-id', todoNode.id);
        domElements.addOrChangeTodoModalWrapper.classList.toggle('modal-window__wrapper-visible');
        domElements.inputNote.value = value;
      }
    }

    if(e.target && e.target.className === 'delete') {
      const ind = todosData.todosArray.findIndex((todo) => todo.id === todoObj.id);
      todosData.todosArray.splice(ind, 1);
      todoNode.remove();
      if (todosData.todosArray.length === 0) {
        if (localStorage.getItem('todosData') !== null) {
          const storedTodosJSON = localStorage.getItem('todosData');
          const storedTodosObject = JSON.parse(storedTodosJSON);
          if (storedTodosObject.todosTheme === 'dark') {
            domElements.todosWrapper.classList.add('dark-theme-todos-wrapper-empty');
          }
        } else {
          domElements.todosWrapper.classList.add('todos-wrapper-empty');
        }
      }
      console.log('todosData', todosData)
      localStorage.setItem('todosData', JSON.stringify(todosData));
      const storedTodosJSON = localStorage.getItem('todosData');
      const storedTodosObject = JSON.parse(storedTodosJSON);
      console.log('storedTodosObject:', storedTodosObject);
    }
  });

  todosData.todosArray.push(todoObj);

  todoWrapper.appendChild(checkboxWrapper);
  todoWrapper.appendChild(todo);
  todoWrapper.appendChild(editBtn);
  todoWrapper.appendChild(deleteBtn);

  return todoWrapper;
}

export default createTodo;