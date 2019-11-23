$(document).ready(onReady);

//onReady function, click handlers
function onReady(){
    console.log('in onReady function');
    $('#submitBtn').on('click', handleSubmit);
}

//handleSubmit function
function handleSubmit(){
    console.log('Submit button clicked.');
    let list = {};
        list.task = $('#task').val();
        list.status = $('#status').val();
        list.location = $('#location').val();
        list.est_time = $('#est_time').val();
        addTask(list);
}

function addTask(taskToAdd) {
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskToAdd
    }).then( function (response) {
        console.log('Response from server:', response);
        refreshTasks();
    }).catch(function(error) {
        console.log('Error in POST', error)
        alert('Unable to add task at this time. Please try again later.');
    });
}

// Begin refreshTasks to get all tasks from server and render to DOM
function refreshTasks(){
    $.ajax({
        type: 'GET',
        url: '/books'
    }).then(function(response) {
        console.log(response);
        renderTasks(response);
      }).catch(function(error){
        console.log('error in GET', error);
      });
    }

// Displays an array of tasks to the DOM
function renderTasks(tasks) {
    console.log('in renderTasks', tasks);
    $('#taskList').empty();
    
    for (let i=0; i<tasks.length; i++ ) {
        let taco = tasks[i];
        let $tr = $(`<tr></tr>`);
            $tr.append(`<td>${taco.task}</td>`);
            $tr.append(`<td>${taco.location}</td>`);
            $tr.append(`<td>${taco.status}</td>`);
            $tr.append(`<td>${taco.est_time}</td>`);
            $tr.append(`<td><button class="deleteBtn">Done!</button></td>`);
        $('#taskList').append($tr);
    }
}