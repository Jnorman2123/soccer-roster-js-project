function fetchTeams() {
    removeLeagueTeams()
    const docMain = document.querySelector('#main')
    docMain.innerHTML = ''
    fetch(teamsUrl)
        .then(response => response.json())
        .then((teamData) => {
            Team.renderAllTeams(teamData)
        })
}

function fetchLeagueTeams(league) {
    removeLeagueTeams()
    const leagueTeams = document.createElement('div')
    leagueTeams.setAttribute('id', 'league-teams')
    document.querySelector('body').append(leagueTeams)
    createButton('new-team-button', 'league-teams', 'Add a New Team')
    createButton('delete-league-teams-button', 'league-teams', 'Delete This Leagues Teams')
    addLeagueTeamsEventListeners(league)
    const docMain = document.querySelector('#main')
    const leagueTeamsButton = document.querySelector('#league-teams-button')
    docMain.removeChild(leagueTeamsButton)
    fetch(teamsUrl)
        .then(response => response.json())
        .then((teamData) => {
            return teamData.map(team => {
                if (league.id === team.league_id) {
                    const theTeam = new Team(team)
                    theTeam.renderTeam('league-teams')
                }
            })
        })
}

function fetchTeam(team) {
    removeLeagueTeams()
    fetch(teamsUrl + `/${team.id}`)
        .then(response => response.json())
        .then(teamData => {
            theTeam = new Team(teamData)
            const docMain = document.querySelector('#main')
            docMain.innerHTML = ''     
            createTeamLeagueButton(theTeam)
            createButton('edit-team-button', 'main', 'Edit Team')
            createButton('delete-team-button', 'main', 'Delete Team')
            addTeamEventListeners(theTeam)
            theTeam.renderTeam('main')
        })
}

class Team {
    constructor(team) {
        this.id = team.id
        this.name = team.name
        this.logo = team.logo
        this.nickname = team.nickname
        this.stadium = team.stadium
        this.manager = team.manager
        this.year_founded = team.year_founded
        this.league_id = team.league_id
    }

    renderTeam(divId) {

        const div = document.querySelector(`#${divId}`)
        const teamCard = document.createElement('div')
        const teamName = document.createElement('h2')
        const teamLogo = document.createElement('img')
        const teamNickname = document.createElement('h3')
        const teamStadium = document.createElement('h4')
        const teamManager = document.createElement('p')
        const teamYearFounded = document.createElement('p')
        div.appendChild(teamCard)
        teamCard.setAttribute('id', 'team-card')
        teamName.setAttribute('id', 'team-name')
        teamLogo.setAttribute('id', 'team-logo')
        teamNickname.setAttribute('id', 'team-nickname')
        teamStadium.setAttribute('id', 'team-stadium')
        teamManager.setAttribute('id', 'team-manager')
        teamYearFounded.setAttribute('id', 'team-year-founded') 
        teamCard.appendChild(teamName)
        teamCard.appendChild(teamLogo)
        teamCard.appendChild(teamNickname)
        teamCard.appendChild(teamStadium)
        teamCard.appendChild(teamManager)
        teamCard.appendChild(teamYearFounded)
        teamName.innerText = this.name
        teamLogo.src = this.logo
        teamNickname.innerText = this.nickname
        teamStadium.innerText = this.stadium
        teamManager.innerText = this.manager 
        teamYearFounded.innerText = this.year_founded
        teamName.addEventListener('click', () => {
            fetchTeam(this)
        })
    }

    static renderAllTeams(teams) {
        return teams.map(team => {
            const newTeam = new Team(team)
            newTeam.renderTeam('main')
        })
    }

    static createNewTeam(league) {
        event.preventDefault()
        const newTeam = {
            id: '',
            name: document.getElementById('team-name').value,
            logo: document.getElementById('team-logo').value,
            nickname: document.getElementById('team-nickname').value,
            stadium: document.getElementById('team-stadium').value,
            manager: document.getElementById('team-manager').value,
            year_founded: document.getElementById('team-year-founded').value,
            league_id: league.id
        }
        
        fetch(teamsUrl, {
            method: 'POST',
            body: JSON.stringify(newTeam),
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
            fetchLeague(league)   
        })
    }

    static editTeam(team) {
        event.preventDefault()
        const leagueIds = document.getElementsByTagName('option')
        let leagueId 
        for (const league of leagueIds) {
            if (!!league.selected) {
                leagueId = league.value
            }
        }
        team.name = document.getElementById('team-name').value
        team.logo = document.getElementById('team-logo').value
        team.nickname = document.getElementById('team-nickname').value
        team.stadium = document.getElementById('team-stadium').value
        team.manager = document.getElementById('team-manager').value
        team.year_founded = document.getElementById('team-year-founded').value
        team.league_id = leagueId
        const editedTeam = new Team(team)

        fetch(teamsUrl + `/${team.id}`, {
            method: 'PATCH',
            body: JSON.stringify(editedTeam),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            return response.json()
        })
        .then((data) => {
            clearForm()
            fetch(teamsUrl + `/${data.id}`)
                .then(response => response.json())
                .then(teamData => {
                    return fetchTeam(teamData)
                })   
        })
    }

    deleteTeam() {
        return fetch(teamsUrl + `/${this.id}`, {
            method: 'DELETE'
        })
        .then(fetchTeams)
    }
}