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
    docBody.appendChild(leagueCard)
    leagueCard.appendChild(leagueName)
    leagueCard.appendChild(leagueLogo)
    leagueName.innerHTML = league.name
    leagueLogo.src = `${league.logo}`
}

function renderAllLeagues(leagues) {
    leagues.map(league => {
        return renderLeague(league)
    })
}