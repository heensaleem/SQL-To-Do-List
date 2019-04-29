console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners()
  // load data from the server, put it on the DOM
  getTasks();

}); // end doc ready


function setupClickListeners() {
  $('#createBtn').on('click', function () {
    console.log('in createBtn on click');
    // get user input and put in an object

    let dataToSend = {
      name: $('#nameIn').val(),
      task: $('#taskIn').val(),
      notes: $('#notesIn').val(),
      taskStatus: $('#statusIn').val()
    };
    console.log(dataToSend)

    $('input').val('');
    saveTasks(dataToSend);
  });


  //deletes row in the table
  $('#viewTasks').on('click', '.deleteBtn', deleteRow);
  //updates row in the table
  $('#viewTasks').on('click', '.completeBtn', setToComplete);
  $('.completeBtn').on('click', function () {
    //change the ‘background-color’ property to the desired color.
    $(this).css('background-color', 'green');
  });


}

function getTasks() {
  console.log('in getdata');
  //ajax to get the data from the server
  $.ajax({
    type: 'GET',
    url: '/todolists'
  }).then(function (response) {
    console.log('response', response);
    refreshTasks(response);
  })
} // end getTasks

function saveTasks(newData) {
  console.log('in save tasks', newData);
  //to post the data to the server
  $.ajax({
    method: 'POST',
    url: '/todolists',
    data: newData
  }).then(function (response) {
    console.log(response);
    getTasks();
  }).catch(function (error) {
    console.log('error getting To do list:', error);
  })
}

function refreshTasks(lists) {
  console.log('in refreshtasks', lists);
  let el = $('#viewTasks');
  el.empty();

  for (let list of lists) {
    console.log('lists', lists);
    console.log('checking true/false:', list.taskStatus);
    let taskstatusAppend =
      (list.taskStatus) ? `<p class="completeBtn">completed</p>`
        : `<button class="btn btn-primary completeBtn" data-id="${list.id}">uncompleted</button>`;
    console.log('transfer append:', taskstatusAppend);
    let append = `
      <tr class="listAppend" >
       <td>${list.name}</td>
        <td>${list.task}</td>
        <td>${list.notes}</td>
        <td>${taskstatusAppend}</td>
        <td><button class="btn btn-danger deleteBtn" data-id="${list.id}">X</button></td>
      </tr>
    `
    console.log('appending:', append);
    $('#viewTasks').append(append);
  }

}
//to delete a row
function deleteRow() {
  console.log('delete btn id:', $(this).data('id'));
  let delUrl = `/todolists/delete/${$(this).data('id')}`;
  $.ajax({
    method: 'DELETE',
    url: delUrl
  }).then(function (response) {
    console.log(response);
    getTasks();
  }).catch(function (err) {
    console.log('error', err);
  })
}
//to update a row
function setToComplete() {
  console.log('in settocomplete');
  let putUrl = `/todolists/${$(this).data('id')}`;
  $.ajax({
    method: 'PUT',
    url: putUrl
  }).then(function (response) {
    console.log('response:', response);
    getTasks();
  }).catch(function (error) {
    console.log('error:', error);
  });
}

