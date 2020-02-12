const leaguesUrl = 'http://localhost:3000/leagues'
const newLeagueButton = document.createElement('button')
const newLeagueSubmit = document.createElement('submit')

document.addEventListener('DOMContentLoaded', () => {
    newLeagueButton.addEventListener('click', () => {
        console.log('testing')
        createNewLeagueForm()
    })
    fetch(leaguesUrl)
        .then(response => response.json())
        .then((leagueData) => {
            return renderAllLeagues(leagueData)
        })
    
    createNewLeagueButton()
})



function renderLeague(league) {
    const docBody = document.querySelector('body')
    const leagueCard = document.createElement('div')
    const leagueName = document.createElement('h1')
    const leagueLogo = document.createElement('img')
    const leagueCountry = document.createElement('h2')
    const leagueDivision = document.createElement('h4')
    docBody.appendChild(leagueCard)
    leagueCard.appendChild(leagueName)
    leagueCard.appendChild(leagueLogo)
    leagueCard.appendChild(leagueCountry)
    leagueCard.appendChild(leagueDivision)
    leagueName.innerText = league.name
    leagueLogo.src = `${league.logo}`
    leagueCountry.innerText = league.country
    leagueDivision.innerText = league.division + ' division'
}

function renderAllLeagues(leagues) {
    leagues.map(league => {
        return renderLeague(league)
    })
}

function createNewLeagueButton() {
    const docBody = document.querySelector('body') 
    docBody.appendChild(newLeagueButton)
    newLeagueButton.innerText = 'Add a New League'
}

function createNewLeagueForm() {
    const docBody = document.querySelector('body')
    const newLeagueForm = document.createElement('form')
    const nameLabel = document.createElement('label')
    const nameInput = document.createElement('input')
    const logoLabel = document.createElement('label')
    const logoInput = document.createElement('input')
    docBody.innerHTML = ''
    docBody.appendChild(newLeagueForm)
    newLeagueForm.appendChild(nameLabel)
    newLeagueForm.appendChild(nameInput)
    newLeagueForm.appendChild(logoLabel)
    newLeagueForm.appendChild(logoInput)
    nameLabel.innerText = 'League Name: '
    logoLabel.innerText = 'League Logo Url: '
    nameInput.setAttribute('id', 'league_name')
    nameInput.setAttribute('name', 'league_name')
    logoInput.setAttribute('id', 'league_logo')
    logoInput.setAttribute('name', 'league_logo')
}