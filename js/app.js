const formTodo = document.getElementById("form");
const inputTodo = document.getElementById("input");
const itemTodo = document.getElementById("item");
const emptyList = document.getElementById("emptyList");

let tasks = [];

if (localStorage.getItem('tasks')) {
	
	tasks = JSON.parse(localStorage.getItem('tasks'));

};

tasks.forEach(function(task){
	renderTask(task);
});

checkEmptyList();

formTodo.addEventListener('submit', addTask);

itemTodo.addEventListener('click', deletTask);

itemTodo.addEventListener('click', doneTask);

function addTask(event) {

	event.preventDefault();

	const inputText = inputTodo.value;

	const newTask = {
		id: Date.now(),
		text: inputText,
		done: false,
	};

	tasks.push(newTask);

	saveToLocalStorage();

	renderTask(newTask);

	inputTodo.value = "";
	inputTodo.focus();

	// if (itemTodo.children.length > 1) {
	// 	emptyList.classList.add('none');
	// }
	checkEmptyList();
};

function deletTask(event) {

	if(event.target.dataset.action !== 'delete') {
			return
	}
	

		const parenNode = event.target.closest('li');

		const id = Number(parenNode.id);

		// const index = tasks.findIndex(function(task){

		// 		if (task.id === id) {
		// 			return true
		// 		};

		// });

		// tasks.splice(index, 1);
		
		tasks = tasks.filter(function(task) {
			if (task.id === id) {
				return false
			} else {
				return true
			}
		});

		saveToLocalStorage();

		parenNode.remove();

	// if (itemTodo.children.length === 1) {
	// 	emptyList.classList.remove('none');
	// }
	checkEmptyList();
};

function doneTask(event) {

	if (event.target.dataset.action === 'done') {
		const parentNode = event.target.closest('li');

		const id = Number(parentNode.id);

		const task = tasks.find(function(task) {
			if (task.id === id) {
				return true
			}
	})

		task.done = !task.done
		
		saveToLocalStorage()

		const taskLine = parentNode.querySelector('.item__text');
		taskLine.classList.toggle('line--done');
		}

}

function checkEmptyList() {
	if (tasks.length === 0) {
		const emptyListHTML = `
		<li id="emptyList">Список дел пуст</li>`;

		itemTodo.insertAdjacentHTML('afterbegin', emptyListHTML);
	}

	if (tasks.length > 0) {
		const emptylistEl = document.querySelector('#emptyList');
		emptylistEl ? emptylistEl.remove() : null;
	}
}

function saveToLocalStorage() {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
	const cssClass = task.done ? "item__text line--done" : 'item__text'

	const textHTML = `
							<li id="${task.id}" class="item__list" id="itemList">
								<div class="${cssClass}">${task.text}</div>
								<div class="button">
									<button class="btn btn--todo" type="button" data-action="done"><i class="fa-solid fa-check"></i></button>
									<button class="btn btn--clear" type="button" data-action="delete"><i class="fa-solid fa-xmark"></i></button>
								</div>
							</li>`;

	itemTodo.insertAdjacentHTML('beforeend', textHTML);
}