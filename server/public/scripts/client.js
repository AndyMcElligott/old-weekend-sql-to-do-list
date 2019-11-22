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
    //function(list);
}