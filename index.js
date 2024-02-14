let addTask=()=> {
    let todoInput = document.getElementById('todoInput');
    let todoText = todoInput.value.trim();

    if (todoText !== '') {
        // Create a new todo item
        let todoItem = document.createElement('li');
        todoItem.className = 'todoItem'

        // Create a container for todo text
        let todoTextContainer = document.createElement('span');
        todoTextContainer.textContent = todoText;

        // Append todo text to the todo item
        todoItem.appendChild(todoTextContainer);


        // Add remove and edit buttons
        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';

        removeButton.className = 'remove-btn';   //add css through class

        removeButton.onclick = function () {
            todoItem.parentElement.removeChild(todoItem);
            saveTodoList();
        };
        todoItem.appendChild(removeButton);

        //editing list------------->
        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';          //add css through class



        editButton.onclick = function () {
            let newText = prompt('Edit the task:', todoTextContainer.textContent);
            if (newText !== null && newText.trim() !== '') {
                todoTextContainer.textContent = newText.trim();
                saveTodoList();
            }
        };
        todoItem.appendChild(editButton);

        // Append todo item to the list
        let todoList = document.getElementById('todoList');
        todoList.appendChild(todoItem);

        // Save todo list to local storage
        saveTodoList();

        // Clear input field
        todoInput.value = '';
    } else {
        alert('Enter ToDos');
    }
}

// Function to save todo list to local storage
let saveTodoList=()=> {
    let todoListItems = document.querySelectorAll('#todoList li span');
    let todos = [];

    todoListItems.forEach(function (todoTextContainer) {
        todos.push(todoTextContainer.textContent);
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to load todo list from local storage
let loadTodoList=()=>{
    let todos = JSON.parse(localStorage.getItem('todos'));

    if (todos) {
        let todoList = document.getElementById('todoList');

        todos.forEach(function (todoText) {
            // Create a new todo item
            let todoItem = document.createElement('li');

            // Create a container for todo text
            let todoTextContainer = document.createElement('span');
            todoTextContainer.textContent = todoText;

            // Append todo text to the todo item
            todoItem.appendChild(todoTextContainer);

            // Add remove and edit buttons
            let removeButton = document.createElement('button');

            removeButton.className = 'remove-btn';          //add css through class

            removeButton.textContent = 'Remove';
            removeButton.onclick = function () {
                todoItem.parentElement.removeChild(todoItem);
                saveTodoList();
            };
            todoItem.appendChild(removeButton);

            let editButton = document.createElement('button');

            editButton.className = 'edit-btn'               //add css through class

            editButton.textContent = 'Edit';
            editButton.onclick = function () {
                let newText = prompt('Edit the task:', todoTextContainer.textContent);
                if (newText !== null && newText.trim() !== '') {
                    todoTextContainer.textContent = newText.trim();
                    saveTodoList();
                }
            };
            todoItem.appendChild(editButton);

            // Append todo item to the list
            todoList.appendChild(todoItem);
        });
    }
}

// Load todo list when the page is loaded
window.onload =()=> {
    loadTodoList();
};
