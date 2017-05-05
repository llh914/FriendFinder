var friendsArray = require("../data/friends");

module.exports = function(app) {

	app.get("/api/friends", function(request, response) {
		response.json(friendsArray);
	});

	app.post("/api/friends", function(request, response) {
		var newFriend = request.body;
		
		// Converting newFriend scores to array of integers
		var newFriendScoreArray = [];
		for (var i = 0; i < newFriend.scores.length; i++) {
			newFriendScoreArray.push(parseInt(newFriend.scores[i]))
		};

		newFriend.scores = newFriendScoreArray;

		//Calculating differences
		var totalDifferenceArray = [];
		for (var i = 0; i  < friendsArray.length; i++) {
			var totalDifference = 0;
			for (var x = 0; x < newFriendScoreArray.length; x++) {
				totalDifference = totalDifference + Math.abs(friendsArray[i].scores[x]- newFriendScoreArray[x])
			} 
			totalDifferenceArray.push(totalDifference);
		};

		//Matching Friend
		var friendMatch;
		var friendMatchIndex;
		var min = 40;
		for (var i = 0; i < totalDifferenceArray.length; i++) {
			min = Math.min(min,totalDifferenceArray[i]);
		};

		friendMatchIndex = totalDifferenceArray.indexOf(min);
		friendMatch = friendsArray[friendMatchIndex];
		friendsArray.push(newFriend);
		response.json(friendMatch);
	});

};