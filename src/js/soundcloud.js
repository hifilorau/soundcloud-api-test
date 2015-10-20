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
	var trackid = track1;
	var playOn = false;
	var error = "fuck it";
	
	
	//// start button hider/shower 
	
	 var startToggler = function () {
			var startButtons = $('.start');
			 if (startButtons.hasClass('is-playing')) {
				$('.start').removeClass('is-playing');
				 $('.stop').hide();
				 $('.start').show();
			 };
	   };
	
	
	
	//// PARSING SHIT.
	
var MixTrack = Parse.Object.extend("MixTrack");
var mixTrack = new MixTrack();
  
	
	//// start streaming
	
	 $('#results').on('click', '.start', function(e){
		startToggler();
		 
		 $(this).addClass('is-playing');
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
	
	SC.get(tracksUrl, function(tracks) {
//			 console.log(tracks);
		var chartNumber = 1;
			$(tracks).each(function(index, track) {
						$('#results').append($('<li data-id="' + track.id + '"></li>').html('<div class="chart-number">' + chartNumber + '</div><div class="song-content"><div><img class="song-image" src="' + track.artwork_url + '"></div><p><a target="_blank" href="' + track.permalink_url  + '">' + track.title + '</a></p><div class="sc-controls"><a href="#" class="start icon">D</a><a href="#" class="stop icon">E</a></div></div>'));
						chartNumber ++;
						$('.stop').hide();
						saveTrackToParse(track);
				});
	});
	
	
	//////// end of function 
	
	
	///// nowPlaying Function

	var nowPlaying = function (trackId) {
		SC.get('/tracks/' + trackId, function(track) {
			 console.log(trackId);
			
				$('.now-playing-wrapper').html('<div class="now-playing-div" data-id="' + track.id + '">	<h4>Now Playing:</h4><div class="now-playing-content"><p><a target="_blank" href="' + track.permalink_url  + '">' + track.title + '</a></p></div></div>');
				
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
			
			
			//// Cycle through loop of li's and look for data-ids that match random number. if they match hide and show start stop. 
			for (i=0; i < trackList.length; ++i) {
				console.log(trackList[i]);
				if (randomTrack === trackList[i]) {
				   console.log('heyo');
					}

				}

			
			streamTrack(randomTrack);
			nowPlaying(randomTrack);				
		}}, function(sound){
			
			if (playOn === true) {
			  soundManager.stopAll();
				console.log(trackId);
		 	  sound.play();
				console.log(sound);
				
					
				
				nowPlaying(trackId);
			}
			else {
				sound.play();
			}
			
			
			 $('#results').on('click', '.stop', function(e){
				 $(this).hide();
				 console.log(playOn);
				 var startButton =  $(this).siblings()
				 startButton.removeClass('is-playing');
				 startButton.show();
				 sound.stop();
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
		}, {
			success: function(mixTrack) {
			  console.log(mixTrack.get('trackTitle'));
				console.log(mixTrack.get('trackId'));
				console.log(mixTrack.id);
				console.log(mixTrack);
				// The object was saved successfully.
			},
			error: function(mixTrack, error) {
				// The save failed.
				// error is a Parse.Error with an error code and message.
			}
	  });
	};
	
// $('.get-stuff').click(function() {
//	    var MixTrack = Parse.Object.extend("MixTrack");
//			var query = new Parse.Query(MixTrack);
//				query.get("dxxYCQYxNK", {
//				success: function(mixTrack) {
//				console.log(mixTrack.get('trackTitle'));
//				
//				},
//				error: function(object, error) {
//				// The object was not retrieved successfully.
//				// error is a Parse.Error with an error code and message.
//				}
//			 });
//	  });
	
	
	
	    var MixTrack = Parse.Object.extend("MixTrack");
			var query = new Parse.Query(MixTrack);
			query.equalTo("trackId", parseInt(track1));
			query.find({
					success: function(results) {
						  console.log(results[0].get('trackTitle'));
						  $.each(results, function( index, result) {
							console.log(result.get('trackId'));
						});
					},
					error: function(object, error) {
							console.error(error);
							// The object was not retrieved successfully.
							// error is a Parse.Error with an error code and description.
					}
			});
	
	 
//				 mixTrack.fetch({
//				success: function(myObject) {
//					// The object was refreshed successfully.
//				},
//				error: function(myObject, error) {
//					// The object was not refreshed successfully.
//					// error is a Parse.Error with an error code and message.
//				}
//			});
// });

		
});

