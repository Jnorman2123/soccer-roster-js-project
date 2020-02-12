const leaguesUrl = 'http://localhost:3000/leagues'

document.addEventListener('DOMContentLoaded', () => {
    console.log('this is working')
    
})

fetch(leaguesUrl)
    .then(response => response.json())
    .then((leagueData) => {
        leagueData.map(data => {
            return renderLeague(data)
        })
    })

function renderLeague(data) {
    const docBody = document.querySelector('body')
    const leagueCard = document.createElement('div')
    const leagueName = document.createElement('h1')
    docBody.appendChild(leagueCard)
    leagueCard.appendChild(leagueName)
    leagueName.innerHTML = data.name
}