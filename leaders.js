//for more info about the NHL API: https://gitlab.com/dword4/nhlapi/-/blob/master/stats-api.md

//with help from https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/
//as well as https://hackernoon.com/retrieving-hockey-stats-from-the-nhls-undocumented-api-zz3003wrw


//from https://dev.to/vaishnavme/displaying-loading-animation-on-fetch-api-calls-1e5m
// selecting loading div
var loader = document.getElementById("loading");

// showing loading
function displayLoading() {
	loader.classList.add("display");
	// to stop loading after some time (times out at 100 seconds)
	setTimeout(() => {
		loader.classList.remove("display");
	}, 100000);
}

// hiding loading 
function hideLoading() {
	//loader.classList.remove("display");
	loader.style.display = 'none'
}

//a 2d array that stores a player's name, and the points they have scored this season
var playerNamePoints = [];
//a 2d array that stores the top 10 point scorers' names and points
var top10 = [];
//stores the names of the top 10 point scorers
var top10Names = [];
//stores the points of the top 10 point scorers
var top10Points = [];
//starts the call to the NHL API
function startAPICall() {
	//get response for all of the nhl teams
	axios.get('https://statsapi.web.nhl.com/api/v1/teams')
		.then((response) => {
			//while the API is getting data, show a loading icon for the user
			displayLoading();
			//console.log(response.data.teams[20].link);
			//for every team
			for (var i = 0; i < response.data.teams.length; i++) {
				//get the full roster
				getTeamRosters(response.data.teams[i].link);
			}
		});
}
function getTeamRosters(teamLink) {
	//access a team's roster data
	axios.get('https://statsapi.web.nhl.com/' + teamLink + "/roster")
		.then((response) => {
			//for the length of the team's roster
			for (var i = 0; i < response.data.roster.length; i++) {
				//console.log(response.data.roster[i].person.fullName);
				//save the value of a player's first and last name, and pass it forward
				var names = response.data.roster[i].person.fullName;
				//console.log(names);
				//get the number of points for that player
				getPoints(response.data.roster[i].person.link, names);
			}
		})
}
function getPoints(playerLink, playerName) {
	//access a player's points for this year
	axios.get('https://statsapi.web.nhl.com/' + playerLink + '/stats?stats=statsSingleSeason&season=20212022')
		.then((response) => {
			//playerNameArray.push(playerName);
			//playerPointsArray.push(response.data.stats[0].splits[0].stat.points);
			console.log(playerName + " " + (response.data.stats[0].splits[0].stat.points));
			//if the player has played a game (and therefore scored either 0 or more points) this year in the NHL
			if (response.data.stats[0].splits[0].stat.points != undefined) {
				//add the player's name and points to an array
				playerNamePoints.push([playerName, response.data.stats[0].splits[0].stat.points]);
				//sort the array from highest points to lowest points
				playerNamePoints.sort(numberSort);
			}
			//filters the top 10 point scorers
			top10 = playerNamePoints.filter(filterTop10);
			//grabs the names of the top 10 point scorers
			top10Names = getCol(top10, 0);
			//grabs the points of the top 10 point scorers
			top10Points = getCol(top10, 1);
			//loads the google chart
			google.charts.load('current', { 'packages': ['corechart'] });
			google.charts.setOnLoadCallback(drawChart);
		})
}
//sorts the 2d array from high to low from the second value (where the points are stored)
function numberSort(col1, col2) {
	//thanks to https://stackoverflow.com/questions/16096872/how-to-sort-2-dimensional-array-by-column-value
	return col2[1] - col1[1];
}
//filters the top 10 point scorers
function filterTop10(value, index, array) {
	return index < 10;
}
//starts the API call
startAPICall();

//the drawing of the chart
function drawChart() {
	//what data is being shown
	var data = google.visualization.arrayToDataTable([
		//the top 3 point scorers have gold, silver, and bronze colours, respectively
		['Player Name', 'Number of Points', { role: 'style' }],
		[top10Names[0], top10Points[0], 'fill-color: goldenrod;'],
		[top10Names[1], top10Points[1], 'fill-color: silver;'],
		[top10Names[2], top10Points[2], 'fill-color: sienna;'],
		[top10Names[3], top10Points[3], 'fill-color: royalblue;'],
		[top10Names[4], top10Points[4], 'fill-color: royalblue;'],
		[top10Names[5], top10Points[5], 'fill-color: royalblue;'],
		[top10Names[6], top10Points[6], 'fill-color: royalblue;'],
		[top10Names[7], top10Points[7], 'fill-color: royalblue;'],
		[top10Names[8], top10Points[8], 'fill-color: royalblue;'],
		[top10Names[9], top10Points[9], 'fill-color: royalblue;']
	]);
	//the style options for the chart
	var options = {
		'title': 'League Leaders in Points',
		//what colour the text will be for the horizontal axis
		'hAxis': {
			'textStyle': { 'color': 'white' }
		},
		//what colour the text will be for the vertical axis
		'vAxis': {
			'textStyle': { 'color': 'white' }
		},
		//what colour the text will be for the legend
		'legend': {
			'textStyle': { 'color': 'white' }
		},
		//what colour the text will be for the title
		'titleTextStyle': {
			'color': 'white'
		},
		//what colour the chart is
		'backgroundColor': {
			'fill': 'black',
			'fillOpacity': 1,
			//adding a small border
			'stroke': 'white',
			'strokeWidth': 10
		}
	};
	//actually draws the chart onto the page
	var chart = new google.visualization.BarChart(document.getElementById('chart'));
	chart.draw(data, options);
	//once the chart has been drawn, there is no need for the user to see the loading icon, so let's hide it
	hideLoading();
}

//from https://stackoverflow.com/questions/7848004/get-column-from-a-two-dimensional-array
//this function accesses just one 'column' of a 2d array and puts it into a new array, on its own
function getCol(matrix, col) {
	var column = [];
	for (var i = 0; i < matrix.length; i++) {
		column.push(matrix[i][col]);
	}
	return column;
}

//from w3schools
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
//makes the nav bar responsive when the screen is small, and the user clicks on the 'menu' icon
function responsiveNav() {
	var nav = document.getElementById("myTopnav");
	if (nav.className === "topnav") {
		nav.className += " responsive";
	} else {
		nav.className = "topnav";
	}
}

//thanks to https://stackoverflow.com/questions/40026031/google-chart-size-issue
// make chart responsive
//when the window is resized, redraw the chart so it fits the screen as it should (in the stylesheet, the chart is set to a percentage of the page, so it must be responsive to continue to be that percentage)
window.addEventListener('resize', function () {
	drawChart(chart);
}, false);