//the array to hold stats for the 'clutch stats'
var clutchArray = [];
//the array to hold stats for the 'special teams stats'
var specialArray = [];
//the array to hold stats for the 'offensive stats'
var offensiveArray = [];
//the array to hold stats for the 'most Gentlemanly stats'
var gentleArray = [];
//the array to hold stats for the 'defensive stats'
var defensiveArray = [];
//the array to hold stats for the 'fantasy league stats'
var fantasyArray = [];
//the names of the top 10 players for all of these stats (this array is constantly changing, depending on which data set is being looked at)
var top10Names = [];
//a filtered array for clutch stats
var top10GWG = [];
//a filtered array for special teams stats
var top10Special = [];
//a filtered array for offensive stats
var top10Offensive = [];
//a filtered array for Gentlemanly stats
var top10Gentle = [];
//a filtered array for defensive stats
var top10Defensive = [];
//a filtered array for fantasy stats
var top10Fantasy = [];
//whether the clutch stats should be shown in a chart or not
var clutchTable = false;
//whether the special teams stats should be shown in a chart or not
var specialTable = false;
//whether the offensive stats should be shown in a chart or not
var offensiveTable = false;
//whether the Gentlemanly stats should be shown in a chart or not
var gentleTable = false;
//whether the defensive stats should be shown in a chart or not
var defensiveTable = false;
//whether the fantasy stats should be shown in a chart or not
var fantasyTable = false;


//from https://dev.to/vaishnavme/displaying-loading-animation-on-fetch-api-calls-1e5m
// selecting loading div
var loader = document.getElementById("loading");

// showing loading
function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 100000);
}

// hiding loading 
function hideLoading() {
    //loader.classList.remove("display");
		loader.style.display = 'none'
}

//resets all of the arrays
function reset() {
clutchArray = [];
specialArray = [];
offensiveArray = [];
gentleArray = [];
defensiveArray = [];
fantasyArray = [];
top10GWG = [];
top10Names = [];
top10Special = [];
top10Offensive = [];
top10Gentle = [];
top10Defensive = [];
top10Fantasy = [];
}

//when the first button is clicked
function clutchPlayer() {
	reset();
	//start searching for stats
	allTeams('clutch');
}
//when the second button is clicked
function specialTeams() {
	reset();
	//start searching for stats
	allTeams('specialTeams');
}
//when the third button is clicked
function offensive() {
	reset();
	//start searching for stats
	allTeams('offensive');
}
//when the fourth button is clicked
function gentle() {
	reset();
	//start searching for stats
	allTeams('gentle');
}
//when the fifth button is clicked
function defensive() {
	reset();
	//start searching for stats
	allTeams('defensive');
}
//when the sixth button is clicked
function fantasy() {
	reset();
	//start searching for stats
	allTeams('fantasy');
}

//the hub for starting a stat search
function allTeams(funStat) {
	//start showing the loading icon
	displayLoading();
	axios.get('https://statsapi.web.nhl.com/api/v1/teams')
  .then((response) => {
    //console.log(response.data.teams[20].link);
		//for each team
		for (var i=0;i<response.data.teams.length;i++)
		{
			//if the user wants clutch stats
			if (funStat=='clutch')
			{
				allRostersClutch(response.data.teams[i].link);
			}
			//if the user wants special teams stats
			else if (funStat=='specialTeams')
			{
				allRostersSpecial(response.data.teams[i].link);
			}
			//if the user wants offensive stats
			else if (funStat=='offensive')
			{
				allRostersOffensive(response.data.teams[i].link);
			}
			//if the user wants Gentlemanly stats
			else if (funStat=='gentle')
			{
				allRostersGentle(response.data.teams[i].link);
			}
			//if the user wants defensive stats
			else if (funStat=='defensive')
			{
				allRostersDefensive(response.data.teams[i].link);
			}
			else if (funStat=='fantasy')
			{
				allRostersFantasy(response.data.teams[i].link);
			}
		}
  });
}
function allRostersClutch(teamLink) {
	axios.get('https://statsapi.web.nhl.com/' + teamLink + "/roster")
		.then((response) => {
			//for every player
			for (var i=0;i<response.data.roster.length;i++)
			{
				//log their name
				var names = response.data.roster[i].person.fullName;
				//get their stats
				getClutchStats(response.data.roster[i].person.link,names);
			}
		})
}
function allRostersSpecial(teamLink) {
	axios.get('https://statsapi.web.nhl.com/' + teamLink + "/roster")
		.then((response) => {
			//same as above
			for (var i=0;i<response.data.roster.length;i++)
			{
				var names = response.data.roster[i].person.fullName;
				getSpecialTeams(response.data.roster[i].person.link,names);
			}
		})
}
function allRostersOffensive(teamLink) {
	axios.get('https://statsapi.web.nhl.com/' + teamLink + "/roster")
		.then((response) => {
			//same as above
			for (var i=0;i<response.data.roster.length;i++)
			{
				var names = response.data.roster[i].person.fullName;
				getOffensive(response.data.roster[i].person.link,names);
			}
		})
}
function allRostersGentle(teamLink) {
	axios.get('https://statsapi.web.nhl.com/' + teamLink + "/roster")
		.then((response) => {
			//same as above
			for (var i=0;i<response.data.roster.length;i++)
			{
				var names = response.data.roster[i].person.fullName;
				getGentle(response.data.roster[i].person.link,names);
			}
		})
}
function allRostersDefensive(teamLink) {
	axios.get('https://statsapi.web.nhl.com/' + teamLink + "/roster")
		.then((response) => {
			//same as above
			for (var i=0;i<response.data.roster.length;i++)
			{
				var names = response.data.roster[i].person.fullName;
				getDefensive(response.data.roster[i].person.link,names);
			}
		})
}
function allRostersFantasy(teamLink) {
	axios.get('https://statsapi.web.nhl.com/' + teamLink + "/roster")
		.then((response) => {
			//same as above
			for (var i=0;i<response.data.roster.length;i++)
			{
				var names = response.data.roster[i].person.fullName;
				getFantasy(response.data.roster[i].person.link,names);
			}
		})
}
function getClutchStats(playerLink,playerName) {
	axios.get('https://statsapi.web.nhl.com/' + playerLink + '/stats?stats=statsSingleSeason&season=20212022')
		.then((response) => {
			//playerNameArray.push(playerName);
			//playerPointsArray.push(response.data.stats[0].splits[0].stat.points);
			//if the player is a skater
			if (response.data.stats[0].splits[0].stat.points!=undefined)
			{
				//add their name and stats to the desired array
				clutchArray.push([playerName,response.data.stats[0].splits[0].stat.gameWinningGoals]);
				//sort the array
				clutchArray.sort(numberSort);
			}
				//filter the array to only the top 10 players
				top10 = clutchArray.filter(filterTop10);
				//separate the 2d array into 2 single arrays
				top10Names = getCol(top10, 0)
				top10GWG = getCol(top10, 1);
			  //document.getElementById("showFunStats").innerHTML = top10;
				//we want to show the clutch stats only
			  	fantasyTable = false;
				clutchTable = true;
				specialTable = false;
				offensiveTable = false;
				gentleTable = false;
				defensiveTable = false;
				//load the google chart
				google.charts.load('current', {'packages':['corechart']});
				google.charts.setOnLoadCallback(drawChartGWG);
		})
}
function getSpecialTeams(playerLink,playerName) {
	axios.get('https://statsapi.web.nhl.com/' + playerLink + '/stats?stats=statsSingleSeason&season=20212022')
		.then((response) => {
			//the same as above
			//playerNameArray.push(playerName);
			//playerPointsArray.push(response.data.stats[0].splits[0].stat.points);
			if (response.data.stats[0].splits[0].stat.points!=undefined)
			{
				var shorthanded = response.data.stats[0].splits[0].stat.shortHandedTimeOnIcePerGame;
				var timeShort = shorthanded.split(":");
				var secondsShort = (parseInt(timeShort[0])*60) + (parseInt(timeShort[1]));

				var powerplay = response.data.stats[0].splits[0].stat.powerPlayTimeOnIcePerGame;
				var timePower = powerplay.split(":");
				var secondsPower = (parseInt(timePower[0])*60) + (parseInt(timePower[1]));
				specialArray.push([playerName,secondsShort+secondsPower]);
				specialArray.sort(numberSort);
			}
				top10 = specialArray.filter(filterTop10);
				top10Names = getCol(top10, 0)
				top10Special = getCol(top10, 1);
			  //document.getElementById("showFunStats").innerHTML = top10;
			  	fantasyTable = false;
				 specialTable = true;
				 clutchTable = false;
				 offensiveTable = false;
			   gentleTable = false;
				 defensiveTable = false;
				google.charts.load('current', {'packages':['corechart']});
				google.charts.setOnLoadCallback(drawChartSpecial);
		})
}
function getOffensive(playerLink,playerName) {
	axios.get('https://statsapi.web.nhl.com/' + playerLink + '/stats?stats=statsSingleSeason&season=20212022')
		.then((response) => {
			//the same as above
			//playerNameArray.push(playerName);
			//playerPointsArray.push(response.data.stats[0].splits[0].stat.points);
			if (response.data.stats[0].splits[0].stat.points!=undefined)
			{
				var gamesPlayed = response.data.stats[0].splits[0].stat.games;
				if (gamesPlayed>4)
				{
					var points = response.data.stats[0].splits[0].stat.points;
					offensiveArray.push([playerName,points/gamesPlayed]);
					offensiveArray.sort(numberSort);
				}
			}
				top10 = offensiveArray.filter(filterTop10);
				top10Names = getCol(top10, 0)
				top10Offensive = getCol(top10, 1);
			  //document.getElementById("showFunStats").innerHTML = top10;
			  	fantasyTable = false;
				offensiveTable = true;
				clutchTable = false;
				specialTable = false;
				gentleTable = false;
				defensiveTable = false;
				google.charts.load('current', {'packages':['corechart']});
				google.charts.setOnLoadCallback(drawChartOffensive);
		})
}
function getGentle(playerLink,playerName) {
	axios.get('https://statsapi.web.nhl.com/' + playerLink + '/stats?stats=statsSingleSeason&season=20212022')
		.then((response) => {
			//the same as above
			//playerNameArray.push(playerName);
			//playerPointsArray.push(response.data.stats[0].splits[0].stat.points);
			if (response.data.stats[0].splits[0].stat.points!=undefined)
			{
				var gamesPlayed = response.data.stats[0].splits[0].stat.games;
				if (gamesPlayed>4)
				{
					var pimString = response.data.stats[0].splits[0].stat.penaltyMinutes;
					var pim = parseInt(pimString);
					var points = response.data.stats[0].splits[0].stat.points;
					//console.log(points/pim);
					if (points/pim == Infinity)
					{
						gentleArray.push([playerName,points]);
					}
					else 
					{
						gentleArray.push([playerName,points/pim]);
					}
					gentleArray.sort(numberSort);
				}
			}
				top10 = gentleArray.filter(filterTop10);
				top10Names = getCol(top10, 0)
				top10Gentle = getCol(top10, 1);
			  //document.getElementById("showFunStats").innerHTML = top10;
			  	fantasyTable = false;
				gentleTable = true;
				clutchTable = false;
				specialTable = false;
				offensiveTable = false;
				defensiveTable = false;
				google.charts.load('current', {'packages':['corechart']});
				google.charts.setOnLoadCallback(drawChartGentle);
		})
}
function getDefensive(playerLink,playerName) {
	axios.get('https://statsapi.web.nhl.com/' + playerLink + '/stats?stats=statsSingleSeason&season=20212022')
		.then((response) => {
			//the same as above
			//playerNameArray.push(playerName);
			//playerPointsArray.push(response.data.stats[0].splits[0].stat.points);
			if (response.data.stats[0].splits[0].stat.points!=undefined)
			{
				var gamesPlayed = response.data.stats[0].splits[0].stat.games;
				var blocked = response.data.stats[0].splits[0].stat.blocked;
				var plusMinus = response.data.stats[0].splits[0].stat.plusMinus;
				var hits = response.data.stats[0].splits[0].stat.hits;
				var toiString = response.data.stats[0].splits[0].stat.timeOnIcePerGame;
				var toiArray = toiString.split(":");
				var toi = (parseInt(toiArray[0])*60) + (parseInt(toiArray[1]));
				if (gamesPlayed>4)
				{
					defensiveArray.push([playerName,(blocked+(plusMinus*0.5)+(hits/10)+(toi/250))/gamesPlayed]);
				}
				defensiveArray.sort(numberSort);
			}
				top10 = defensiveArray.filter(filterTop10);
				top10Names = getCol(top10, 0)
				top10Defensive = getCol(top10, 1);
			  //document.getElementById("showFunStats").innerHTML = top10;
			  	fantasyTable = false;
				defensiveTable = true;
				clutchTable = false;
				specialTable = false;
				offensiveTable = false;
				gentleTable = false;
				google.charts.load('current', {'packages':['corechart']});
				google.charts.setOnLoadCallback(drawChartDefensive);
		})
}
function getFantasy(playerLink,playerName) {
	axios.get('https://statsapi.web.nhl.com/' + playerLink + '/stats?stats=statsSingleSeason&season=20212022')
		.then((response) => {
			//the same as above
			//playerNameArray.push(playerName);
			//playerPointsArray.push(response.data.stats[0].splits[0].stat.points);
			if (response.data.stats[0].splits[0].stat.points!=undefined)
			{
				var gamesPlayed = response.data.stats[0].splits[0].stat.games;
				var goals = response.data.stats[0].splits[0].stat.goals;
				var assists = response.data.stats[0].splits[0].stat.assists;
				var plusMinus = response.data.stats[0].splits[0].stat.plusMinus;
				var pim = response.data.stats[0].splits[0].stat.pim;
				var ppp = response.data.stats[0].splits[0].stat.powerPlayPoints;
				var shp = response.data.stats[0].splits[0].stat.shortHandedPoints;
				var shots = response.data.stats[0].splits[0].stat.shots;
				var faceoffPerc = response.data.stats[0].splits[0].stat.faceOffPct;
				var shifts = response.data.stats[0].splits[0].stat.shifts;
				var faceoffWon = faceoffPerc*shifts;
				var hits = response.data.stats[0].splits[0].stat.hits;
				var blocked = response.data.stats[0].splits[0].stat.blocked;
				if (gamesPlayed>4)
				{
					fantasyArray.push([playerName,(goals*5)+(assists*3)+(plusMinus)+(pim*0.5)+(ppp*2)+(shp*4)+(shots*0.9)+(hits)+(blocked)]);
				}
				fantasyArray.sort(numberSort);
			}
				top10 = fantasyArray.filter(filterTop10);
				top10Names = getCol(top10, 0)
				top10Fantasy = getCol(top10, 1);
			  //document.getElementById("showFunStats").innerHTML = top10;
			  	fantasyTable = true;
				defensiveTable = false;
				clutchTable = false;
				specialTable = false;
				offensiveTable = false;
				gentleTable = false;
				google.charts.load('current', {'packages':['corechart']});
				google.charts.setOnLoadCallback(drawChartFantasy);
		})
}
//sorts a 2d array by the second value
function numberSort(col1, col2) {
	//thanks to https://stackoverflow.com/questions/16096872/how-to-sort-2-dimensional-array-by-column-value
  return col2[1] - col1[1];
}
//a simple top 10 filter
function filterTop10(value,index,array) {
	return index<10;
}

//draws the chart for the clutch stats
function drawChartGWG() {
	var data = google.visualization.arrayToDataTable([
		//loads the data into the chart
  ['Player Name', 'Number of Game Winning Goals', { role: 'style' }],
  [top10Names[0], top10GWG[0], 'fill-color: goldenrod;'],
	[top10Names[1], top10GWG[1], 'fill-color: silver;'],
	[top10Names[2], top10GWG[2], 'fill-color: sienna;'],
	[top10Names[3], top10GWG[3], 'fill-color: royalblue;'] ,
	[top10Names[4], top10GWG[4], 'fill-color: royalblue;'],
	[top10Names[5], top10GWG[5], 'fill-color: royalblue;'],
	[top10Names[6], top10GWG[6], 'fill-color: royalblue;'],
	[top10Names[7], top10GWG[7], 'fill-color: royalblue;'],
	[top10Names[8], top10GWG[8], 'fill-color: royalblue;'],
	[top10Names[9], top10GWG[9], 'fill-color: royalblue;']
	]);
	//all of the text styling, as well as the chart's colour
	var options = {'title':'Most Clutch Players',
	//the text colour for the horizontal axis
	'hAxis': {
    'textStyle':{'color': 'white'}
	},
	//the text colour for the vertical axis
	'vAxis': {
    'textStyle':{'color': 'white'}
	},
	//the text colour for the legend
	'legend': {
		'textStyle':{'color': 'white'}
	},
	//the text colour for the title axis
	'titleTextStyle': {
		'color': 'white'
	},
	//'width':'10%',
	//'height':'50%',
	//sets the colour of the chart to black
	'backgroundColor': {
		'fill': 'black',
		'fillOpacity': 1,
		//a little border to make it pop
		'stroke': 'white',
		'strokeWidth': 10
		}
	};
	//draws the chart
	var chart = new google.visualization.BarChart(document.getElementById('chart'));
  chart.draw(data, options);
	//hides the loading icon
	hideLoading();
}
//draws the chart for the special teams stats
//refer to above for more info
function drawChartSpecial() {
	var data = google.visualization.arrayToDataTable([
  ['Player Name', 'Seconds On Ice per Game for Special Teams', { role: 'style' }],
  [top10Names[0], top10Special[0], 'fill-color: goldenrod;'],
	[top10Names[1], top10Special[1], 'fill-color: silver;'],
	[top10Names[2], top10Special[2], 'fill-color: sienna;'],
	[top10Names[3], top10Special[3], 'fill-color: royalblue;'] ,
	[top10Names[4], top10Special[4], 'fill-color: royalblue;'],
	[top10Names[5], top10Special[5], 'fill-color: royalblue;'],
	[top10Names[6], top10Special[6], 'fill-color: royalblue;'],
	[top10Names[7], top10Special[7], 'fill-color: royalblue;'],
	[top10Names[8], top10Special[8], 'fill-color: royalblue;'],
	[top10Names[9], top10Special[9], 'fill-color: royalblue;']
	]);
	var options = {'title':'Best Special Teams Players',
	'hAxis': {
    'textStyle':{'color': 'white'}
	},
	'vAxis': {
    'textStyle':{'color': 'white'}
	},
	'legend': {
		'textStyle':{'color': 'white'}
	},
	'titleTextStyle': {
		'color': 'white'
	},
	//'width':'10%',
	//'height':'50%',
	'backgroundColor': {
		'fill': 'black',
		'fillOpacity': 1,
		'stroke': 'white',
		'strokeWidth': 10
		}
	};
	var chart = new google.visualization.BarChart(document.getElementById('chart'));
  chart.draw(data, options);
	hideLoading();
}
//draws the chart for the offensive stats
//refer to above for more info
function drawChartOffensive() {
	var data = google.visualization.arrayToDataTable([
  ['Player Name', 'Points Per Game', { role: 'style' }],
  [top10Names[0], top10Offensive[0], 'fill-color: goldenrod;'],
	[top10Names[1], top10Offensive[1], 'fill-color: silver;'],
	[top10Names[2], top10Offensive[2], 'fill-color: sienna;'],
	[top10Names[3], top10Offensive[3], 'fill-color: royalblue;'] ,
	[top10Names[4], top10Offensive[4], 'fill-color: royalblue;'],
	[top10Names[5], top10Offensive[5], 'fill-color: royalblue;'],
	[top10Names[6], top10Offensive[6], 'fill-color: royalblue;'],
	[top10Names[7], top10Offensive[7], 'fill-color: royalblue;'],
	[top10Names[8], top10Offensive[8], 'fill-color: royalblue;'],
	[top10Names[9], top10Offensive[9], 'fill-color: royalblue;']
	]);
	var options = {'title':'Best Offensive Players',
	'hAxis': {
    'textStyle':{'color': 'white'}
	},
	'vAxis': {
    'textStyle':{'color': 'white'}
	},
	'legend': {
		'textStyle':{'color': 'white'}
	},
	'titleTextStyle': {
		'color': 'white'
	},
	//'width':'10%',
	//'height':'50%',
	'backgroundColor': {
		'fill': 'black',
		'fillOpacity': 1,
		'stroke': 'white',
		'strokeWidth': 10
		}
	};
	var chart = new google.visualization.BarChart(document.getElementById('chart'));
  chart.draw(data, options);
	hideLoading();
}
//draws the chart for the Gentlemanly stats
//refer to above for more info
function drawChartGentle() {
	var data = google.visualization.arrayToDataTable([
  ['Player Name', 'Points per Penalty Minutes', { role: 'style' }],
  [top10Names[0], top10Gentle[0], 'fill-color: goldenrod;'],
	[top10Names[1], top10Gentle[1], 'fill-color: silver;'],
	[top10Names[2], top10Gentle[2], 'fill-color: sienna;'],
	[top10Names[3], top10Gentle[3], 'fill-color: royalblue;'] ,
	[top10Names[4], top10Gentle[4], 'fill-color: royalblue;'],
	[top10Names[5], top10Gentle[5], 'fill-color: royalblue;'],
	[top10Names[6], top10Gentle[6], 'fill-color: royalblue;'],
	[top10Names[7], top10Gentle[7], 'fill-color: royalblue;'],
	[top10Names[8], top10Gentle[8], 'fill-color: royalblue;'],
	[top10Names[9], top10Gentle[9], 'fill-color: royalblue;']
	]);
	var options = {'title':'Most Gentlemanly Players',
	'hAxis': {
    'textStyle':{'color': 'white'}
	},
	'vAxis': {
    'textStyle':{'color': 'white'}
	},
	'legend': {
		'textStyle':{'color': 'white'}
	},
	'titleTextStyle': {
		'color': 'white'
	},
	//'width':'10%',
	//'height':'50%',
	'backgroundColor': {
		'fill': 'black',
		'fillOpacity': 1,
		'stroke': 'white',
		'strokeWidth': 10
		}
	};
	var chart = new google.visualization.BarChart(document.getElementById('chart'));
  chart.draw(data, options);
	hideLoading();
}
//draws the chart for the defensive stats
//refer to above for more info
function drawChartDefensive() {
	var data = google.visualization.arrayToDataTable([
  ['Player Name', "Defensive 'Points'", { role: 'style' }],
  [top10Names[0], top10Defensive[0], 'fill-color: goldenrod;'],
	[top10Names[1], top10Defensive[1], 'fill-color: silver;'],
	[top10Names[2], top10Defensive[2], 'fill-color: sienna;'],
	[top10Names[3], top10Defensive[3], 'fill-color: royalblue;'] ,
	[top10Names[4], top10Defensive[4], 'fill-color: royalblue;'],
	[top10Names[5], top10Defensive[5], 'fill-color: royalblue;'],
	[top10Names[6], top10Defensive[6], 'fill-color: royalblue;'],
	[top10Names[7], top10Defensive[7], 'fill-color: royalblue;'],
	[top10Names[8], top10Defensive[8], 'fill-color: royalblue;'],
	[top10Names[9], top10Defensive[9], 'fill-color: royalblue;']
	]);
	var options = {'title':'Best Defensive Players',
	'hAxis': {
    'textStyle':{'color': 'white'}
	},
	'vAxis': {
    'textStyle':{'color': 'white'}
	},
	'legend': {
		'textStyle':{'color': 'white'}
	},
	'titleTextStyle': {
		'color': 'white'
	},
	//'width':'10%',
	//'height':'50%',
	'backgroundColor': {
		'fill': 'black',
		'fillOpacity': 1,
		'stroke': 'white',
		'strokeWidth': 10
		}
	};
	var chart = new google.visualization.BarChart(document.getElementById('chart'));
  chart.draw(data, options);
	hideLoading();
}
//draws the chart for the fantasy stats
//refer to above for more info
function drawChartFantasy() {
	var data = google.visualization.arrayToDataTable([
  ['Player Name', "Fantasy Points", { role: 'style' }],
  [top10Names[0], top10Fantasy[0], 'fill-color: goldenrod;'],
	[top10Names[1], top10Fantasy[1], 'fill-color: silver;'],
	[top10Names[2], top10Fantasy[2], 'fill-color: sienna;'],
	[top10Names[3], top10Fantasy[3], 'fill-color: royalblue;'] ,
	[top10Names[4], top10Fantasy[4], 'fill-color: royalblue;'],
	[top10Names[5], top10Fantasy[5], 'fill-color: royalblue;'],
	[top10Names[6], top10Fantasy[6], 'fill-color: royalblue;'],
	[top10Names[7], top10Fantasy[7], 'fill-color: royalblue;'],
	[top10Names[8], top10Fantasy[8], 'fill-color: royalblue;'],
	[top10Names[9], top10Fantasy[9], 'fill-color: royalblue;']
	]);
	var options = {'title':'Best Fantasy Players',
	'hAxis': {
    'textStyle':{'color': 'white'}
	},
	'vAxis': {
    'textStyle':{'color': 'white'}
	},
	'legend': {
		'textStyle':{'color': 'white'}
	},
	'titleTextStyle': {
		'color': 'white'
	},
	//'width':'10%',
	//'height':'50%',
	'backgroundColor': {
		'fill': 'black',
		'fillOpacity': 1,
		'stroke': 'white',
		'strokeWidth': 10
		}
	};
	var chart = new google.visualization.BarChart(document.getElementById('chart'));
  chart.draw(data, options);
	hideLoading();
}

//from https://stackoverflow.com/questions/7848004/get-column-from-a-two-dimensional-array
//gets a single 'column' of a 2d array and puts it into a single array
function getCol(matrix, col){
  var column = [];
  for(var i=0; i<matrix.length; i++){
    column.push(matrix[i][col]);
   }
  return column;
}


//from w3schools
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
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
  window.addEventListener('resize', function () {
		//re-draws the desired chart only
		if (clutchTable==true)
		{
			drawChartGWG(chart);
		}
		else if (clutchTable==false && specialTable==true)
		{
			drawChartSpecial(chart);
		}
		else if (clutchTable==false && offensiveTable==true)
		{
			drawChartOffensive(chart);
		}
		else if (clutchTable==false && gentleTable==true)
		{
			drawChartGentle(chart);
		}
		else if (clutchTable==false && defensiveTable==true)
		{
			drawChartDefensive(chart);
		}
		else if (defensiveTable==false && fantasyTable==true)
		{
			drawChartFantasy(chart);
		}
		else
		{
			//console.log("THIS DIDNT WORK");
		}
  }, false);
