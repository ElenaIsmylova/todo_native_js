const createTodo = (inputNote) => {

  const todoWrapper = document.createElement('div');
  todoWrapper.classList.add('todo-wrapper');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('checkbox');

  const todo = document.createElement('div');
  todo.classList.add('todo');
  todo.textContent = inputNote.value;
  inputNote.value = '';

  const editBtn = document.createElement('div');
  editBtn.classList.add('edit');
  const deleteBtn = document.createElement('div');
  deleteBtn.classList.add('delete');

  todoWrapper.appendChild(checkbox);
  todoWrapper.appendChild(todo);
  todoWrapper.appendChild(editBtn);
  todoWrapper.appendChild(deleteBtn);

  return todoWrapper;
}

export default createTodo;