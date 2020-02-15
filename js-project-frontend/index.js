const leaguesUrl = 'http://localhost:3000/leagues'
const teamsUrl = 'http://localhost:3000/teams'

document.addEventListener('DOMContentLoaded', () => { 
    createLeaguesButton()
    createTeamsButton()
    addNavEventListeners()
    fetchLeagues()  
})

function createButton(id, mount, label) {
    const buttonMount = document.querySelector(`#${mount}`)
    buttonMount.innerHTML += `
        <button id="${id}">${label}</button>
    `
}
function createLeaguesButton() {
    createButton('leagues-button', 'nav', 'Leagues Page')
}

function createTeamsButton() {
    createButton('teams-button', 'nav', 'Teams Page') 
}

function addNavEventListeners() {
    const leaguesButton = document.querySelector('#leagues-button')
    leaguesButton.addEventListener('click', () => {
        fetchLeagues()
    })

    const teamsButton = document.querySelector('#teams-button')
    teamsButton.addEventListener('click', () => {
        fetchTeams()
    })
}
function createNewLeagueButton() {
    createButton('new-league-button', 'main', 'Add a New League')
    const newLeagueButton = document.querySelector('#new-league-button')
    newLeagueButton.addEventListener('click', () => {
        createNewLeagueForm()
    })
}

function createEditLeagueButton(league) {
    createButton('edit-league-button', 'main', 'Edit League')
    
    
}

function createDeleteLeagueButton(league) {
    createButton('delete-league-button', 'main', 'Delete League')
    
}

function createLeagueTeamsButton(league) {
    createButton('league-teams-button', 'main', 'Show Teams in This League')
}

function addLeagueEventListeners(league) {
    const editLeagueButton = document.querySelector('#edit-league-button')
    editLeagueButton.addEventListener('click', () => {
        createEditLeagueForm(league)
    })

    const deleteLeagueButton = document.querySelector('#delete-league-button')
    deleteLeagueButton.addEventListener('click', () => {
        League.deleteLeague(league)
    })

    const leagueTeamsButton = document.querySelector('#league-teams-button')
    leagueTeamsButton.addEventListener('click', () => {
        fetchLeagueTeams(league)
    })
    const leagueName = document.querySelector('#league_name')
    leagueName.addEventListener('click', () => {
        fetchLeague(league)
    })
}

function createTeamLeagueButton(team) {
    createButton('team-league-button', 'main', 'Return to League')
    const leagueData = {
        id: team.league_id,
        name: '',
        logo: '',
        country: '', 
        division: '',
    }
    teamLeague = new League(leagueData)
    const teamLeagueButton = document.querySelector('#team-league-button')
    teamLeagueButton.addEventListener('click', () => {
        fetchLeague(teamLeague)
    })
}

function createNewTeamButton() {
    const newTeamButton = document.createElement('button')
    const docMain = document.querySelector('#main') 
    newTeamButton.setAttribute('id', 'new-team')
    docMain.prepend(newTeamButton)
    newTeamButton.innerText = 'Add a New Team'
    newTeamButton.addEventListener('click', () => {
        createNewTeamForm()
    })
}

function createEditTeamButton(team) {
    const editTeamButton = document.createElement('button') 
    const docMain = document.querySelector('#main')
    docMain.appendChild(editTeamButton)
    editTeamButton.innerText = 'Edit Team'
    editTeamButton.addEventListener('click', () => {
        createEditTeamForm(team)
    })
}

function createDeleteTeamButton(team) {
    const deleteTeamButton = document.createElement('button') 
    const docMain = document.querySelector('#main') 
    docMain.appendChild(deleteTeamButton) 
    deleteTeamButton.innerText = 'Delete Team' 
    deleteTeamButton.addEventListener('click', () => {
        team.deleteTeam()
    })
}

function createNewLeagueForm() {
    const newLeagueForm = document.createElement('form')
    const docMain = document.querySelector('#main')
    const newLeagueButton = document.querySelector('#new-league-button')
    
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
    docMain.prepend(newLeagueForm)
    newLeagueForm.addEventListener('submit', () => {
        League.createNewLeague()
    })
    
}

function createEditLeagueForm(league) {
    const editLeagueForm = document.createElement('form')
    const docMain = document.querySelector('#main')
    
    let html = `
        <form onsubmit="editLeague; return false;">
        <label>League Name: </label>
        <input type="text" id="league_name" value="${league.name}"><br>
        <label>League Logo: </label>
        <input type="text" id="league_logo" value="${league.logo}"><br>
        <label>League Country: </label>
        <input type="text" id="league_country" value="${league.country}"><br>
        <label>League Division: </label>
        <input type="text" id="league_division" value="${league.division}"><br>
        <input type="submit" value="Edit League">
    `
    
    docMain.innerHTML = ''
    editLeagueForm.innerHTML = html
    docMain.append(editLeagueForm)
    League.renderLeague(league)
    editLeagueForm.addEventListener('submit', () => {
        League.editLeague(league)
    })    
}

function createNewTeamForm() {
    const newTeamForm = document.createElement('form')
    const docMain = document.querySelector('#main')
    const newTeamButton = document.querySelector('#new-team')
    let html = `
        <form onsubmit="createNewTeam; return false;">
        <label>Team Name: </label>
        <input type="text" id="team_name"><br>
        <label>Team Logo: </label>
        <input type="text" id="team_logo"><br>
        <label>Team Nickname: </label>
        <input type="text" id="team_nickname"><br>
        <label>Team Stadium: </label>
        <input type="text" id="team_stadium"><br>
        <label>Team Manager: </label>
        <input type="text" id="team_manager"><br>
        <label>Year Team Founded: </label>
        <input type="text" id="team_year_founded"><br>
        <label>League: </label>
        <select id="leagues">

        </select><br>
        <input type="submit" value="Add a new Team">
    `
    fetch(leaguesUrl) 
        .then(response => response.json())
        .then((leagueData) => {
            const selectMenu = document.querySelector('#leagues')
            return leagueData.map(league => {
                const option = `
                <option value=${league.id}>${league.name}</option>
                `
                selectMenu.innerHTML += option
            })
        })
    newTeamButton.remove()
    newTeamForm.innerHTML = html
    docMain.prepend(newTeamForm)
    newTeamForm.addEventListener('submit', () => {
        Team.createNewTeam()
    })
    
}

function createEditTeamForm(team) {
    const editTeamForm = document.createElement('form')
    const docMain = document.querySelector('#main')
    let html = `
        <form onsubmit="createEditTeam; return false;">
        <label>Team Name: </label>
        <input type="text" id="team_name" value="${team.name}"><br>
        <label>Team Logo: </label>
        <input type="text" id="team_logo" value="${team.logo}"><br>
        <label>Team Nickname: </label>
        <input type="text" id="team_nickname" value="${team.nickname}"><br>
        <label>Team Stadium: </label>
        <input type="text" id="team_stadium" value="${team.stadium}"><br>
        <label>Team Manager: </label>
        <input type="text" id="team_manager" value="${team.manager}"><br>
        <label>Year Team Founded: </label>
        <input type="text" id="team_year_founded" value="${team.year_founded}"><br>
        <label>League: </label>
        <select id="leagues">

        </select><br>
        <input type="submit" value="Edit Team">
    `
    fetch(leaguesUrl) 
        .then(response => response.json())
        .then((leagueData) => {
            const selectMenu = document.querySelector('#leagues')
            return leagueData.map(league => {
                const option = `
                <option value=${league.id}>${league.name}</option>
                `
                selectMenu.innerHTML += option
            })
        })
    docMain.innerHTML = ''
    editTeamForm.innerHTML = html
    docMain.append(editTeamForm)
    team.renderTeam()
    editTeamForm.addEventListener('submit', () => {
        Team.editTeam(team)
    })
}

function clearForm() {
    let form = document.querySelector('form')
    form.remove()
}