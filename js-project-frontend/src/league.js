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
        leagueName.innerText = league.name
        leagueLogo.src = `${league.logo}`
        leagueCountry.innerText = league.country
        leagueDivision.innerText = league.division + ' division'
        leagueName.addEventListener('click', () => {
            fetchLeague(league)
        })
    }
}