const leaguesUrl = 'http://localhost:3000/leagues'

document.addEventListener('DOMContentLoaded', () => {
    console.log('this is working')
    
})

fetch(leaguesUrl)
    .then(response => response.json())
    .then((leagueData) => {
        return renderAllLeagues(leagueData)
    })

function renderLeague(league) {
    const docBody = document.querySelector('body')
    const leagueCard = document.createElement('div')
    const leagueName = document.createElement('h1')
    const leagueLogo = document.createElement('img')
    const leagueCountry = document.createElement('h2')
    docBody.appendChild(leagueCard)
    leagueCard.appendChild(leagueName)
    leagueCard.appendChild(leagueLogo)
    leagueCard.appendChild(leagueCountry)
    leagueName.innerText = league.name
    leagueLogo.src = `${league.logo}`
    leagueCountry.innerText = league.country
}

function renderAllLeagues(leagues) {
    leagues.map(league => {
        return renderLeague(league)
    })
}