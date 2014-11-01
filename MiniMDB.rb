require 'sinatra'
require 'sinatra/reloader'
require 'imdb'
require 'json'

@showHash = {}
@showJson = @showHash.to_json
showList = []
selectedShows = {}

randomWords = ["unlight","laird","tinklingly","abstentious","gynecomastia","unseparableness","emotionality","overcaptious","cannily","enskyed","rascally","chipper","clementine","enatic","sovetsk","destituting","maturating","overthoughtful","demoralised","underspar"]
#index View
get '/' do 
	@selectedShows = selectedShows
	erb :index
end

#'/list2' views to allow AJAX
gameSearchData=''

post '/list' do 
	if request.xhr?
		gameSearchData = request.body.read.to_s
		return gameSearchData
	else
		return 'error'
	end
end

get '/list' do 
	if request.xhr?
		if gameSearchData == ""
			@gameSearchData = randomWords.sample
		else
			@gameSearchData = gameSearchData
		end
		@years = []
		@show = Imdb::Search.new(@gameSearchData)
		@showList = []
		@counter = 0
		@winner = Random.new.rand(0..10)
		@show.movies.each do |item|
			if @counter>=10
				break
			end
			if item.poster != nil && !(@years.include?(item.year)) && item.year != nil
				puts item.year
				@showList.push([item.poster, item.id, item.year])
				if @counter == @winner
					@winnerMovie = [item.poster, item.year] 
				end
				@counter += 1
				@years.push(item.year)
			end
		end
		@showHash ={'showList' => @showList, 'winnerMovie' => @winnerMovie}
		@showJson = @showHash.to_json
		showList = @showList


		return @showJson
	else
		return 'error'
	end
end

#'/list2' views to allow AJAX
searchData=''

post '/list2' do 
	if request.xhr?
		searchData = request.body.read.to_s
		return searchData
	else
		return 'error'
	end
end

get '/list2' do 
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

#'/show' view to add shows


post '/show' do 
	@selectedShowsList = []
	@counter = 0
	@winner = Random.new.rand(0..10)

	(0..10).each do |num|
		
		movie = Imdb::Movie.new(showList[num][1])
		if @counter == @winner
			@winnerMovie = movie 
		end

		@selectedShowsList.push(movie)
		@counter += 1
	end


=begin
		if @rating.to_f > 9
			@class = 'darkGreen'
		elsif @rating.to_f > 8
			@class = 'green'
		elsif @rating.to_f > 5.5
			@class = 'yellow'
		else
			@class = 'red'
		end
				
				

		@selectedShows = selectedShows
		@selectedShows[params[:showType]] = [@title, @rating, @cover, @url, @class]
		selectedShows = @selectedShows
=end
	erb :show
end



