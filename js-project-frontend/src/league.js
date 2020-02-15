function fetchLeagues() {
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
            createEditLeagueButton(leagueData)
            createDeleteLeagueButton(leagueData)
            const theLeague = new League(leagueData)
            League.renderLeague(theLeague)
            createLeagueTeamsButton(league)
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
        leagueCard.setAttribute('id', 'league_card')
        leagueName.setAttribute('id', 'league_name')
        leagueLogo.setAttribute('id', 'league_logo')
        leagueCountry.setAttribute('id', 'league_country')
        leagueDivision.setAttribute('id', 'league_division')
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
            name: document.getElementById('league_name').value,
            logo: document.getElementById('league_logo').value,
            country: document.getElementById('league_country').value,
            division: document.getElementById('league_division').value
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
        league.name = document.getElementById('league_name').value
        league.logo = document.getElementById('league_logo').value
        league.country = document.getElementById('league_country').value
        league.division = document.getElementById('league_division').value

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
}