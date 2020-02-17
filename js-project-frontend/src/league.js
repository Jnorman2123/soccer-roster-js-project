function fetchLeagues() {
    removeLeagueTeams()
    const docMain = document.querySelector('#main')
    docMain.innerHTML = ''
    createNewLeagueButton()
    createLeagueTable()
    fetch(leaguesUrl)
        .then(response => response.json())
        .then((leagueData) => {
            League.renderAllLeagues(leagueData)
        })    
}

function fetchLeague(league) {
    removeLeagueTeams()
    fetch(leaguesUrl + `/${league.id}`)
        .then(response => response.json())
        .then(leagueData => {
            const docMain = document.querySelector('#main')
            docMain.innerHTML = ''
            createButton('edit-league-button', 'main', 'Edit League')
            createLeagueTable()
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
        const leagueTable = document.querySelector('#league-table')
        const leagueCard = document.createElement('div')
        const leagueLogo = document.createElement('img')
        const leagueInfo = document.createElement('div')
        const leagueName = document.createElement('h1')
        const leagueCountry = document.createElement('h2')
        const leagueDivision = document.createElement('h4')
        leagueCard.setAttribute('id', 'league-card')
        leagueLogo.setAttribute('id', 'league-logo')
        leagueInfo.setAttribute('id', 'league-info')
        leagueName.setAttribute('id', 'league-name')
        leagueCountry.setAttribute('id', 'league-country')
        leagueDivision.setAttribute('id', 'league-division')
        leagueTable.appendChild(leagueCard)
        leagueCard.appendChild(leagueLogo)
        leagueCard.appendChild(leagueInfo)
        leagueInfo.appendChild(leagueName)
        leagueInfo.appendChild(leagueCountry)
        leagueInfo.appendChild(leagueDivision)
        leagueLogo.src = league.logo
        leagueName.innerText = league.name
        leagueCountry.innerText = league.country
        leagueDivision.innerText = league.division
        leagueCard.addEventListener('click', () => {
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
            name: document.querySelector('input[name="league-name"]').value,
            logo: document.querySelector('input[name="league-logo"]').value,
            country: document.querySelector('input[name="league-country"]').value,
            division: document.querySelector('input[name="league-division"]').value
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
        league.name = document.querySelector('input[name="league-name"]').value
        league.logo = document.querySelector('input[name="league-logo"]').value
        league.country = document.querySelector('input[name="league-country"]').value
        league.division = document.querySelector('input[name="league-division"]').value

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
}