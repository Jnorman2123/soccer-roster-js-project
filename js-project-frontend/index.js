const leaguesUrl = 'http://localhost:3000/leagues'
const teamsUrl = 'http://localhost:3000/teams'

document.addEventListener('DOMContentLoaded', () => { 
    createButton('leagues-button', 'nav', 'Leagues Page')
    createButton('teams-button', 'nav', 'Teams Page')
    addNavEventListeners()
    fetchLeagues()  
})

function createButton(id, mount, label) {
    const buttonMount = document.querySelector(`#${mount}`)
    buttonMount.innerHTML += `
        <button id="${id}">${label}</button>
    `
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

function createLeagueTable() {
    const docMain = document.querySelector('#main')
    const leagueTable = document.createElement('div')
    leagueTable.setAttribute('id', 'league-table')
    docMain.appendChild(leagueTable)
}

function addLeagueEventListeners(league) {
    const editLeagueButton = document.querySelector('#edit-league-button')
    editLeagueButton.addEventListener('click', () => {
        createEditLeagueForm(league)
    })


    const leagueTeamsButton = document.querySelector('#league-teams-button')
    leagueTeamsButton.addEventListener('click', () => {
        fetchLeagueTeams(league)
    })

    const leagueName = document.querySelector('#league-name')
    leagueName.addEventListener('click', () => {
        fetchLeague(league)
    })  
}

function addLeagueTeamsEventListeners(league) {
    const newTeamButton = document.querySelector('#new-team-button')
    newTeamButton.addEventListener('click', () => {
        createNewTeamForm(league)
    })
    const leagueCard = document.querySelector('#league-card')
    leagueCard.addEventListener('click', () => {
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
}

function createTeamTable() {
    const docMain = document.querySelector('#main')
    const teamTable = document.createElement('div')
    teamTable.setAttribute('id', 'team-table')
    docMain.appendChild(teamTable)
}

const addTeamEventListeners = (team) =>  {
    const teamLeagueButton = document.querySelector('#team-league-button')
    teamLeagueButton.addEventListener('click', () => {
        fetchLeague(teamLeague)
    })

    const editTeamButton = document.querySelector('#edit-team-button')
    editTeamButton.addEventListener('click', () => {
        createEditTeamForm(team)
    })

    const deleteTeamButton = document.querySelector('#delete-team-button')
    deleteTeamButton.addEventListener('click', () => {
        team.deleteTeam()
    })
}

function removeLeagueTeams() {
    const leagueTeam = document.querySelector('#league-teams')
    const docBody = document.querySelector('body')
    if (!!leagueTeam) {
        docBody.removeChild(leagueTeam)
    }
}

function createNewLeagueForm() {
    const newLeagueForm = document.createElement('form')
    const docMain = document.querySelector('#main')
    const newLeagueButton = document.querySelector('#new-league-button')
    const properties = ['name', 'logo', 'country', 'division']
    let html = ''
    html += `<form onsubmit="createNewLeague; return false;">`
    for (const property of properties) {
        html += `<label>League ${property.charAt(0).toUpperCase() + property.slice(1)}: </label><br>
        <input type="text" name="league-${property}"><br>`
    }
    html += `<input type="submit" value="Add a new League">`
    
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
    
    let html = ''
    html += `<form onsubmit="editLeague; return false;">`  
    for (const property in league) {
        if (property != 'id') {
            html += `<label>League ${property.charAt(0).toUpperCase() + property.slice(1)}: </label><br>
            <input type="text" name="league-${property}" value="${league[property]}"><br>`
        }
    }
    html += `<input type="submit" value="Edit League">`
    docMain.innerHTML = ''
    editLeagueForm.innerHTML = html
    docMain.append(editLeagueForm)
    createLeagueTable()
    league.renderLeague()
    editLeagueForm.addEventListener('submit', () => {
        league.editLeague()
    })    
}

function createNewTeamForm(league) {
    const newTeamForm = document.createElement('form')
    const leagueTeams = document.querySelector('#league-teams')
    const newTeamButton = document.querySelector('#new-team-button')
    const properties = ['name', 'logo', 'nickname', 'stadium', 'manager', 'year_founded']
    let html = ''
    html += `<form onsubmit="createNewTeam; return false;">`
    for (property of properties) {
        html += `<label>Team ${property.charAt(0).toUpperCase() + property.slice(1)}: </label><br>
        <input type="text" name="team_${property}"><br>`
    }
     html += `<input type="submit" value="Add a new Team">`
    newTeamButton.remove()
    newTeamForm.innerHTML = html
    leagueTeams.prepend(newTeamForm)
    newTeamForm.addEventListener('submit', () => {
        Team.createNewTeam(league)
    })
    
}

function createEditTeamForm(team) {
    const editTeamForm = document.createElement('form')
    const docMain = document.querySelector('#main')
    let html = ''
    html += `<form onsubmit="createEditTeam; return false;">`
    for (const property in team) {
        if (property != 'id' && property != 'league_id') {
            html += `<label>Team ${property.charAt(0).toUpperCase() + property.slice(1)}: </label><br>
            <input type="text" name="team_${property}" value="${team[property]}"><br>`
        }
    }
    html += `<input type="submit" value="Edit Team">`
    docMain.innerHTML = ''
    editTeamForm.innerHTML = html
    docMain.append(editTeamForm)
    createTeamTable()
    team.renderTeam('main')
    editTeamForm.addEventListener('submit', () => {
        team.editTeam()
    })
}

function clearForm() {
    let form = document.querySelector('form')
    form.remove()
}

function catchMessage(e) {
    alert("something went wrong!");
    console.log(e.message)
}