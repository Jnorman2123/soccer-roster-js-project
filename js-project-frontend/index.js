const leaguesUrl = 'http://localhost:3000/leagues'
const teamsUrl = 'http://localhost:3000/teams'

document.addEventListener('DOMContentLoaded', () => { 

    fetchLeagues()  
})

function fetchLeague(league) {
    fetch(leaguesUrl + `/${league.id}`)
        .then(response => response.json())
        .then(leagueData => {
            const docBody = document.querySelector('body')
            docBody.innerHTML = ''
            createEditLeagueButton(leagueData)
            createDeleteLeagueButton(leagueData)
            createLeaguesButton()
            const theLeague = new League(league.id, league.name, league.logo, league.country, league.division)
            theLeague.renderLeague()
            fetchTeams()
        })
}

function fetchLeagues() {
    docBody = document.querySelector('body')
    docBody.innerHTML = ''
    createNewLeagueButton()
    fetch(leaguesUrl)
        .then(response => response.json())
        .then((leagueData) => {
            League.renderAllLeagues(leagueData)
        })    
}

function fetchTeams() {
    fetch(teamsUrl)
        .then(response => response.json())
        .then((teamData) => {
            Team.renderAllTeams(teamData)
        })
}
function createLeaguesButton() {
    const leaguesButton = document.createElement('button')
    const docBody = document.querySelector('body') 
    docBody.prepend(leaguesButton)
    leaguesButton.innerText = 'Leagues Page'
    leaguesButton.addEventListener('click', () => {
        fetchLeagues()
    })
}

function createNewLeagueButton() {
    const newLeagueButton = document.createElement('button')
    const docBody = document.querySelector('body') 
    docBody.prepend(newLeagueButton)
    newLeagueButton.innerText = 'Add a New League'
    newLeagueButton.addEventListener('click', () => {
        createNewLeagueForm()
    })
}

function createEditLeagueButton(league) {
    const editLeagueButton = document.createElement('button') 
    const docBody = document.querySelector('body')
    docBody.appendChild(editLeagueButton)
    editLeagueButton.innerText = 'Edit League'
    editLeagueButton.addEventListener('click', () => {
        createEditLeagueForm(league)
    })
}

function createDeleteLeagueButton(league) {
    const deletedLeague = new League(league.id, league.name, league.logo, league.country, league.divsion)
    const deleteLeagueButton = document.createElement('button') 
    const docBody = document.querySelector('body') 
    docBody.appendChild(deleteLeagueButton) 
    deleteLeagueButton.innerText = 'Delete League' 
    deleteLeagueButton.addEventListener('click', () => {
        deletedLeague.deleteLeague()
    })
}



function createNewLeagueForm() {
    const newLeagueForm = document.createElement('form')
    const docBody = document.querySelector('body')
    const newLeagueButton = document.querySelector('button')
    
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
    newLeagueButton.remove()
    newLeagueForm.innerHTML = html
    docBody.prepend(newLeagueForm)
    newLeagueForm.addEventListener('submit', () => {
        League.createNewLeague()
    })
    
}

function clearForm() {
    let form = document.querySelector('form')
    form.remove()
}

function createEditLeagueForm(league) {
    const editLeagueForm = document.createElement('form')
    const docBody = document.querySelector('body')
    const editedLeague = new League(league.id, league.name, league.logo, league.country, league.division)
    
    let html = `
        <form onsubmit="editLeague; return false;">
        <label>League Name: </label>
        <input type="text" id="league_name" value="${editedLeague.name}"><br>
        <label>League Logo: </label>
        <input type="text" id="league_logo" value="${editedLeague.logo}"><br>
        <label>League Country: </label>
        <input type="text" id="league_country" value="${editedLeague.country}"><br>
        <label>League Division: </label>
        <input type="text" id="league_division" value="${editedLeague.division}"><br>
        <input type="submit" value="Edit League">
    `
    
    docBody.innerHTML = ''
    editLeagueForm.innerHTML = html
    docBody.append(editLeagueForm)
    editedLeague.renderLeague()
    editLeagueForm.addEventListener('submit', () => {
        editedLeague.editLeague()
    })    
}
