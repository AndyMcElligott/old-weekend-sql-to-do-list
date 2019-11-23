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
        //function to go here to update DOM
    }).catch(function(error) {
        console.log('Error in POST', error)
        alert('Unable to add task at this time. Please try again later.');
    });
}