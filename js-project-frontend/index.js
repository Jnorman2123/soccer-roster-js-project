const leaguesUrl = 'http://localhost:3000/leagues'

const leagueCard = document.createElement('div')
const leagueName = document.createElement('h1')

document.addEventListener('DOMContentLoaded', () => {
    console.log('this is working')
    
})

fetch(leaguesUrl)
    .then(response => response.json())
    .then((leagueData) => {
        console.log(leagueData[0].name)
        renderLeague(leagueData[0])
    })

function renderLeague(data) {
    const docBody = document.querySelector('body')
    docBody.appendChild(leagueCard)
    leagueCard.appendChild(leagueName)
    leagueName.innerHTML = data.name
}