class Todo {

    constructor() {
        this.totalTasks = document.querySelectorAll('.task').length;
        this.dinamicTotalTask = document.getElementsByClassName('task');
    }

    // METODOS RELACIONADOS AO TASKS

    addTask(taskText) {

        // Clonar template da task
        let templateTask = document.querySelector('.task').cloneNode(true);
        // Remove classe hide
        templateTask.classList.remove('hide');
        // Remove classe template-js
        templateTask.classList.remove('template-js');
        // Manipula texto da task
        let templateTask_text = templateTask.querySelector('.task_title');
        templateTask_text.textContent = taskText;
        // Insere na lista de tasks
        let tasksList = document.querySelector('.task_box_list');
        tasksList.appendChild(templateTask);
        // Insere eventos
        this.addEvents();

    }

    removeTask(taskDelete) {
        let parentDelete = taskDelete.parentElement;
        parentDelete.remove();
    }

    completeTask(task) {
        let checkIcon = task.querySelector('.check_icon-invisible');
        checkIcon.classList.remove('check_icon-invisible');
        checkIcon.classList.add('check_icon-visible');

        task.classList.remove('select_check');
        task.classList.add('select_check-done');
        task.classList.add('taskDone-js');

        let parentEl = task.parentElement;
        let textTask = parentEl.querySelector('.task_title');
        textTask.classList.add('textLine');
    }

    undoTask(task) {
        let checkIcon = task.querySelector('.check_icon-visible');
        checkIcon.classList.remove('check_icon-visible');
        checkIcon.classList.add('check_icon-invisible');

        task.classList.add('select_check');
        task.classList.remove('select_check-done');
        task.classList.remove('taskDone-js');

        let parentEl = task.parentElement;
        let textTask = parentEl.querySelector('.task_title');
        textTask.classList.remove('textLine');
    }  

    addEvents() {
        let deleteBtns = document.querySelectorAll('.btn_delete');
        let deleteBtn = deleteBtns[deleteBtns.length - 1];

        let doneBtns = document.querySelectorAll('.select_check');
        let doneBtn = doneBtns[doneBtns.length - 1];

        deleteBtn.addEventListener('click', (e) => {
            this.removeTask(e.currentTarget);
            // Mostra a quantidade de task no footer
            this.tasksCounter();
            this.statesMenssageBox();
        });

        doneBtn.addEventListener('click', (e) => {
            if(doneBtn.classList.contains('taskDone-js') === false) {
                this.completeTask(e.currentTarget);
            } else if(doneBtn.classList.contains('taskDone-js') === true) {
                this.undoTask(e.currentTarget);
            }
        });
    }

    amountTasks() {
        // Pegar o span que mostra a a quantidade de Task
        let dinamicTasksCounter = Array.from(this.dinamicTotalTask).length - 1;

        return dinamicTasksCounter;
    }

    tasksCounter() {
        // Quantidade de tasks
        let amountTasks = this.amountTasks();
        // Pego o span do contador no footer
        let taskCounter = document.querySelector('.task_box_counter');
        // Mostra a quantidade de task no footer
        if (amountTasks === 0) {
            taskCounter.textContent = '0 tarefas';
        } else if (amountTasks === 1) {
            taskCounter.textContent = amountTasks + ' ' + 'adicionada';
        } else {
            taskCounter.textContent = amountTasks + ' ' + 'adicionadas';
        }
    }

    // METODOS RELACIONADOS AO MENSSAGE BOX

    statesMenssageBox() {
        // Quantidade de tasks
        let amountTasks = this.amountTasks();
        // Pegar a caixa de mensagem
        let menssageBox = document.querySelector('.task_box_msg');
        if (amountTasks !== 0) {
            menssageBox.classList.add('hide');
        } else {
            menssageBox.classList.remove('hide');
        }
    }

    // METODOS RELACIONADOS AO OPTIONS DO NAV NO FOOTER

    removeAllTask() {
        let allTasks = Array.from(this.dinamicTotalTask);

        allTasks.forEach((tasks, index) => {
            if (index !== 0) {
                tasks.remove();
            }
        });
    }

    tasksStates(state) {
        let allTasks = Array.from(this.dinamicTotalTask);

        allTasks.forEach((tasks) => {
            let amountTasks = this.amountTasks();
            if (amountTasks !== 0) {
                let allTasksToDone = tasks.querySelector('.select_check');
                let allTasksDone = tasks.querySelector('.select_check-done');
                if (tasks.classList.contains('template-js') !== true) {
                    tasks.classList.remove('hide');
                    if(state === 'done') {
                        if(allTasksToDone !== null) {
                            tasks.classList.add('hide');
                        } 
                    } else if(state === 'todone') {
                        if(allTasksDone !== null) {
                            tasks.classList.add('hide');
                        } 
                    } else if(state === 'all') {
                        tasks.classList.remove('hide');
                    } 
                }
            } 
        });

    }

    statesNavOptions(option) {
        let parentEl = option.parentElement;
        let optionSelect = parentEl.querySelector('.-select');
        optionSelect.classList.remove('-select');
        option.classList.add('-select')
    }

}

let todo = new Todo();

let searchBox = document.querySelector('.search_box_textInput');

searchBox.addEventListener('keypress', (e) => {

    if (e.keyCode === 13) {
        // Previne submissão
        e.preventDefault();
        // Pega valor adicionado
        let searchBox_value = searchBox.value;

        if (searchBox_value !== '') {
            todo.addTask(searchBox_value);
            // Limpa campo 
            searchBox.value = '';
            // Mostra a quantidade de task no footer
            todo.statesMenssageBox()
            todo.tasksCounter();
        }

    }

});

let btnRemoveTasks = document.querySelector('.task_box_btn');

btnRemoveTasks.addEventListener('click', () => {
    todo.removeAllTask();
    todo.statesMenssageBox()
    todo.tasksCounter();
});

let btnDoneTasks = document.querySelector('.done-js');

btnDoneTasks.addEventListener('click', (e) => {
    todo.tasksStates('done');
    todo.statesNavOptions(e.currentTarget);
});

let btnToDoneTasks = document.querySelector('.toDone-js');

btnToDoneTasks.addEventListener('click', (e) => {
    todo.tasksStates('todone');
    todo.statesNavOptions(e.currentTarget);
});

let allTasks = document.querySelector('.all-js');

allTasks.addEventListener('click', (e) => {
    todo.tasksStates('all');
    todo.statesNavOptions(e.currentTarget);
});