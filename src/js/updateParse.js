$(document).ready(function() {
	console.log('testing update');
	var MixTrack = Parse.Object.extend('MixTrack');
	var query = new Parse.Query(MixTrack);
	query.equalTo('trackId', 222969328);
	query.first({
  success: function(mixTrack) {
     console.log(mixTrack);
     mixTrack.set("order", 9);
     mixTrack.save();


  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});
	
	
	
});