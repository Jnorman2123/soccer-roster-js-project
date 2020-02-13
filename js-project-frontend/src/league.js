const leaguesUrl = 'http://localhost:3000/leagues'

document.addEventListener('DOMContentLoaded', () => { 

    fetchLeagues()  
})


function fetchLeagues() {
    createNewLeagueButton()
    fetch(leaguesUrl)
        .then(response => response.json())
        .then((leagueData) => {
            console.log(leagueData)
            return leagueData.map(league => {
                const newLeague = new League(league.name, league.logo, league.country, league.division)
                newLeague.renderLeague()
            })
        })
        
}

class League {
    constructor(name, logo, country, division) {
        this.name = name;
        this.logo = logo; 
        this.country = country;
        this.division = division
    }

    renderLeague() {
        const leagueCard = document.querySelector('#league_card')
        const leagueName = document.createElement('h1')
        const leagueLogo = document.createElement('img')
        const leagueCountry = document.createElement('h2')
        const leagueDivision = document.createElement('h4')
        leagueCard.appendChild(leagueName)
        leagueCard.appendChild(leagueLogo)
        leagueCard.appendChild(leagueCountry)
        leagueCard.appendChild(leagueDivision)
        leagueName.innerText = this.name
        leagueLogo.src = `${this.logo}`
        leagueCountry.innerText = this.country
        leagueDivision.innerText = this.division + ' division'
        leagueName.addEventListener('click', () => {
            fetchLeague(this)
        })
    }
}