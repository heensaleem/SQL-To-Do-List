console.log('js');

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing data on page load
  getTasks();

}); // end doc ready

function setupClickListeners() {
  $( '#createBtn' ).on( 'click', function(){
    console.log( 'in createBtn on click' );
    // get user input and put in an object
  
    let dataToSend = {
      name: $('#nameIn').val(),
      task: $('#taskIn').val(),
      notes: $('#notesIn').val(),
      taskStatus: $('#statusIn').val()
    };
    console.log(dataToSend)
   
    $('input').val('');
    saveTasks( dataToSend );
  });
  $('#viewTasks').on('click', '.completeBtn', setToComplete);
}

function getTasks(){
  console.log( 'in getdata' );
  $.ajax ({
    type: 'GET',
    url: '/todolists'
  }).then(function (response) {
    console.log('response', response);
    refreshTasks(response);
  })
} // end getTasks

function saveTasks(newData){
  console.log('in save tasks', newData);
  $.ajax({
    method: 'POST',
    url: '/todolists',
    data: newData
  }).then(function(response) {
      console.log(response);
      getTasks();
  }).catch( function( error ){
    console.log( 'error getting To do list:', error );
  })
}

function refreshTasks(lists){
  console.log('in refreshtasks', lists);
  let el = $('#viewTasks');
  el.empty();

  for(let list of lists){
    console.log('lists', lists);
    console.log('checking true/false:',list.taskStatus);
    let taskstatusAppend =
      (list.taskStatus) ? `<p class="completeBtn">completed</p>`
        : `<button class="btn btn-primary completeBtn" data-id="${list.id}">uncompleted</button>`;
    console.log('transfer append:', taskstatusAppend);
    let append = `\
      <tr>
       <td>${list.name}</td>
        <td>${list.task}</td>
        <td>${list.notes}</td>
        <td>${taskstatusAppend}</td>
        <td><button class="btn btn-danger deleteBtn" data-id="${list.id}">X</button></td>
      </tr>
    `
    console.log('appending:',append);
    $('#viewTasks').append(append);
  }

}
 function setToComplete(){
   console.log('in settocomplete');
   let putUrl = `/todolists/${$(this).data('id')}`;
  $.ajax({
    method: 'PUT',
    url: putUrl
  }).then(function (response){
    console.log('response:', response);
    getTasks();
  }).catch(function (error){
    console.log('error:', error);
  });
 }