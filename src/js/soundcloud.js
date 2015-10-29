$(document).ready(function() {
	
	var track1 = '224936906';
	var track2 = '184852520';
	var track3 = '222969328';
	var track4 = '226957011';
	var track5 = '183756026';
	var track6 = '146254963';
	var track7 = '222652671';
	var track8 = '161486626';
	var track9 = '221926644';
	var track10 = '197900059';
	var trackList = [track1, track2, track3, track4, track5, track6, track7, track8, track9, track10];
	console.log(trackList);
	var tracksUrl = '/tracks?ids=' + track1 + ',' + track2 + ',' + track3 + ',' + track4 + ',' + track5 + ',' + track6 + ',' + track7 + ',' + track8 + ',' + track9 + ',' + track10;
//	console.log(tracksUrl);
//	var trackid = track1;
	var playOn = false;
	var error = "fuck it";
//	var trackCollection;
//							      console.log(trackCollection);
	
	
	
	
	
	//// start button hider/shower 
	
	 var startToggler = function () {
			var startButtonsLi = $('.start').parents('.mixTrack-li');
			 if (startButtonsLi.hasClass('is-playing')) {
				 startButtonsLi.removeClass('is-playing');
//				 $('.mixTrack-li').css('background-color', "#B63868");
//				 $('.mixTrack-li').css('transition', '1s');
//				 $('.mixTrack-li:hover').css('background-color', '#6FAC28');
				 $('.stop').hide();
				 $('.start').show();
			 }
	   };
	
	
	
	//// PARSING SHIT.
	
		var MixTrack = Parse.Object.extend("MixTrack");
		var mixTrack = new MixTrack();
  
	
	//// GET ALL TRACKS TO INITIALIZE PAGE
	
		var MixTrack = Parse.Object.extend("MixTrack");
		var query = new Parse.Query(MixTrack);
	  query.addAscending("order");
		query.find({
				success: function(results) {
//						console.log(results[0].get('trackTitle'));	
						var chartNumber = 1;
						$.each(results, function(index, track) {
										$('#results').append($('<li class="mixTrack-li" data-id="' + track.get('trackId') + '"></li>').html('<div class="chart-number">' + chartNumber + '</div><div class="song-content"><div><img class="song-image" src="' + track.get('trackImg') + '"></div><p><a target="_blank" href="' + track.get('trackUrl')  + '">' + track.get('trackTitle') + '</a></p><div class="sc-controls"><a href="#" class="start icon">D</a><a href="#" class="stop icon">E</a></div></div>'));
										chartNumber ++;
										$('.stop').hide();
								});

				},
				error: function(object, error) {
						console.error(error);
						// The object was not retrieved successfully.
						// error is a Parse.Error with an error code and description.
				}
		});
	
	///// FINISH INIT	
	
	

	
	//// start streaming
	
	 $('#results').on('click', '.start', function(e){
		startToggler();
		 var startButtonLi = $(this).parents('.mixTrack-li');
		 startButtonLi.addClass('is-playing');
		 console.log(playOn);
 		 playOn = true;
		 e.stopPropagation();
		 e.preventDefault();
		 $(this).hide();
		 $(this).siblings().show();
//		 $('.stop').show();
		 var thisLi = $(this).closest('li');
		 console.log(thisLi);
		 var trackId = thisLi.data('id');
		 streamTrack(trackId);	 
		 console.log(playOn)
	 });
	
///// end of function 
	
	
///// get tracks and intitialize page
	
//	SC.get(tracksUrl, function(tracks) {
////			 console.log(tracks);
//		var chartNumber = 1;
//			$(tracks).each(function(index, track) {
//						$('#results').append($('<li data-id="' + track.id + '"></li>').html('<div class="chart-number">' + chartNumber + '</div><div class="song-content"><div><img class="song-image" src="' + track.artwork_url + '"></div><p><a target="_blank" href="' + track.permalink_url  + '">' + track.title + '</a></p><div class="sc-controls"><a href="#" class="start icon">D</a><a href="#" class="stop icon">E</a></div></div>'));
//						chartNumber ++;
//						$('.stop').hide();
////						saveTrackToParse(track);
//				});
//	});
//	
	
	//////// end of function 
	
	
	///// nowPlaying Function

	var nowPlaying = function (trackId) {
		SC.get('/tracks/' + trackId, function(track) {
			 console.log(trackId);
				$('.now-playing-insert').html('<div class="now-playing-div" data-id="' + track.id + '">	<h4>Now Playing:</h4><div class="now-playing-content"><p><a target="_blank" href="' + track.permalink_url  + '">' + track.title + '</a></p></div></div>');
				
	});
	
	};
	
	///// function end
	
	/// streaming functionality and stopping.
	
	var streamTrack = function(trackId) {
//		console.log(trackId);
		SC.stream('/tracks/' + trackId, {onfinish: function(){
			var randomTrack = trackList[Math.floor(Math.random()*trackList.length)];
			console.log(randomTrack);
			startToggler();
			streamTrack(randomTrack);
			nowPlaying(randomTrack);				
			cycleTracks(randomTrack);
		}}, function(sound){
			
			if (playOn === true) {
			  soundManager.stopAll();
				console.log(trackId);
		 	  sound.play();
				applyColor();
				console.log('play');
				cycleTracks();
				console.log(sound);
				nowPlaying(trackId);
			}
			else {
				nowPlaying(trackId);
				sound.play();
				applyColor();
				cycleTracks();
			}
			
			 $('#results').on('click', '.stop', function(e){
				 $(this).hide();
				 console.log(playOn);
				 var startButton =  $(this).siblings()
				 startButton.removeClass('is-playing');
				 startButton.show();
				 sound.stop();
//				 $('.mixTrack-li').css('background-color', "#B63868");
				 playOn = false;
				 console.log(playOn);
				 e.stopPropagation();
				 e.preventDefault();
	     });			
		 });
	 };
	
////// function end.
	
	
	///// save to Track to Parse
	var saveTrackToParse = function(track) {
//			console.log(track);
			var mixTrack = new MixTrack();
			mixTrack.save({
			trackId: track.id,
      trackTitle: track.title,
			trackUrl: track.permalink_url,
			trackImg: track.artwork_url
		}, {
			success: function(mixTrack) {
			  console.log(mixTrack.get('trackTitle'));
				console.log(mixTrack.get('trackId'));
				console.log(mixTrack.id);
//				console.log(mixTrack);
				// The object was saved successfully.
			},
			error: function(mixTrack, error) {
				// The save failed.
				// error is a Parse.Error with an error code and message.
			}
	  });
	};
	
	var cycleTracks = function (randomTrack) {
			console.log('fire');
			var trackCollection = $('.mixTrack-li');
			console.log(trackCollection);
			trackCollection.each(function(index, result){
				var track = $(this);
			var trackId = $(this).data('id');	
				console.log(randomTrack);
				if (parseInt(trackId) === parseInt(randomTrack)) {
					console.log('match');
					var trackStartButton = track.find('.start');
					startToggler();
					track.addClass('is-playing');
				  trackStartButton.hide();
					track.find('.stop').show();
				};
			    console.log(trackId);
				});
	};

	
	var applyColor = function (){
		var trackCollection = $('.mixTrack-li');
//		var trackStart = $('.mixTrack-li').find('.start');
			console.log(trackCollection);
			trackCollection.each(function(index, result){	
				var track = $(this);
				var trackStart = track.find('.start');
//				if (trackStart.hasClass('is-playing')) {
//					track.css('background-color', '#2E965B');
//				};
	
			});
	};

	$('.color-flip').click(function(){
		var thisFlip = $(this);
		if (thisFlip.css('background-color', '#purple')) {
//			alert('yipee kaye aye motherfucker');
//			return;
		}
	});
	
	
		
});

