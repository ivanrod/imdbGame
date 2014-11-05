require 'sinatra'
require 'sinatra/reloader'
require 'imdb'
require 'json'
require './classes/GameImdb'

@showHash = {}
@showJson = @showHash.to_json
showList = []
selectedShows = {}

#index View
get '/' do 
	@selectedShows = selectedShows
	erb :index
end

#'/game' views with AJAX
gameSearchData=''

post '/game' do 
	if request.xhr?
		gameSearchData = request.body.read.to_s
		return gameSearchData
	else
		return 'error'
	end
end

get '/game' do 
	if request.xhr?
		newGame = GameImdb.new(gameSearchData)
		newGame.getJson
		newGame.showJson
		puts newGame
		return newGame.showJson

	else
		return 'error'
	end
end

#'/list' views with AJAX
searchData=''

post '/list' do 
	if request.xhr?
		searchData = request.body.read.to_s
		return searchData
	else
		return 'error'
	end
end

get '/list' do 
	if request.xhr?
		#@searchData = request.body.read.to_s
		@show = Imdb::Search.new(searchData)
		@showList = []
		@show.movies.each do |item|
			@showList.push([item.title, item.id])
		end
		@showHash ={'showList' => @showList}
		@showJson = @showHash.to_json
		showList = @showList
		return @showJson
	else
		return 'error'
	end
end