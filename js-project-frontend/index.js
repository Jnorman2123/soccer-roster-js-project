const leaguesUrl = 'http://localhost:3000/leagues'
const teamsUrl = 'http://localhost:3000/teams'


document.addEventListener('DOMContentLoaded', () => { 
    createLeaguesButton()
    createTeamsButton()
    fetchLeagues()  
})

function fetchLeague(league) {
    fetch(leaguesUrl + `/${league.id}`)
        .then(response => response.json())
        .then(leagueData => {
            const docMain = document.querySelector('#main')
            docMain.innerHTML = ''
            createEditLeagueButton(leagueData)
            createDeleteLeagueButton(leagueData)
            const theLeague = new League(leagueData.id, leagueData.name, leagueData.logo, leagueData.country, leagueData.division)
            theLeague.renderLeague()
            createLeagueTeamsButton(league)
        })
}

function fetchLeagues() {
    const docMain = document.querySelector('#main')
    docMain.innerHTML = ''
    createNewLeagueButton()
    fetch(leaguesUrl)
        .then(response => response.json())
        .then((leagueData) => {
            League.renderAllLeagues(leagueData)
        })    
}

function fetchTeams() {
    const docMain = document.querySelector('#main')
    docMain.innerHTML = ''
    createNewTeamButton()
    fetch(teamsUrl)
        .then(response => response.json())
        .then((teamData) => {
            Team.renderAllTeams(teamData)
        })
}

function fetchLeagueTeams(league) {
    const docMain = document.querySelector('#main')
    const leagueTeamsButton = document.querySelector('#league-teams-button')
    docMain.removeChild(leagueTeamsButton)
    fetch(teamsUrl)
        .then(response => response.json())
        .then((teamData) => {
            return teamData.map(team => {
                if (league.id === team.league_id) {
                    const theTeam = new Team(team.id, team.name, team.logo, team.nickname, team.stadium, team.manager, team.year_founded)
                    theTeam.renderTeam()
                }
            })
        })
}

function fetchTeam(team) {
    fetch(teamsUrl + `/${team.id}`)
        .then(response => response.json())
        .then(teamData => {
            const docMain = document.querySelector('#main')
            docMain.innerHTML = ''     
            const theTeam = new Team(teamData.id, teamData.name, teamData.logo, teamData.nickname, teamData.stadium, teamData.manager, teamData.year_founded)
            createTeamLeagueButton(team)
            createEditTeamButton(team)
            createDeleteTeamButton(team)
            theTeam.renderTeam()
        })
}

function createLeaguesButton() {
    const leaguesButton = document.createElement('button')
    const navBar = document.querySelector('#nav') 
    navBar.prepend(leaguesButton)
    leaguesButton.innerText = 'Leagues Page'
    leaguesButton.addEventListener('click', () => {
        fetchLeagues()
    })
}

function createNewLeagueButton() {
    const newLeagueButton = document.createElement('button')
    const docMain = document.querySelector('#main')
    newLeagueButton.setAttribute('id', 'new-league') 
    docMain.prepend(newLeagueButton)
    newLeagueButton.innerText = 'Add a New League'
    newLeagueButton.addEventListener('click', () => {
        createNewLeagueForm()
    })
}

function createEditLeagueButton(league) {
    const editLeagueButton = document.createElement('button') 
    const docMain = document.querySelector('#main')
    docMain.appendChild(editLeagueButton)
    editLeagueButton.innerText = 'Edit League'
    editLeagueButton.addEventListener('click', () => {
        createEditLeagueForm(league)
    })
}

function createDeleteLeagueButton(league) {
    const deletedLeague = new League(league.id, league.name, league.logo, league.country, league.divsion)
    const deleteLeagueButton = document.createElement('button') 
    const docMain = document.querySelector('#main') 
    docMain.appendChild(deleteLeagueButton) 
    deleteLeagueButton.innerText = 'Delete League' 
    deleteLeagueButton.addEventListener('click', () => {
        deletedLeague.deleteLeague()
    })
}

function createTeamsButton() {
    const teamsButton = document.createElement('button')
    const docNav = document.querySelector('#nav') 
    docNav.prepend(teamsButton)
    teamsButton.innerText = 'Teams Page'
    teamsButton.addEventListener('click', () => {
        fetchTeams()
    })
}

function createLeagueTeamsButton(league) {
    const leagueTeamsButton = document.createElement('button') 
    const docMain = document.querySelector('#main')
    leagueTeamsButton.setAttribute('id', 'league-teams-button')
    docMain.appendChild(leagueTeamsButton) 
    leagueTeamsButton.innerText = 'Show Teams in This League'
    leagueTeamsButton.addEventListener('click', () => {
        fetchLeagueTeams(league)
    })
}

function createTeamLeagueButton(team) {
    const teamLeagueButton = document.createElement('button')
    const docMain = document.querySelector('#main')
    docMain.appendChild(teamLeagueButton)
    teamLeagueButton.innerText = `Return to League`
    const teamLeague = new League(team.league_id, '', '', '', '')
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
    const deletedTeam = new Team(team.id, team.name, team.logo, team.nickname, team.stadium, team.manager, team.year_founded)
    const deleteTeamButton = document.createElement('button') 
    const docMain = document.querySelector('#main') 
    docMain.appendChild(deleteTeamButton) 
    deleteTeamButton.innerText = 'Delete Team' 
    deleteTeamButton.addEventListener('click', () => {
        deletedTeam.deleteTeam()
    })
}

function createNewLeagueForm() {
    const newLeagueForm = document.createElement('form')
    const docMain = document.querySelector('#main')
    const newLeagueButton = document.querySelector('#new-league')
    
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
    
    docMain.innerHTML = ''
    editLeagueForm.innerHTML = html
    docMain.append(editLeagueForm)
    editedLeague.renderLeague()
    editLeagueForm.addEventListener('submit', () => {
        editedLeague.editLeague()
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
    const editedTeam = new Team(team.id, team.name, team.logo, team.nickname, team.stadium, team.manager, team.year_founded)
    let html = `
        <form onsubmit="createEditTeam; return false;">
        <label>Team Name: </label>
        <input type="text" id="team_name" value="${editedTeam.name}"><br>
        <label>Team Logo: </label>
        <input type="text" id="team_logo" value="${editedTeam.logo}"><br>
        <label>Team Nickname: </label>
        <input type="text" id="team_nickname" value="${editedTeam.nickname}"><br>
        <label>Team Stadium: </label>
        <input type="text" id="team_stadium" value="${editedTeam.stadium}"><br>
        <label>Team Manager: </label>
        <input type="text" id="team_manager" value="${editedTeam.manager}"><br>
        <label>Year Team Founded: </label>
        <input type="text" id="team_year_founded" value="${editedTeam.year_founded}"><br>
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
    editedTeam.renderTeam()
    editTeamForm.addEventListener('submit', () => {
        editedTeam.editTeam()
    })
}

function clearForm() {
    let form = document.querySelector('form')
    form.remove()
}