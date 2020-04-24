const form = document.querySelector('form');
const input = document.querySelector('input');
const noteList = document.querySelector('ul');
let taskList = [];

function renderTask(taskObject) {
    const taskItem = document.createElement('li');
    const taskItemContent = document.createElement('label');
    const taskItemBtnEdit = document.createElement('button');
    const taskItemBtnComplete = document.createElement('button');
    const taskItemBtnRemove = document.createElement('button');
    const editInput = document.createElement("input");

    editInput.type = "text";

    taskItem.classList.add('note-list__item');
    taskItemBtnEdit.classList.add('edit');
    taskItemBtnComplete.classList.add('complete');
    taskItemBtnRemove.classList.add('remove');


    taskItemBtnEdit.innerText = 'Edit';
    taskItemBtnComplete.innerText = 'Complete';
    taskItemBtnRemove.innerText = 'Remove';
    taskItemContent.innerText = taskObject.value;

    taskItem.appendChild(editInput);
    taskItem.appendChild(taskItemContent);
    taskItem.appendChild(taskItemBtnComplete);
    taskItem.appendChild(taskItemBtnRemove);
    taskItem.appendChild(taskItemBtnEdit);

    taskItem.setAttribute('data-id', taskObject.id);

    if (taskObject.completed) {
        taskItem.classList.add('note-list__item--completed');
        taskItemBtnEdit.disabled = true;
        taskItemBtnComplete.disabled = true;
    }
    return taskItem;
}

form.addEventListener('submit', e => {
    e.preventDefault();

    if (input.value.trim()) {
        const task = {
            value: input.value,
            completed: false,
            id: String(new Date).slice(16, 24)
        };

        taskList.unshift(task);
        noteList.prepend(renderTask(task));
    }

    input.value = '';
});

noteList.addEventListener('click', e => {
    const element = e.target;
    const targetClassName = element.className;
    let currentId;

    if (targetClassName === 'complete' || targetClassName === 'remove' || targetClassName === 'edit') {
        currentId = element.closest('li').getAttribute('data-id');
    }

    if (targetClassName === 'complete') {
        taskList.find(task => task.id === currentId).completed = true;

        noteList.innerHTML = '';

        taskList.forEach(task => {
            noteList.append(renderTask(task));
        });

    } else if (targetClassName === 'remove') {
        noteList.innerHTML = '';

        taskList = taskList.filter(task => task.id !== currentId);

        taskList.forEach(task => {
            noteList.append(renderTask(task));
        });
    } else if (targetClassName === 'edit') {
        if (element.closest('li').classList.contains("editMode")) {
            taskList.find(task => task.id === currentId).value = element.closest('li').firstChild.value;

            noteList.innerHTML = '';

            taskList.forEach(task => {
                noteList.append(renderTask(task));
            });
        } else {
            element.closest('li').firstChild.value = taskList.find(task => task.id === currentId).value;
        }
        element.closest('li').classList.toggle("editMode");
    }
});

