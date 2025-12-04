let items = [
    "Сделать проектную работу",
    "Полить цветы",
    "Пройти туториал по Реакту",
    "Сделать фронт для своего проекта",
    "Прогуляться по улице в солнечный день",
    "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
    const storedTasks = localStorage.getItem('todo-tasks');
    if (storedTasks) {
        return JSON.parse(storedTasks);
    }
    return items;
}

function createItem(item) {
    const template = document.getElementById("to-do__item-template");
    const clone = template.content.querySelector(".to-do__item").cloneNode(true);
    const textElement = clone.querySelector(".to-do__item-text");
    const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
    const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
    const editButton = clone.querySelector(".to-do__item-button_type_edit");

    textElement.textContent = item;

    deleteButton.addEventListener('click', () => {
        clone.remove();
        const currentTasks = getTasksFromDOM();
        saveTasks(currentTasks);
    });

    duplicateButton.addEventListener('click', () => {
        const newItemText = textElement.textContent;
        const newItem = createItem(newItemText);
        listElement.prepend(newItem);
        const currentTasks = getTasksFromDOM();
        saveTasks(currentTasks);
    });

    editButton.addEventListener('click', () => {
        textElement.contentEditable = "true";
        textElement.focus();
    });

    textElement.addEventListener('blur', () => {
        textElement.contentEditable = "false";
        const currentTasks = getTasksFromDOM();
        saveTasks(currentTasks);
    });

    return clone;
}

function getTasksFromDOM() {
    const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
    const tasks = [];
    itemsNamesElements.forEach((element) => {
        tasks.push(element.textContent);
    });
    return tasks;
}

function saveTasks(tasks) {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
}


items = loadTasks();

items.forEach((item) => {
    const itemElement = createItem(item);
    listElement.append(itemElement);
});

formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const taskText = inputElement.value;

    const itemElement = createItem(taskText);
    listElement.prepend(itemElement);
    inputElement.value = '';

    const currentTasks = getTasksFromDOM();
    saveTasks(currentTasks);
});