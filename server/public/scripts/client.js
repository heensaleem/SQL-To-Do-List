console.log('js');
$( document ).ready( function(){
    console.log( 'JQ' );
    // Establish Click Listeners
    setupClickListeners()
    // load existing koalas on page load
    //getToDolist();
  
}); // end doc ready

function setupClickListeners(){
    $('#createToDoListBtn').on('click', handleInputs);
}

function handleInputs(){
    console.log('you clicked create button');

}


