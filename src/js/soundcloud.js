$(document).ready(function() {
	
	var track1 = '224936906';
	var track2 = '224936907';
	var track3 = '224936909';
	var tracksUrl = '/tracks?ids=' + track1 + ',' + track2 + ',' + track3;
	console.log(tracksUrl);

	
	
	
	 SC.get(tracksUrl, function(tracks) {
		 
		 
		 console.log(tracks);
    $(tracks).each(function(index, track) {
      $('#results').append($('<li></li>').html('<div><img class="song-image" src="' + track.artwork_url + '"></div>' + track.title + '<div class="sc-controls"><a href="#" id="start">Start</a><a href="#" id="stop">Stop</a</div>'));
    });
  });
	
	 SC.stream('/tracks/' + track1, function(sound){
     $('#start').on('click', function(){
        sound.start();
     });
      $('#stop').on('click', function(){
        sound.stop();
     });
 
 });
	
	
	
});