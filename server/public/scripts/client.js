console.log('js');
$( document ).ready( function(){
    console.log( 'JQ' );
    // Establish Click Listeners
    setupClickListeners()
    // load existing toDoList on page load
    getToDoList();
  
}); // end doc ready

function setupClickListeners(){
    $('#createToDoListBtn').on('click', handleInputs);

}

function handleInputs(){
    console.log('you clicked create button');
    //get user inputs and create object
    let listToSend = {
        name:$('#nameIn').val(),
        date:$('#dateIn').val(),
        tasks:$('#tasksIn').val(),
        complete:$('#completeIn').val()
    }
    console.log(listToSend);
    //clear inputs
    $('input').val('');
    //to save the data taken from inputs
    saveList(listToSend );

}


function getToDoList(){
    console.log('in getToDoList');
    // ajax call to server to get todolist
  $.ajax ({
    type: 'GET',
    url: '/todos'
  }).then(function (response) {
    console.log('response', response);
    refreshToDoList(response);
  })
} // end gettodolist

function saveList(newList){
console.log('in saveList', newList);
$.ajax({
    method: 'POST',
    url: '/todos',
    data: newList
  }).then(function(response) {
      console.log(response);
      getToDoList();
  }).catch( function( err ){
    console.log( 'error getting todolist:', err );
  })
}

function refreshToDoList(toDoList){
    console.log('in refreshtodolist');
  let el = $('#viewToDoList');
  el.empty();

  for(let list of toDoList){
    console.log('toDoList', toDoList);
    let completeAppend =
      (list.complete) ? `<p class="completeBtn">complete</p>`
        : `<button class="btn btn-primary completeBtn" data-id="${list.id}">task completed</button>`;
    console.log('complete append:', completeAppend);
    let append = `
      <tr>
        <td>${list.name}</td>
        <td>${list.date}</td>
        <td>${list.tasks}</td>
        <td>${completeAppend}</td>
        <td><button class="btn btn-danger deleteBtn" data-id="${list.id}">X</button></td>
      </tr>
    `
    console.log('appending:',append);
    $('#viewToDoList').append(append);
  }
}






