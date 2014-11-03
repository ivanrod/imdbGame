class GameImdb
=begin
GameImdb Class 
Creates an object key words 
=end
	attr_reader :showJson
	def initialize(gameSearchData)
=begin 
	Initializes the function
	@gameSearchData: string --> key words
	@randomWords: array --> random words if the user doesn't provide keywords
	@winnerNum: Random object --> A random number to select the winner movie
=end
		@gameSearchData = gameSearchData
		@randomWords = ["unlight","laird","tinklingly","abstentious","gynecomastia","unseparableness","emotionality","overcaptious","cannily","enskyed","rascally","chipper","clementine","enatic","sovetsk","destituting","maturating","overthoughtful","demoralised","underspar"]
		@winnerNum = Random.new.rand(0..10)
	end
	def searchImdb
=begin
	Makes a search in the IMDB database with the key words 
	@show: Imdb object --> Search
=end
		if @gameSearchData == ""
			gameSearchData = @randomWords.sample
		else
			gameSearchData = @gameSearchData
		end	
		@show = Imdb::Search.new(gameSearchData)
	end
	def winner(counter, item)
=begin 
	Selects a winner movie if the counter is equeal to counter
=end
		
		if counter == @winnerNum
			@winnerMovie = [item.poster, item.year]
		end
	end
	def getTen
=begin 
	Gets ten movies randomly or using the key words
	@years: array --> list with the years of the movies selected
	@showList: array --> list with the movies selected
=end
		counter = 0
		@years = []
		@showList = []
		@show.movies.each do |item|
			if counter>=10
				break
			end
			if item.poster != nil && !(@years.include?(item.year)) && item.year != nil
				@showList.push([item.poster, item.id, item.year])
				winner(counter, item)
				counter += 1
				@years.push(item.year)
			end
		end
	end
	def getJson
=begin 
	Obtains a Json object with the winner movie and the list of movies
	@showJson: Json object 
=end
		searchImdb
		getTen
		showHash ={'showList' => @showList, 'winnerMovie' => @winnerMovie}
		@showJson = showHash.to_json
	end
end
