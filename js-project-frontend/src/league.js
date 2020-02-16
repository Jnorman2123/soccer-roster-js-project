function fetchLeagues() {
    const leagueTeam = document.querySelector('#league-teams')
    const docBody = document.querySelector('body')
    if (!!leagueTeam) {
        docBody.removeChild(leagueTeam)
    }
    const docMain = document.querySelector('#main')
    docMain.innerHTML = ''
    createNewLeagueButton()
    fetch(leaguesUrl)
        .then(response => response.json())
        .then((leagueData) => {
            League.renderAllLeagues(leagueData)
        })    
}

function fetchLeague(league) {
    fetch(leaguesUrl + `/${league.id}`)
        .then(response => response.json())
        .then(leagueData => {
            const docMain = document.querySelector('#main')
            docMain.innerHTML = ''
            createButton('edit-league-button', 'main', 'Edit League')
            createButton('delete-league-button', 'main', 'Delete League')
            const theLeague = new League(leagueData)
            League.renderLeague(theLeague)
            createButton('league-teams-button', 'main', 'Show Teams in This League')
            addLeagueEventListeners(league)
        })
}

class League {
    constructor(league) {
        this.id = league.id;
        this.name = league.name;
        this.logo = league.logo; 
        this.country = league.country;
        this.division = league.division
    }

    static renderLeague(league) {
        const docMain = document.querySelector('#main')
        const leagueCard = document.createElement('div')
        const leagueName = document.createElement('h1')
        const leagueLogo = document.createElement('img')
        const leagueCountry = document.createElement('h2')
        const leagueDivision = document.createElement('h4')
        leagueCard.setAttribute('id', 'league-card')
        leagueName.setAttribute('id', 'league-name')
        leagueLogo.setAttribute('id', 'league-logo')
        leagueCountry.setAttribute('id', 'league-country')
        leagueDivision.setAttribute('id', 'league-division')
        docMain.appendChild(leagueCard)
        leagueCard.appendChild(leagueName)
        leagueCard.appendChild(leagueLogo)
        leagueCard.appendChild(leagueCountry)
        leagueCard.appendChild(leagueDivision)
        leagueName.innerText = league.name
        leagueLogo.src = league.logo
        leagueCountry.innerText = league.country
        leagueDivision.innerText = league.division
        leagueName.addEventListener('click', () => {
            fetchLeague(league)
        })
    }

    static renderAllLeagues(leagues) {
        return leagues.map(league => {
            const newLeague = new League(league)
            League.renderLeague(newLeague)
        })
    }

    static createNewLeague() {
        event.preventDefault()
        const league = {
            id: '',
            name: document.getElementById('league-name').value,
            logo: document.getElementById('league-logo').value,
            country: document.getElementById('league-country').value,
            division: document.getElementById('league-division').value
        }
        fetch(leaguesUrl, {
            method: 'POST',
            body: JSON.stringify(league),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            return response.json()
        })
        .then(() => {
            clearForm()
            fetchLeagues()   
        })
    }

    static editLeague(league) {
        event.preventDefault()
        league.name = document.getElementById('league-name').value
        league.logo = document.getElementById('league-logo').value
        league.country = document.getElementById('league-country').value
        league.division = document.getElementById('league-division').value

        fetch(leaguesUrl + `/${league.id}`, {
            method: 'PATCH',
            body: JSON.stringify(league),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            return response.json()
        })
        .then(() => {
            clearForm()
            fetchLeague(league)   
        })
    }

    static deleteLeague(league) {
        return fetch(leaguesUrl + `/${league.id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(fetchLeagues)
    }
    
    static deleteLeagueTeams(league) {
        return fetch(teamsUrl)
            .then(response => response.json())
            .then(teams => {
                for (const team of teams) {
                    if (team.league_id === league.id) {
                        return fetch(teamsUrl + `/${team.id}`, {
                            method: 'DELETE'
                        })
                    }
                }
            }) 
    }
}