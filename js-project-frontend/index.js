const leaguesUrl = 'http://localhost:3000/leagues'


document.addEventListener('DOMContentLoaded', () => { 

    fetchLeagues()  
    
})


function fetchLeagues() {
    createNewLeagueButton()
    fetch(leaguesUrl)
        .then(response => response.json())
        .then((leagueData) => {
            return renderAllLeagues(leagueData)
        })
        
}

function fetchLeague(league) {
    fetch(leaguesUrl + `/${league.id}`)
        .then(response => response.json())
        .then(leagueData => {
            document.querySelector('body').innerHTML = ''
            createEditLeagueButton(league)
            return renderLeague(leagueData)
        })
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
    newLeagueButton.addEventListener('click', createNewLeagueForm)
}

function createEditLeagueButton(league) {
    const editLeagueButton = document.createElement('button') 
    const docBody = document.querySelector('body')
    docBody.appendChild(editLeagueButton)
    editLeagueButton.innerText = 'Edit League'
    editLeagueButton.addEventListener('click', createEditLeagueForm(league))
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

function editLeague(league) {
    
    fetch(leaguesUrl + `/${league.id}`, {
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

function createEditLeagueForm(league) {
    const editLeagueForm = document.createElement('form')
    const docBody = document.querySelector('body')
    
    let html = `
        <form onsubmit="editNewLeague; return false;">
        <label>League Name: </label>
        <input type="text" id="league_name"><br>
        <label>League Logo: </label>
        <input type="text" id="league_logo"><br>
        <label>League Country: </label>
        <input type="text" id="league_country"><br>
        <label>League Division: </label>
        <input type="text" id="league_division"><br>
        <input type="submit" value="Edit League">
    `
    
    docBody.innerHTML = ''
    editLeagueForm.innerHTML = html
    docBody.appendChild(editLeagueForm)
    editLeagueForm.addEventListener('submit', editLeague(league))
    
}