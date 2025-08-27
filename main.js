document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('itemEntryForm');
  const input = document.getElementById('newItem');
  const timeInput = document.getElementById('itemTime');
  const list = document.getElementById('listItems');
  const clearBtn = document.getElementById('clearItems');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function renderTasks() {
    list.innerHTML = '';
    tasks.forEach((task) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.id = task.id;
      checkbox.tabIndex = 0;

      const label = document.createElement('label');
      label.htmlFor = task.id;
      label.textContent = task.text;

      const timeSpan = document.createElement('span');
      timeSpan.className = 'time-stamp';
      timeSpan.textContent = task.userTime;

      checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });

      itemDiv.appendChild(checkbox);
      itemDiv.appendChild(label);
      itemDiv.appendChild(timeSpan);
      list.appendChild(itemDiv);
    });
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    const userTime = timeInput.value;

    if (!text || !userTime) return;

    const taskId = Date.now().toString();

    tasks.push({
      id: taskId,
      text,
      userTime,
      completed: false,
    });

    saveTasks();
    renderTasks();

    input.value = '';
    timeInput.value = '';
    input.focus();
  });

  clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all tasks?')) {
      tasks = [];
      saveTasks();
      renderTasks();
    }
  });

  renderTasks();
});
