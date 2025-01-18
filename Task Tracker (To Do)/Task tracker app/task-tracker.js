let inputTask = document.getElementById('task-input');
let addButton = document.getElementById('addButton');
let taskList = document.getElementById('task-list');
let deleteButtons = document.getElementsByClassName('delete-button');
let completeButtons = document.getElementsByClassName('complete-button');

addButton.addEventListener('click', () => {

    let taskText = inputTask.value;

    if(taskText.trim() == ''){
        alert("Empty task is not allowed");
    }

    else {
        let taskItem = document.createElement('div');
        taskItem.classList.add('task');
        let taskTextElement = document.createElement('p');
        taskTextElement.innerText = taskText;
        taskTextElement.classList.add('task-text');
        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete-button');
        let completeButton = document.createElement('button');
        completeButton.innerText = 'Complete';
        completeButton.classList.add('complete-button');

        taskItem.appendChild(taskTextElement);
        taskItem.appendChild(deleteButton);
        taskItem.appendChild(completeButton);
        taskList.appendChild(taskItem);

        deleteButton.addEventListener('click', (event) => {
            event.target.parentElement.remove();
        });

        completeButton.addEventListener('click', (event) => {
            let taskText = event.target.parentElement.querySelector('.task-text');
            taskText.style.textDecoration = 'line-through';
            taskText.style.color = "#666666";
        });
    }

    

    inputTask.value = '';
});


