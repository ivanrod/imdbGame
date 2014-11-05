'use strict';

/* getPost function
Sends a text inserted by the user and calls the createList function with the response
*/
function getPost(e){
	var l = Ladda.create( document.querySelector( '.ladda-button' ) );
	l.start();
	l.isLoading();
	$.post( "/list", document.getElementById('input2').value, function(){
		var response = $.getJSON( "/list", function(data){
			createList(data,l);
		});
	});
}

/* deleteList function
Removes all the elements of the movies list
*/
function deleteList(className){
	var showList = document.getElementsByClassName(className);
	
	while (showList.length > 0){
		showList[0].remove();
	};
}

/* createList function
Creates the list of movies
*/
function createList(newList,l){
	deleteList('showList');

	for (i=0; i < newList.showList.length; i++){
		var option = document.createElement('option');
		option.className = "showList";
		option.innerHTML = newList.showList[i][0];
		option.setAttribute('value', newList.showList[i][1]);
		document.getElementById('show').appendChild(option);
	}
	l.stop();
}