var allPlayers = []
var allTeams = []

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
		this.faceoffWon = this.faceoffPct*this.shifts;
	}

	getID() {
		return this.id;
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
    getAllPlayerLinks();
	getPlayerStats();
}

function getAllTeamIds() {
    displayLoading();
    axios.get('https://statsapi.web.nhl.com/' + 'api/v1/teams')
		.then((response) => {
            for(i=0;i<response.data.teams.length;i++) {
				allTeams[i] = new Team(response.data.teams[i].name,response.data.teams[i].id);
            }
            console.log(allTeams);
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
        })
    hideLoading();
}

function getPlayerStats() {
    displayLoading();
	for(i=0;i<allPlayers.length;i++) {
		axios.get('https://statsapi.web.nhl.com/' + 'people/' + toString(allPlayers[i].getId()) + '/stats?stats=statsSingleSeason&season=20222023')
		.then((response) => {
			console.log("GOT HEREEEEE");
			allPlayers[i].gamesPlayed = response.data.stats[0].splits[0].stat.games;
			allPlayers[i].goals = response.data.stats[0].splits[0].stat.goals;
			allPlayers[i].assists = response.data.stats[0].splits[0].stat.assists;
			allPlayers[i].plusMinus = response.data.stats[0].splits[0].stat.plusMinus;
			allPlayers[i].pim = response.data.stats[0].splits[0].stat.pim;
			allPlayers[i].ppp = response.data.stats[0].splits[0].stat.powerPlayPoints;
			allPlayers[i].shp = response.data.stats[0].splits[0].stat.shortHandedPoints;
			allPlayers[i].shots = response.data.stats[0].splits[0].stat.shots;
			allPlayers[i].faceoffPct = response.data.stats[0].splits[0].stat.faceOffPct;
			allPlayers[i].shifts = response.data.stats[0].splits[0].stat.shifts;
			if (allPlayers[i].position == 'C') {
				allPlayers[i].faceoffWon = faceoffPct*shifts;
			}
			else {
				allPlayers[i].faceoffWon = 0;
			}
			allPlayers[i].hits = response.data.stats[0].splits[0].stat.hits;
			allPlayers[i].blocks = response.data.stats[0].splits[0].stat.blocked;
        })
	}
	console.log(allPlayers)
    hideLoading();
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