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

function createNewTeamButton() {
    createButton('new-team-button', 'main', 'Add a New Team')
    newTeamButton = document.querySelector('#new-team-button')
    newTeamButton.addEventListener('click', () => {
        createNewTeamForm()
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

function addTeamEventListeners(team) {
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

function createNewLeagueForm() {
    const newLeagueForm = document.createElement('form')
    const docMain = document.querySelector('#main')
    const newLeagueButton = document.querySelector('#new-league-button')
    const properties = ['name', 'logo', 'country', 'division']
    let html = ''
    html += `<form onsubmit="createNewLeague; return false;">`
    for (const property of properties) {
        html += `<label>League ${property.charAt(0).toUpperCase() + property.slice(1)}: </label>
        <input type="text" id="league_${property}"><br>`
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
            html += `<label>League ${property.charAt(0).toUpperCase() + property.slice(1)}: </label>
            <input type="text" id="league_${property}" value="${league[property]}"><br>`
        }
    }
    html += `<input type="submit" value="Edit League">`
    docMain.innerHTML = ''
    editLeagueForm.innerHTML = html
    docMain.append(editLeagueForm)
    League.renderLeague(league)
    editLeagueForm.addEventListener('submit', () => {
        League.editLeague(league)
    })    
}

function fetchLeagueIds() {
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
}

function createNewTeamForm() {
    const newTeamForm = document.createElement('form')
    const docMain = document.querySelector('#main')
    const newTeamButton = document.querySelector('#new-team-button')
    const properties = ['name', 'logo', 'nickname', 'stadium', 'manager', 'year_founded']
    let html = ''
    html += `<form onsubmit="createNewTeam; return false;">`
    for (property of properties) {
        html += `<label>Team ${property.charAt(0).toUpperCase() + property.slice(1)}: </label>
        <input type="text" id="team_${property}"><br>`
    }
     html += `<label>League: </label>
        <select id="leagues">
        </select><br>
        <input type="submit" value="Add a new Team">`
    
    fetchLeagueIds()
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
    let html = ''
    html += `<form onsubmit="createEditTeam; return false;">`
    for (const property in team) {
        if (property != 'id' && property != 'league_id') {
            html += `<label>Team ${property.charAt(0).toUpperCase() + property.slice(1)}: </label>
            <input type="text" id="team_${property}" value="${team[property]}"><br>`
        }
    }
    html += `<label>League: </label>
        <select id="leagues">
        </select><br>
        <input type="submit" value="Edit Team">`

    fetchLeagueIds()   
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