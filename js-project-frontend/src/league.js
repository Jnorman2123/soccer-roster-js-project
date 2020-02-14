

class League {
    constructor(id, name, logo, country, division) {
        this.id = id;
        this.name = name;
        this.logo = logo; 
        this.country = country;
        this.division = division
    }

    renderLeague() {
        const docBody = document.querySelector('body')
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
        docBody.appendChild(leagueCard)
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

    static renderAllLeagues(leagues) {
        return leagues.map(league => {
            const newLeague = new League(league.id, league.name, league.logo, league.country, league.division)
            newLeague.renderLeague()
        })
    }

    
}