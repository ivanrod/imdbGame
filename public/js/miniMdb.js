document.getElementsByTagName('button')[0].addEventListener('click',getPost);
document.getElementsByTagName('button')[1].addEventListener('click',getPostGame);
document.getElementsByTagName('button')[2].addEventListener('click',getPostGameRandom);




function getPost(e){
	var l = Ladda.create( document.querySelector( '.ladda-button' ) );
	l.start();
	l.isLoading();
	$.post( "/list2", document.getElementById('input2').value, function(){
		var response = $.getJSON( "/list2", function(data){
			createList(data,l);
		});
	});
	
	//document.getElementById('input1').value=response.responseText;
	//return response.responseText
}

function deleteList(className){
	var showList = document.getElementsByClassName(className);
	
	while (showList.length > 0){
		showList[0].remove();
	};
}

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










function getPostGame(){
	var l = Ladda.create( document.getElementsByClassName('ladda-button')[1] );
	l.start();
	l.isLoading();
	$.post( "/list", document.getElementById('input2').value, function(){
		var response = $.getJSON( "/list", function(data){
			game(data);
			l.stop();
		});
	});	
}

function getPostGameRandom(){
	var l = Ladda.create( document.getElementsByClassName('ladda-button')[2] );
	l.start();
	l.isLoading();
		var response = $.getJSON( "/list", function(data){
			game(data);
			l.stop();
		});
}

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