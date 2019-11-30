console.log('js');

$('document').ready(onReady);

function onReady() {
        console.log('jQuery sourced.');
        $('#taskList').on(`click`, `.deleteBtn`, deleteTask);
        $(`#completeBtn`).on(`click`, `.completeBtn`, updateTask);
        $('#submitBtn').on(`click`, addTask);
        getTasks();
}

function addTask() {
        // Create the new task as an object
        const newTask = {
                task: $('#task').val(),
        };
        console.log(newTask);
        // Deliver new task through AJAX
        $.ajax({
                type: 'POST',
                url: '/tasks',
                data: newTask,
        })
                .then(function(response) {
                        console.log('Response from server:', response);
                        getTasks();
                })
                .catch(function(error) {
                        console.log('Error in POST', error);
                        alert('Unable to add task at this time. Please try again later.');
                });
}

// Begin refreshTasks to get all tasks from server and render to DOM
function getTasks() {
        $.ajax({
                type: 'GET',
                url: '/tasks',
        })
                .then(function(response) {
                        console.log('in THEN GET', response);
                        renderTasks(response);
                })
                .catch(function(error) {
                        alert(console.log('error in GET', error));
                });
}

// Displays an array of tasks to the DOM
function renderTasks(tasks) {
        console.log('in renderTasks', tasks);
        $('#taskList').empty();

        for (let i = 0; i < tasks.length; i++) {
                const list = tasks[i];
                const $tr = $(`<tr></tr>`);
                $tr.data('list', list);
                $tr.append(`<td>${list.task}</td>`);
                // $tr.append(`<td>${list.location}</td>`);
                // $tr.append(`<td>${list.status}</td>`);
                // $tr.append(`<td>${list.est_time}</td>`);
                $tr.append(`<td><button class="deleteBtn">Delete!</button></td>`);
                $tr.append(`<td><button class="completeBtn">Completed!</button></td>`);
                $('#taskList').append($tr);
        }
}

// put in router and update name
function updateTask() {
        const id = $(this).data(`id`);
        $.ajax({
                type: 'PUT',
                url: `/tasks/${id}`,
        })
                .then(function(response) {
                        console.log('back from PUT with:', response);
                        getTasks();
                })
                .catch(function(error) {
                        alert(`something went wrong in PUT CLIENT`);
                        console.log(error);
                });
}

// function deleteTask(event) {
//         event.preventDefault();
//         const id = $(this).data('id');
//         console.log('in deleteTask:', id);
//         $.ajax({
//                 type: 'DELETE',
//                 url: '/tasks/${id}',
//         })
//                 .then(function(response) {
//                         console.log('back from delete:', response);
//                         getTasks();
//                 })
//                 .catch(function(err) {
//                         console.error(err);
//                         alert('error deleting task, see console for deets');
//                 });
// }

function deleteTask() {
        const id = $(this)
                .closest('tr')
                .data('id');
        console.log('in deleteTask:', id);
        $.ajax({
                type: 'DELETE',
                url: `/tasks/${id}`,
        })
                .then(function(response) {
                        console.log('back from DELETE:', response);
                        getTasks();
                })
                .catch(function(err) {
                        console.log(err);
                        alert('error deleting task, see console for deets');
                });
}

// const all_tr = $('tr');
// $('td input[type="button"]').on('click', function() {
//         all_tr.removeClass('selected');
//         $(this)
//                 .closest('tr')
//                 .addClass('selected');
// });
