//an array of all of the teams' names
var teamNamesArray = [];
//how many times a specific API endpoint is reached
var numIterations = 0;
//whether the site has just been loaded (or is in a similar state)
var firstLoaded = true;

//from https://dev.to/vaishnavme/displaying-loading-animation-on-fetch-api-calls-1e5m
// selecting loading div
var loader = document.getElementById("loading");

// showing loading
function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some time (100 seconds)
    setTimeout(() => {
        loader.classList.remove("display");
    }, 100000);
}

// hiding loading 
function hideLoading() {
    //loader.classList.remove("display");
		loader.style.display = 'none'
}



//runs first on its own to get the team database
allTeams();



function allTeams() {
	//show the loading icon for the user
	displayLoading();
	axios.get('https://statsapi.web.nhl.com/api/v1/teams')
  .then((response) => {
		console.log("ALLTEAMS BEGIN");
		//for each team
		for (var i=0;i<response.data.teams.length;i++)
		{
			//get that team's stats
			allTeamStats(response.data.teams[i].link);
		}
		console.log("ALLTEAMS END");
	})
}
function allTeamStats(teamLink) {
	axios.get('https://statsapi.web.nhl.com/' + teamLink)
		.then((response) => {
			//we reached the endpoint
			numIterations++;
			//logs the team's name
			var teamName = response.data.teams[0].name;
			console.log("numIterations: " + numIterations);
			console.log("Team Name: " + teamName);
			//adds the team's name to the desired array
			teamNamesArray.push(teamName);		
			//if we've gone through every team
			if (numIterations==31)//there are only 31 NHL teams 
			{
				//hide the loading icon
				hideLoading();
				//create the list of team names
				createLi();
				//hide the full list of team names
				hide();
			}
		})
}

//from w3schools
function hide() {
	console.log("HIDE HIDE HIDE HIDE");
	console.log("FIRSTLOADED = " + firstLoaded);
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('searchInput');
	//if the value of the input is nothing
	if (input.value==undefined || input.value=='')
	{
		//assume the site has just loaded (or is in a similar state)
		firstLoaded = true;
	}
	//make the input all uppercase, as to not make it case-sensitive
  filter = input.value.toUpperCase();
  ul = document.getElementById("searchUl");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
	//if the search bar has been used already
	if (firstLoaded!=true)
	{
  	for (i = 0; i < li.length; i++) {
    	a = li[i].getElementsByTagName("a")[0];
    	txtValue = a.textContent || a.innerText;
			//if the user input matches a team's name
    	if (txtValue.toUpperCase().indexOf(filter) > -1) {
				//show the team
     	 li[i].style.display = "";
   	 }//if the user input does not match a team's name
			else {
				//hide that team
      	li[i].style.display = "none";
    	}
		}
	}
	//if the site has just been loaded (or is in a similar state)
	else {
		console.log("GETTING RID OF TABS");
		//hide the full list of teams from the user
		for (i = 0; i < li.length; i++) {
			li[i].style.display = "none";
		}
		//the site is no longer just loaded (or in a similar state)
		firstLoaded = false;
  }
}

//creates a list of all Nhl team names
function createLi() {
	//for every team
	for (var i=0; i<teamNamesArray.length; i++)
	{
		//a.innerHTML = allTeams();
		//make a list element
		var li = document.createElement("li");
		//create a link element
		var a = document.createElement("a");
		//make all links have the same class
		a.className = 'a1';
		//add the link to the list
		li.appendChild(a);
		//a.setAttribute("href","");
		//if the team name is not undefined (sometimes the value was undefined, so this fixes that issue)
		if (teamNamesArray[i]!=undefined)
		{
			//show the team's name on the list
			a.innerHTML = teamNamesArray[i];
			//li.setAttribute("onclick","getSearchedStats(" + a.innerHTML + ")");
		}
		//show the list
		document.getElementById("searchUl").appendChild(li);
	}
	//create an array of all link elements
	var aList = document.getElementsByTagName("a");
	for (var j=0; j<aList.length; j++)
	{
		//console.log("playerNames: " + teamNamesArray[j]);
		//if the link element is from the list (not part of the header)
		if (aList[j].className == 'a1')
		{
			//add an event listener for clicks
			aList[j].addEventListener("click",function() {
				console.log("I HAVE BEEN CLICKED");
				//start the search
				whichPlayerWasInputted(this.innerHTML);
			});
		}
	}
}

function whichPlayerWasInputted(teamInput) {
	//declare HTML elements
	var ul = document.getElementById("searchUl");
	var li = ul.getElementsByTagName("li");
	var search = document.getElementById("showPlayerSearchStats");
	//show the stats (for when they are loaded)
	search.style.display = '';
	for (var i=0; i<li.length; i++)
		{
			//hide the list of team names
			li[i].style.display = 'none';
		}
		//start the search
	allTeamsSearch(teamInput);
}

function allTeamsSearch(teamInput) {
	axios.get('https://statsapi.web.nhl.com/api/v1/teams')
  .then((response) => {
    //console.log(response.data.teams[20].link);
		//for each team
		for (var i=0;i<response.data.teams.length;i++)
		{
			//get that team's stats
			allTeamsStatsSearch(response.data.teams[i].link,teamInput);
		}
  });
}
function allTeamsStatsSearch(teamLink,teamInput) {
	axios.get('https://statsapi.web.nhl.com/' + teamLink + "?expand=team.stats")
		.then((response) => {
			//if the team's name matches the user's inputted name
			if (response.data.teams[0].name==teamInput)
			{
				//show the stats!
				document.getElementById('showPlayerSearchStats').innerHTML = teamInput + "<br>Games Played: " + (response.data.teams[0].teamStats[0].splits[0].stat.gamesPlayed) + "<br>Wins: " + (response.data.teams[0].teamStats[0].splits[0].stat.wins) + "<br>Losses: " + (response.data.teams[0].teamStats[0].splits[0].stat.losses) + "<br>Overtime Losses: " + (response.data.teams[0].teamStats[0].splits[0].stat.ot) + "<br>Points: " + (response.data.teams[0].teamStats[0].splits[0].stat.pts) + "<br>Goals For Per Game: " + (response.data.teams[0].teamStats[0].splits[0].stat.goalsPerGame) + "<br>Goals Against Per Game: " + (response.data.teams[0].teamStats[0].splits[0].stat.goalsAgainstPerGame) + "<br>Power Play: " + (response.data.teams[0].teamStats[0].splits[0].stat.powerPlayPercentage) + "%<br>Penalty Kill: " + (response.data.teams[0].teamStats[0].splits[0].stat.penaltyKillPercentage) + '%';
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