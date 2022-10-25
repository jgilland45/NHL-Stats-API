var allTeamInfo = {};
var allPlayerInfo = {};

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
allTeamInfo = {
    "ids": [],
    "weeklySchedule": []
};
allPlayerInfo = {};
}


//when the sixth button is clicked
function fantasy() {
	reset();
    getAllTeamIds();
    getAllPlayerLinks();
}

function getAllTeamIds() {
    displayLoading();
    axios.get('https://statsapi.web.nhl.com/' + 'api/v1/teams')
		.then((response) => {
            for(i=0;i<response.data.teams.length;i++) {
                allTeamInfo['ids'].push(response.data.teams[i].id);
            }
            console.log(allTeamIds);
        })
    hideLoading();
}

function getAllPlayerLinks() {
    displayLoading();
    allTeamsString = "";
    for(i=0;i<allTeamIds.length;i++) {
        if (i!=(allTeamIds.length-1)) {
            allTeamsString = allTeamsString + toString(allTeamIds[i]) + ',';
        }
        else {
            allTeamsString = allTeamsString + toString(allTeamIds[i]);
        }
    }
    axios.get('https://statsapi.web.nhl.com/' + 'api/v1/teams/' + '?teamId=' + allTeamsString + "&expand=team.roster")
		.then((response) => {
            for(i=0;i<allTeamIds.length;i++) {
                for(j=0;j<response.data.teams[i].roster.roster.length;j++) {
                    allPlayerLinks.push(response.data.teams[i].roster.roster[j].person.id);
                }
            }
            console.log(allPlayerLinks)
        })
    hideLoading();
}

function getAllPlayerLinks() {
    displayLoading();
    allTeamsString = "";
    for(i=0;i<allTeamIds.length;i++) {
        if (i!=(allTeamIds.length-1)) {
            allTeamsString = allTeamsString + toString(allTeamIds[i]) + ',';
        }
        else {
            allTeamsString = allTeamsString + toString(allTeamIds[i]);
        }
    }
    axios.get('https://statsapi.web.nhl.com/' + playerLink + '/stats?stats=statsSingleSeason&season=20222023')
		.then((response) => {
            for(i=0;i<allTeamIds.length;i++) {
                for(j=0;j<response.data.teams[i].roster.roster.length;j++) {
                    allPlayerLinks.push(response.data.teams[i].roster.roster[j].person.id);
                }
            }
            console.log(allPlayerLinks)
        })
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