var allPlayers = [];
var allTeams = [];
var deadPlayers = [];

class Team {
	constructor(name, id, schedule) {
		this.name = name;
		this.id = id;
		this.schedule = schedule;
	}
}

class Player {
	constructor(name, id, position, goals, assists, gamesPlayed, pim, shots, blocks, hits, faceoffPct, shifts, ppp, shp, plusMinus) {
		this.name = name;
		this.id = id;
		this.position = position;
		this.goals = goals;
		this.assists = assists;
		this.gamesPlayed = gamesPlayed;
		this.pim = pim;
		this.shots = shots;
		this.blocks = blocks;
		this.hits = hits;
		this.faceoffPct = faceoffPct;
		this.shifts = shifts;
		this.ppp = ppp;
		this.shp = shp;
		this.plusMinus = plusMinus;
	}

	setStats(goals, assists, gamesPlayed, pim, shots, blocks, hits, faceoffPct, shifts, ppp, shp, plusMinus) {
		this.goals = goals;
		this.assists = assists;
		this.points = this.goals + this.assists;
		this.gamesPlayed = gamesPlayed;
		this.pim = pim;
		this.shots = shots;
		this.blocks = blocks;
		this.hits = hits;
		this.faceoffPct = faceoffPct;
		this.shifts = shifts;
		this.ppp = ppp;
		this.shp = shp;
		this.plusMinus = plusMinus;
		this.faceoffWon = this.faceoffWon;
	}

	getID() {
		if(this.id!=undefined){
			return(this.id);
		}
		else {
			return("NO ID");
		}
	}

	getPosition() {
		if(this.position!=undefined){
			return(this.position);
		}
		else {
			return("NO position");
		}
	}

	getName() {
		if(this.name!=undefined){
			return(this.name);
		}
		else {
			return("NO name");
		}
	}
}

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
allPlayers = []
allTeams = []
}


//when the sixth button is clicked
function fantasy() {
	reset();
    getAllTeamIds();
}

function getAllTeamIds() {
    displayLoading();
    axios.get('https://statsapi.web.nhl.com/' + 'api/v1/teams')
		.then((response) => {
            for(i=0;i<response.data.teams.length;i++) {
				allTeams[i] = new Team(response.data.teams[i].name,response.data.teams[i].id);
            }
            console.log(allTeams);
			getAllPlayerLinks();
        })
    hideLoading();
}

function getAllPlayerLinks() {
    displayLoading();
    axios.get('https://statsapi.web.nhl.com/' + 'api/v1/teams/' + '?teamId=' + "&expand=team.roster")
		.then((response) => {
            for(i=0;i<allTeams.length;i++) {
                for(j=0;j<response.data.teams[i].roster.roster.length;j++) {
                    allPlayers[(j*i)+j] = new Player(response.data.teams[i].roster.roster[j].person.fullName,response.data.teams[i].roster.roster[j].person.id,response.data.teams[i].roster.roster[j].position.code);
                }
            }
            console.log(allPlayers)
			//getPlayerStats();
        })
    hideLoading();
}

function getPlayerStats() {
    displayLoading();
	purgeUndefinedPlayers();
	for(i=0;i<allPlayers.length;i++) {
		console.log("I: " + i);
		console.log("PLAYER " + i + " OBJECT = " + allPlayers[i]);
		console.log("PLAYER " + i + " NAME = " + allPlayers[i].getName());
		if(i<312) {
			axios.get('https://statsapi.web.nhl.com/' + 'api/v1/people/' + allPlayers[i].getID() + '/stats?stats=statsSingleSeason&season=20222023')
			.then((response) => {
				console.log("GOT HEREEEEE");
				/* if(response.data.stats[0].splits[0].stat.goals != undefined) {
					var gamesPlayed = response.data.stats[0].splits[0].stat.games;
					var goals = response.data.stats[0].splits[0].stat.goals;
					var assists = response.data.stats[0].splits[0].stat.assists;
					var plusMinus = response.data.stats[0].splits[0].stat.plusMinus;
					var pim = response.data.stats[0].splits[0].stat.pim;
					var ppp = response.data.stats[0].splits[0].stat.powerPlayPoints;
					var shp = response.data.stats[0].splits[0].stat.shortHandedPoints;
					var shots = response.data.stats[0].splits[0].stat.shots;
					var faceoffPct = response.data.stats[0].splits[0].stat.faceOffPct;
					var shifts = response.data.stats[0].splits[0].stat.shifts;
					if (allPlayers[i].getPosition() == 'C') {
						var faceoffWon = faceoffPct*shifts;
					}
					else {
						var faceoffWon = 0;
					}
					var hits = response.data.stats[0].splits[0].stat.hits;
					var blocks = response.data.stats[0].splits[0].stat.blocked;

					allPlayers[i].setStats(goals, assists, gamesPlayed, pim, shots, blocks, hits, faceoffPct, shifts, ppp, shp, plusMinus, faceoffWon);
				}
				*/
			})
		}
	}
	console.log(allPlayers)
    hideLoading();
}

function purgeUndefinedPlayers() {
	console.log("PURRRRRRRRRRRGING");
	for(i=allPlayers.length-1;i>=0;i--) {
		if(allPlayers[i]==undefined) {
			deadPlayers[i] = (allPlayers[i]);
			allPlayers.splice(i,1);
		}
		console.log("PERSON " + i + " OBJECT TYPE: " + allPlayers[i]);
	}
}

/*
if (funStat=='fantasy')
{
    allRostersFantasy(response.data.teams[i].link);
}


function allRostersFantasy(teamLink) {
	axios.get('https://statsapi.web.nhl.com/' + teamLink + "/roster")
		.then((response) => {
			//same as above
			for (var i=0;i<response.data.roster.length;i++)
			{
				if (response.data.roster[i].position.code=="C") {
					var isCenter = true;
				}
				else {
					var isCenter = false;
				}
				var names = response.data.roster[i].person.fullName;
				getFantasy(response.data.roster[i].person.link,names,isCenter);
			}
		})
}


function getFantasy(playerLink,playerName,isCenter) {
	axios.get('https://statsapi.web.nhl.com/' + playerLink + '/stats?stats=statsSingleSeason&season=20222023')
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
				if (isCenter) {
					var faceoffWon = faceoffPerc*shifts;
				}
				else {
					var faceoffWon = 0;
				}
				var hits = response.data.stats[0].splits[0].stat.hits;
				var blocked = response.data.stats[0].splits[0].stat.blocked;
				if (gamesPlayed>1)
				{
					fantasyArray.push([playerName,(goals*5)+(assists*3)+(plusMinus)+(pim*0.5)+(ppp*2)+(shp*4)+(shots*0.9)+(hits)+(blocked)+(faceoffWon*0.01*0.42)]);
				}
				fantasyArray.sort(numberSort);
			}
				top10 = fantasyArray.filter(filterTop10);
				top10Names = getCol(top10, 0);
				top10Fantasy = getCol(top10, 1);
				top500 = fantasyArray.filter(filterTop500);
				top500Names = getCol(top500, 0);
				top500Fantasy = getCol(top500, 1);
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
*/