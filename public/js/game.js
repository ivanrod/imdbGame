'use strict';

/* getPostGame function
Sends a text inserted by the user and calls the game function with the response
*/
function getPostGame(){
	var l = Ladda.create( document.getElementsByClassName('ladda-button')[1] );
	l.start();
	l.isLoading();
	$.post( "/game", document.getElementById('input2').value, function(){
		var response = $.getJSON( "/game", function(data){
			game(data);
			l.stop();
		});
	});	
}

/* getPostGame function
Obtains a JSON file and pass the data to game function
*/
function getPostGameRandom(){
	var l = Ladda.create( document.getElementsByClassName('ladda-button')[2] );
	l.start();
	l.isLoading();
		var response = $.getJSON( "/game", function(data){
			game(data);
			l.stop();
		});
}

/* game function

*/
function game(data){
	var movieList = data.showList;
	var winnerMovie = data.winnerMovie;
	var section = document.getElementById("gameSection");
	section.innerHTML = "";
	var question = document.createElement("p");
	var ul = document.createElement("ul");
	question.innerHTML = "Which of the movies was filmed in year " + winnerMovie[1] + " ?"
	section.appendChild(question);
	section.appendChild(ul);

	var counter = 0;
	for (i=0; i<movieList.length; i++){
		var radio = document.createElement('input');
		radio.className = "gameListItem " + movieList[i][2]
		radio.setAttribute("type", "radio");
		radio.setAttribute("name", "gameOptions");
		var label = document.createElement('label');
		var li = document.createElement('li');
		var img = document.createElement('img');
		img.setAttribute("src", movieList[i][0])
		img.className = "gameListItem " + movieList[i][2]
		/*label.appendChild(img);
		label.appendChild(radio);*/
		var div = document.createElement('div')
		div.appendChild(img)
		li.appendChild(div)
		ul.appendChild(li);
		counter += 1;
		img.addEventListener("click", solveFunImage.bind(this, winnerMovie, counter));
	}

}







function solveFunImage(winnerMovie, year, event){
	var response = document.createElement("div");
	var checked = document.getElementsByClassName(winnerMovie[1]);
	if (event.target == checked[0]){
		response.innerHTML ="TRUE"
	}
	else{
		response.innerHTML = "FALSE";
	}
	
	event.target.parentNode.appendChild(response);
}