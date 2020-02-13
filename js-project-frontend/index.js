const leaguesUrl = 'http://localhost:3000/leagues'


document.addEventListener('DOMContentLoaded', () => {
    createNewLeagueButton()
    

    fetchLeagues()
    
    
})


function fetchLeagues() {
    fetch(leaguesUrl)
        .then(response => response.json())
        .then((leagueData) => {
            return renderAllLeagues(leagueData)
        })
}

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
    const newLeagueButton = document.createElement('button')
    const docBody = document.querySelector('body') 
    docBody.appendChild(newLeagueButton)
    newLeagueButton.innerText = 'Add a New League'
    newLeagueButton.addEventListener('click', () => {
        createNewLeagueForm()
    })
}

function createEditLeagueButton() {
    const editLeagueButton = document.createElement('button')
    const docBody = document.querySelector('body') 
    docBody.appendChild(editLeagueButton)
    editLeagueButton.innerText = 'Edit League'
    editLeagueButton.addEventListener('click', () => {
        createEditLeagueForm()
    })
}

function createNewLeagueForm() {
    const newLeagueForm = document.createElement('form')
    const docBody = document.querySelector('body')
    
    let html = `
        <form onsubmit="createNewLeague; return false;">
        <label>League Name: </label>
        <input type="text" id="league_name"><br>
        <label>League Logo: </label>
        <input type="text" id="league_logo"><br>
        <label>League Country: </label>
        <input type="text" id="league_country"><br>
        <label>League Division: </label>
        <input type="text" id="league_division"><br>
        <input type="submit" value="Add a new League">
    `
    
    docBody.innerHTML = ''
    newLeagueForm.innerHTML = html
    docBody.appendChild(newLeagueForm)
    newLeagueForm.addEventListener('submit', createNewLeague)
    
}

function createNewLeague() {
    event.preventDefault()
    const league = {
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

function editLeague() {
    event.preventDefault()
    const league = {
        name: document.getElementById('league_name').value,
        logo: document.getElementById('league_logo').value,
        country: document.getElementById('league_country').value,
        division: document.getElementById('league_division').value
    }

    fetch(leaguesUrl, {
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
        fetchLeagues()   
    })
}

function clearForm() {
    let form = document.querySelector('form')
    form.remove()
}