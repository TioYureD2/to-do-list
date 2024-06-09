document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const taskTitle = taskInput.value.trim();
        if (taskTitle) {
            addTask(taskTitle);
            taskInput.value = '';
        }
    });

    function fetchTasks() {
        fetch('api/get_tasks.php')
            .then(response => response.json())
            .then(tasks => {
                taskList.innerHTML = '';
                tasks.forEach(task => {
                    const taskItem = document.createElement('li');
                    taskItem.dataset.id = task.id;
                    taskItem.className = task.completed ? 'completed' : '';
                    taskItem.innerHTML = `
                        <span>${task.title}</span>
                        <button class="delete">Delete</button>
                    `;
                    taskList.appendChild(taskItem);

                    taskItem.addEventListener('click', function() {
                        toggleTaskCompletion(task.id);
                    });

                    taskItem.querySelector('.delete').addEventListener('click', function(e) {
                        e.stopPropagation();
                        deleteTask(task.id);
                    });
                });
            });
    }

    function addTask(title) {
        fetch('api/add_task.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title })
        }).then(() => fetchTasks());
    }

    function toggleTaskCompletion(id) {
        fetch('api/update_task.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        }).then(() => fetchTasks());
    }

    function deleteTask(id) {
        fetch('api/delete_task.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        }).then(() => fetchTasks());
    }

    fetchTasks();
});
