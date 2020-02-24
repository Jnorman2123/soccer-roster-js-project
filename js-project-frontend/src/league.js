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
            theLeague.renderLeague()
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

    renderLeague() {
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
        leagueLogo.src = this.logo
        leagueName.innerText = this.name
        leagueCountry.innerText = this.country
        leagueDivision.innerText = this.division
        leagueCard.addEventListener('click', () => {
            fetchLeague(this)
        })
    }

    static renderAllLeagues(leagues) {
        return leagues.map(league => {
            const newLeague = new League(league)
            newLeague.renderLeague()
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

    editLeague() {
        event.preventDefault()
        this.name = document.querySelector('input[name="league-name"]').value
        this.logo = document.querySelector('input[name="league-logo"]').value
        this.country = document.querySelector('input[name="league-country"]').value
        this.division = document.querySelector('input[name="league-division"]').value

        fetch(leaguesUrl + `/${this.id}`, {
            method: 'PATCH',
            body: JSON.stringify(this),
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
            fetchLeague(this)   
        })
    }
}