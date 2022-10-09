//an array of every current NHL player's name
var playerNamesArray = [];
//how many times the certain API endpoint is reached (how many player there are currently in the nhl)
var numIterationsPlayers = 0;
//how many times a certain API endpoint is reached, after we know how many players there are
var numIterations = 0;
//an array that stores all players' games played
var games = [];
//an array that stores all players' goal totals
var goals = [];
//an array that stores all players' assist totals
var assists = [];
//an array that stores all players' point totals
var points = [];
//an array that stores all players' names
var playerNames = [];
//an array that stores all goalies' games played
var goalieGames = [];
//an array that stores all goalies' goals against average
var gaa = [];
//an array that stores all goalies' save percentage
var save = [];
//whether or not the page was just loaded (or one of the search inputs is completely empty)
var firstLoaded = true;
//how many players there are in the NHL currently
var totalPlayers = 0;

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

//with help from w3schools
//creates a list for the first search bar
function createLi() {
	console.log("CREATELI FUNCTION");
	//for every player in the NHL
	for (var i=0; i<playerNamesArray.length; i++)
	{
		//a.innerHTML = allTeams();
		//create list elements
		var li = document.createElement("li");
		//create link elements
		//the links don't lead anywhere; this is just to help me with the styling process (from w3schools)
		var a = document.createElement("a");
		//give each link the class of 'a1'
		a.className = 'a1';
		//make each list a link
		li.appendChild(a);
		//a.setAttribute("href","");
		//if the player exists (sometimes it would load as undefined)
		if (playerNamesArray[i]!=undefined)
		{
			//make the link (and therefore, the list) show the name of the player
			a.innerHTML = playerNamesArray[i];
			//li.setAttribute("onclick","getSearchedStats(" + a.innerHTML + ")");
		}
		//add the list to the desired HTML element
		document.getElementById("myUL").appendChild(li);
	}
	//create a list of all of the link elements on the page
	var aList = document.getElementsByTagName("a");
	for (var j=0; j<aList.length; j++)
	{
		//console.log("playerNames: " + playerNamesArray[j]);
		//if the link is one that is part of a list (as to avoid adding these to the navigation links)
		if (aList[j].className == 'a1')
		{
			//add a click event listener
			aList[j].addEventListener("click",function() {
				console.log("I HAVE BEEN CLICKED COMPARE1");
				//start the API search for the player-that-has-been-clicked's stats
				getSearchedStats(this.innerHTML,1);
			});
		}
	}
}
//this is the same as above, but for the second search bar
//no need to write all of the comments again; please refer to above
function createLi2() {
		for (var i=0; i<playerNamesArray.length; i++)
	{
		//a.innerHTML = allTeams();
		var li2 = document.createElement("li");
		var a2 = document.createElement("a");
		a2.className = 'a2';
		li2.appendChild(a2);
		//a.setAttribute("href","");
		if (playerNamesArray[i]!=undefined)
		{
			a2.innerHTML = playerNamesArray[i];
		}
		document.getElementById("myUL2").appendChild(li2);
	}
	var aList2 = document.getElementsByTagName("a");
	for (var j=0; j<aList2.length; j++)
	{
		//console.log("playerNames: " + playerNamesArray[j]);
		if (aList2[j].className == "a2")
		{
			aList2[j].addEventListener("click",function() {
				console.log("I HAVE BEEN CLICKED COMPARE2");
				getSearchedStats(this.innerHTML,2);
			});
		}
	}
}

//runs first on its own to get the number of players
//the number of current NHL players is a constantly changing number
//this way, I don't have to manually re-enter the total number of players every 2 hours
allTeamsNumPlayers();
//then it runs again to load the player database and load the players into a list, and their stats into their respective lists
//i included a setTimeout for 7.5 seconds, as to avoid the API calls happening simultaneously
//if they happen at the same time, it ends the API calls prematurely, messing with the data shown on screen, which is not good
setTimeout(allTeams, 7500);


//if a function has NumPlayers at the end, it means it is used to find the total number of current NHL players
function allTeamsNumPlayers() {
	//start showing the loading icon for the user
	displayLoading();
	axios.get('https://statsapi.web.nhl.com/api/v1/teams')
  .then((response) => {
		console.log("ALLTEAMS BEGIN");
		//for every team
		for (var i=0;i<response.data.teams.length;i++)
		{
			//get the whole roster for that team
			allRostersNumPlayers(response.data.teams[i].link);
		}
		console.log("ALLTEAMS END");
	})
}
function allRostersNumPlayers(teamLink) {
	axios.get('https://statsapi.web.nhl.com/' + teamLink + "/roster")
		.then((response) => {
		console.log("ALLROSTERS BEGIN");
		//for every player
			for (var i=0;i<response.data.roster.length;i++)
			{
				//getStatsNumPlayers(response.data.roster[i].person.link);
				//add to the total player's list
				numIterationsPlayers++;
				totalPlayers = numIterationsPlayers;
				console.log("Total Players: " + totalPlayers);
				}
		console.log("ALLROSTERS END");
		})
}

//from w3schools
//for the first search bar
//this will hide the players' names that don't match the user's search input
function hide() {
	console.log("HIDE HIDE HIDE HIDE");
	console.log("FIRSTLOADED = " + firstLoaded);
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
	//if there is nothing inputted in the search bar, assume it is at the same state as if the page has just been loaded for the first time
	if (input.value==undefined || input.value=='')
	{
		firstLoaded = true;
	}
	//makes it easier to find a player's name, regardless of casing
  filter = input.value.toUpperCase();
	//getting the ul and li elements
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');
	//where the stats will be outputted
	var compare1 = document.getElementById("compareStats1");
	var compare2 = document.getElementById("compareStats2");
	//we don't want to show the stats when the user is searching for a new player
	compare1.style.display = 'none';
	compare2.style.display = 'none';

  // Loop through all list items, and hide those who don't match the search query
	//if the page has not just loaded
	if (firstLoaded!=true)
	{
		//for every player name
  	for (i = 0; i < li.length; i++) {
    	a = li[i].getElementsByTagName("a")[0];
			//get the search value inputted by the user
    	txtValue = a.textContent || a.innerText;
			//if the user value matches a player's name
    	if (txtValue.toUpperCase().indexOf(filter) > -1) {
				//keep it showing
     	 li[i].style.display = "";
   	 	}
			//if the user value does not match a player's name
			else {
				//hide it
      	li[i].style.display = "none";
    	}
		}
	}
	//if the page has just loaded (or is in a similar state)
	else {
		console.log("GETTING RID OF TABS");
		//hide all the tabs, as to not show the name of every NHL player to the user all at once
		for (i = 0; i < li.length; i++) {
			li[i].style.display = "none";
		}
		//the page has no longer just loaded
		firstLoaded = false;
  }
}

//from w3schools
//this is the same as above, just for the second search bar
//refer to above for more info
function hide2() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput2');
	if (input.value==undefined || input.value=='')
	{
		firstLoaded = true;
	}
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL2");
  li = ul.getElementsByTagName('li');
	var compare1 = document.getElementById("compareStats1");
	var compare2 = document.getElementById("compareStats2");
	compare1.style.display = 'none';
	compare2.style.display = 'none';

  // Loop through all list items, and hide those who don't match the search query
	if (firstLoaded!=true)
	{
  	for (i = 0; i < li.length; i++) {
    	a = li[i].getElementsByTagName("a")[0];
    	txtValue = a.textContent || a.innerText;
    	if (txtValue.toUpperCase().indexOf(filter) > -1) {
     	 li[i].style.display = "";
   	 } 	else {
      	li[i].style.display = "none";
    	}
		}
	}
	else {
		console.log("GETTING RID OF TABS");
		for (i = 0; i < li.length; i++) {
			li[i].style.display = "none";
		}
		firstLoaded = false;
  }
}

//this is the API calling for the storing of data into my arrays
function allTeams() {
	axios.get('https://statsapi.web.nhl.com/api/v1/teams')
  .then((response) => {
		console.log("ALLTEAMS BEGIN");
		//for every team
		for (var i=0;i<response.data.teams.length;i++)
		{
			//get that team's roster
			allRosters(response.data.teams[i].link);
		}
		console.log("ALLTEAMS END");
	})
}
function allRosters(teamLink) {
	axios.get('https://statsapi.web.nhl.com/' + teamLink + "/roster")
		.then((response) => {
		console.log("ALLROSTERS BEGIN");
		//for every player
			for (var i=0;i<response.data.roster.length;i++)
			{
				//we have gone to get a player's name
				numIterations++;
				//get that player's name
				var names = response.data.roster[i].person.fullName;
				//add the player's name to the desired array
				//playerNamesArray.push(playerName);		
				playerNamesArray.push(names);	
				//if this is the last player to go through
				if (numIterations==totalPlayers)
				{
					//hide the loading icon
					hideLoading();
					//create the lists for the user to see
					createLi();
					createLi2();
					//hide the full list of players
					hide();
					hide2();
				}
			}
		console.log("ALLROSTERS END");
		})
}

//when the user clicks on a player's name from the list, it brings you here
function getSearchedStats(playerSearchName,whichCompare) {
	//whichCompare is whether this was from the first or second search bar
	console.log("whichCompare: " + whichCompare);
	//get the desired HTML elements
	var ul1 = document.getElementById("myUL");
	var ul2 = document.getElementById("myUL2");
	var li1 = ul1.getElementsByTagName("li");
	var li2 = ul2.getElementsByTagName("li");

	//where the stats will be shown
	var compare1 = document.getElementById("compareStats1");
	var compare2 = document.getElementById("compareStats2");
	//display the stats
	compare1.style.display = '';
	compare2.style.display = '';
	//if it is the first search bar's list
	if (whichCompare==1)
	{
		//hide the rest of the list
		for (var i=0; i<li1.length; i++)
		{
			li1[i].style.display = 'none';
		}
	}
	//if it is the second search bar's list
	else if (whichCompare==2)
	{
		//hide the rest of the list
		for (var i=0; i<li2.length; i++)
		{
			li2[i].style.display = 'none';
		}
	}
	console.log("playerSearchName: " + playerSearchName);
	//time to search for that player and his stats
	allTeamsSearch(playerSearchName,whichCompare);
}

//all functions with 'search' at the end means we are looking for a specific player's stats
function allTeamsSearch(playerSearchName,whichCompare) {
	axios.get('https://statsapi.web.nhl.com/api/v1/teams')
  .then((response) => {
		console.log("GOT TO ALLTEAMSSEARCH");
		//for every team
		for (var i=0;i<response.data.teams.length;i++)
		{
			//go to their roster
			allRostersSearch(response.data.teams[i].link,playerSearchName,whichCompare);
		}
	})
}
function allRostersSearch(teamLink,playerSearchName,whichCompare) {
	axios.get('https://statsapi.web.nhl.com/' + teamLink + "/roster")
		.then((response) => {
		console.log("GOT TO ALLROSTERSSEARCH");
		//for every player
			for (var i=0;i<response.data.roster.length;i++)
			{
				//log the player's name
				var names = response.data.roster[i].person.fullName;
				//console.log("names: " + names + "\tplayerSearchName: " + playerSearchName);
				//if the name matches the player's name that the user wanted
				if (names.localeCompare(playerSearchName)==0)
				{
					//get that player's stats
					getStatsSearch(response.data.roster[i].person.link,names,whichCompare);
				}
			}
		})
}
function getStatsSearch(playerLink,playerName,whichCompare) {
	axios.get('https://statsapi.web.nhl.com/' + playerLink + '/stats?stats=statsSingleSeason&season=20222023')
		.then((response) => {
			console.log("GOT TO GETSTATSSEARCH");
			//if it is for the first search bar
			if (whichCompare==1)
			{
				//log the player's name
				playerNames[0] = playerName;
				//if the player is a skater (and not a goalie)
				if (response.data.stats[0].splits[0].stat.goals!=undefined)
				{
					//log their stats
					games[0] = response.data.stats[0].splits[0].stat.games;
					goals[0] = response.data.stats[0].splits[0].stat.goals;
					assists[0] = response.data.stats[0].splits[0].stat.assists;
					points[0] = response.data.stats[0].splits[0].stat.points;
				}
				//if the player is a goalie
				else
				{
					//log their stats
					goals[0] = undefined;
					goalieGames[0] = response.data.stats[0].splits[0].stat.games;
					gaa[0] = response.data.stats[0].splits[0].stat.goalAgainstAverage;
					save[0] = response.data.stats[0].splits[0].stat.savePercentage;
				}
			}
			//the same as above, but for the second search bar
			else if (whichCompare==2)
			{
				playerNames[1] = playerName;
				if (response.data.stats[0].splits[0].stat.goals!=undefined)
				{
					games[1] = response.data.stats[0].splits[0].stat.games;
					goals[1] = response.data.stats[0].splits[0].stat.goals;
					assists[1] = response.data.stats[0].splits[0].stat.assists;
					points[1] = response.data.stats[0].splits[0].stat.points;
				}
				else
				{
					goals[1] = undefined;
					goalieGames[1] = response.data.stats[0].splits[0].stat.games;
					gaa[1] = response.data.stats[0].splits[0].stat.goalAgainstAverage;
					save[1] = response.data.stats[0].splits[0].stat.savePercentage;
				}
			}
			//i decided to colour the stats, as to more easily show who the better player was when comparing two players
			//green means better, red means worse, yellow means the same
			//how to get the colours onto the page from https://stackoverflow.com/questions/31719391/how-to-change-colour-of-text-when-using-document-getelementbyidid-innerhtml
			//if a player has played more games, there are better (in my opinion)
				if (games[0]>games[1])
				{
					var gamesText1 = 'green';
					var gamesText2 = 'red';
				}
				else if (games[0]<games[1])
				{
					var gamesText1 = 'red';
					var gamesText2 = 'green';
				}
				else
				{
					var gamesText1 = 'yellow';
					var gamesText2 = 'yellow';
				}
				//the player that scored more goals is better
				if (goals[0]>goals[1])
				{
					var goalsText1 = 'green';
					var goalsText2 = 'red';
				}
				else if (goals[0]<goals[1])
				{
					var goalsText1 = 'red';
					var goalsText2 = 'green';
				}
				else
				{
					var goalsText1 = 'yellow';
					var goalsText2 = 'yellow';
				}
				//the player that scored more assists is better
				if (assists[0]>assists[1])
				{
					var assistsText1 = 'green';
					var assistsText2 = 'red';
				}
				else if (assists[0]<assists[1])
				{
					var assistsText1 = 'red';
					var assistsText2 = 'green';
				}
				else
				{
					var assistsText1 = 'yellow';
					var assistsText2 = 'yellow';
				}
				//the player that scored more points is better
				if (points[0]>points[1])
				{
					var pointsText1 = 'green';
					var pointsText2 = 'red';
				}
				else if (points[0]<points[1])
				{
					var pointsText1 = 'red';
					var pointsText2 = 'green';
				}
				else
				{
					var pointsText1 = 'yellow';
					var pointsText2 = 'yellow';
				}
				//the goalie that played more games is better (in my opinion)
				if (goalieGames[0]>goalieGames[1])
				{
					var goalieGamesText1 = 'green';
					var goalieGamesText2 = 'red';
				}
				else if (goalieGames[0]<goalieGames[1])
				{
					var goalieGamesText1 = 'red';
					var goalieGamesText2 = 'green';
				}
				else
				{
					var goalieGamesText1 = 'yellow';
					var goalieGamesText2 = 'yellow';
				}
				//the goalie with a smaller GAA is better
				if (gaa[0]<gaa[1])
				{
					var gaaText1 = 'green';
					var gaaText2 = 'red';
				}
				else if (gaa[0]>gaa[1])
				{
					var gaaText1 = 'red';
					var gaaText2 = 'green';
				}
				else
				{
					var gaaText1 = 'yellow';
					var gaaText2 = 'yellow';
				}
				//the goalie with a higher save percentage is better
				if (save[0]>save[1])
				{
					var saveText1 = 'green';
					var saveText2 = 'red';
				}
				else if (save[0]<save[1])
				{
					var saveText1 = 'red';
					var saveText2 = 'green';
				}
				else
				{
					var saveText1 = 'yellow';
					var saveText2 = 'yellow';
				}
				//where the stats will be shown
				var compare1 = document.getElementById("compareStats1");
				var compare2 = document.getElementById("compareStats2");
				//if a player from the first search bar has been clicked at least once
				if (playerNames[0]!=undefined)
				{
					//if the player is a skater
					if (goals[0]!=undefined)
					{
						//show their stats with cool colours :D
						compare1.innerHTML = playerNames[0] + "<br>Games Played: <span style='color: " + gamesText1 + " '>" + games[0] + "</span><br>Goals: <span style='color: " + goalsText1 + " '>" + goals[0] + "</span><br>Assists: <span style='color: " + assistsText1 + " '>" + assists[0] + "</span><br>Points: <span style='color: " + pointsText1 + " '>" + points[0] + "</span>";
					}
					//if they are a goalie
					else
					{
						//show their stats with cool colours :D
						compare1.innerHTML = playerNames[0] + "<br>Games: <span style='color: " + goalieGamesText1 + " '>" + goalieGames[0] + "</span><br>GAA (Goals Against Average): <span style='color: " + gaaText1 + " '>" + gaa[0] + "</span><br>Save Percentage: <span style='color: " + saveText1 + " '>" + save[0] + "</span>";
					}
				}
				//the same as above, but for the second search bar
				if (playerNames[1]!=undefined)
				{
					if (goals[1]!=undefined)
					{
						compare2.innerHTML = playerNames[1] + "<br>Games Played: <span style='color: " + gamesText2 + " '>" + games[1] + "</span><br>Goals: <span style='color: " + goalsText2 + " '>" + goals[1] + "</span><br>Assists: <span style='color: " + assistsText2 + " '>" + assists[1] + "</span><br>Points: <span style='color: " + pointsText2 + " '>" + points[1] + "</span>";
					}
					else
					{
						compare2.innerHTML = playerNames[1] + "<br>Games: <span style='color: " + goalieGamesText2 + " '>" + goalieGames[1] + "</span><br>GAA (Goals Against Average): <span style='color: " + gaaText2 + " '>" + gaa[1] + "</span><br>Save Percentage: <span style='color: " + saveText2 + " '>" + save[1] + "</span>";
					}
				}
		})
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