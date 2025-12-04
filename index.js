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

// Функция 1: Загрузка задач (из хранилища или дефолтные)
function loadTasks() {
	const storedTasks = localStorage.getItem('todo-tasks');
	if (storedTasks) {
		return JSON.parse(storedTasks);
	}
	return items;
}

// Функция 2: Создание карточки задачи
function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	// Устанавливаем текст
	textElement.textContent = item;

	// Обработчик удаления
	deleteButton.addEventListener('click', () => {
		clone.remove();
		const currentTasks = getTasksFromDOM();
		saveTasks(currentTasks);
	});

	// Обработчик дублирования
	duplicateButton.addEventListener('click', () => {
		const newItemText = textElement.textContent;
		const newItem = createItem(newItemText);
		listElement.prepend(newItem);
		const currentTasks = getTasksFromDOM();
		saveTasks(currentTasks);
	});

	// Бонус: Обработчик редактирования
	editButton.addEventListener('click', () => {
		textElement.contentEditable = "true";
		textElement.focus();
	});

	// Сохранение после редактирования (при потере фокуса)
	textElement.addEventListener('blur', () => {
		textElement.contentEditable = "false";
		const currentTasks = getTasksFromDOM();
		saveTasks(currentTasks);
	});

	return clone;
}

// Функция 3: Получение списка задач из DOM
function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	const tasks = [];
	itemsNamesElements.forEach((element) => {
		tasks.push(element.textContent);
	});
	return tasks;
}

// Функция 4: Сохранение в LocalStorage
function saveTasks(tasks) {
	localStorage.setItem('todo-tasks', JSON.stringify(tasks));
}

// Логика инициализации приложения

// 1. Переопределяем items на основе данных из хранилища
items = loadTasks();

// 2. Отрисовываем задачи
items.forEach((item) => {
	const itemElement = createItem(item);
	listElement.append(itemElement);
});

// 3. Обработчик отправки формы
formElement.addEventListener('submit', (evt) => {
	evt.preventDefault();

	const taskText = inputElement.value;

	// Создаем и добавляем в начало списка
	const itemElement = createItem(taskText);
	listElement.prepend(itemElement);

	// Очищаем инпут
	inputElement.value = '';

	// Сохраняем обновленный список
	const currentTasks = getTasksFromDOM();
	saveTasks(currentTasks);
});