const element = document.getElementById('todo-list');

const useButtonsAction = (event) => {
  if (event.target.classList.contains('delete')) {
    fetch(`/delete/${event.target.value}`, { method: 'POST' });
  } else if (event.target.classList.contains('change')) {
    const elems = document.querySelectorAll('.modal');
    const instances = M.Modal.init(elems);
  } else if (event.target.classList.contains('complete')) {
    fetch(`/complete/${event.target.value}`, { method: 'POST' });
  }
};

element.addEventListener('click', useButtonsAction);
