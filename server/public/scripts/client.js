console.log( 'js' );

$(document).ready(function(){
    console.log( 'jQuery sourced.');
    refreshTasks();
    addClickHandlers();
});

//onReady function, click handlers
function addClickHandlers(){
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
        url: '/tasks'
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
        let list = tasks[i];
        let $tr = $(`<tr></tr>`);
            $tr.append(`<td>${list.task}</td>`);
            $tr.append(`<td>${list.location}</td>`);
            $tr.append(`<td>${list.status}</td>`);
            $tr.append(`<td>${list.est_time}</td>`);
            $tr.append(`<td><button class="deleteBtn">Done!</button></td>`);
        $('#taskList').append($tr);
    }
}

// put in router and update name (koala holla)
function updateTask(){
    let id = $(this).closest(`tr`).data(`id`);
    $.ajax({
        method: 'PUT',
        url: `/tasks/${id}`
    }).then(function( response){
        refreshTasks();
    }).catch( function (error){
        alert(`something went wrong in POST CLIENT`);
        console.log(error);
    });
}

