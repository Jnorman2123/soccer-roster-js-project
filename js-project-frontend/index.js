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
        <label>Name: </label>
        <input type="text" id="name"><br>
        <label>Logo: </label>
        <input type="text" id="logo"><br>
        <label>Country: </label>
        <input type="text" id="country"><br>
        <label>Division: </label>
        <input type="text" id="division"><br>
        <input type="submit" value="Add a new League">
    `
    
    docBody.innerHTML = ''
    newLeagueForm.innerHTML = html
    docBody.appendChild(newLeagueForm)
    newLeagueForm.addEventListener('submit', createNewLeague)
    // const nameLabel = document.createElement('label')
    // const nameInput = document.createElement('input')
    // const logoLabel = document.createElement('label')
    // const logoInput = document.createElement('input')
    // const countryLabel = document.createElement('label')
    // const countryInput = document.createElement('input')
    // const divisionLabel = document.createElement('label')
    // const divisionInput = document.createElement('input')
    // docBody.innerHTML = ''
    
    // newLeagueForm.appendChild(nameLabel)
    // newLeagueForm.appendChild(nameInput)
    // newLeagueForm.appendChild(logoLabel)
    // newLeagueForm.appendChild(logoInput)
    // newLeagueForm.appendChild(countryLabel)
    // newLeagueForm.appendChild(countryInput)
    // newLeagueForm.appendChild(divisionLabel)
    // newLeagueForm.appendChild(divisionInput)
    // newLeagueForm.appendChild(newLeagueSubmit)
    // nameLabel.innerText = 'League Name: '
    // logoLabel.innerText = 'League Logo Url: '
    // countryLabel.innerText = 'League Country: '
    // divisionLabel.innerText = 'Division Number: '
    // nameInput.setAttribute('id', 'league_name')
    // nameInput.setAttribute('name', 'league_name')
    // logoInput.setAttribute('id', 'league_logo')
    // logoInput.setAttribute('name', 'league_logo')
    // countryInput.setAttribute('id', 'league_country')
    // countryInput.setAttribute('name', 'league_country')
    // divisionInput.setAttribute('id', 'league_division')
    // divisionInput.setAttribute('name', 'league_division')
    // newLeagueSubmit.setAttribute('type', 'submit') 
    // newLeagueSubmit.setAttribute('value', 'Add a new League')
}

function createNewLeague() {
    event.preventDefault()
    const league = {
        name: document.getElementById('name').value,
        logo: document.getElementById('logo').value,
        country: document.getElementById('country').value,
        division: document.getElementById('division').value
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
    .then(leagueData => {
        console.log(leagueData) 
        fetchLeagues()
    })
}