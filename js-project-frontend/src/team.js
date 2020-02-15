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
                    const theTeam = new Team(team)
                    theTeam.renderTeam()
                }
            })
        })
}

function fetchTeam(team) {
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
            theTeam.renderTeam()
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

    renderTeam() {
        const docMain = document.querySelector('#main')
        const teamCard = document.createElement('div')
        const teamName = document.createElement('h2')
        const teamLogo = document.createElement('img')
        const teamNickname = document.createElement('h3')
        const teamStadium = document.createElement('h4')
        const teamManager = document.createElement('p')
        const teamYearFounded = document.createElement('p')
        docMain.appendChild(teamCard)
        teamCard.setAttribute('id', 'team_card')
        teamName.setAttribute('id', 'team_name')
        teamLogo.setAttribute('id', 'team_logo')
        teamNickname.setAttribute('id', 'team_nickname')
        teamStadium.setAttribute('id', 'team_stadium')
        teamManager.setAttribute('id', 'team_manager')
        teamYearFounded.setAttribute('id', 'team_year_founded') 
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
            newTeam.renderTeam()
        })
    }

    static createNewTeam() {
        event.preventDefault()
        const leagueIds = document.getElementsByTagName('option')
        let leagueId 
        for (const league of leagueIds) {
            if (!!league.selected) {
                leagueId = league.value
            }
        }
        const newTeam = {
            id: '',
            name: document.getElementById('team_name').value,
            logo: document.getElementById('team_logo').value,
            nickname: document.getElementById('team_nickname').value,
            stadium: document.getElementById('team_stadium').value,
            manager: document.getElementById('team_manager').value,
            year_founded: document.getElementById('team_year_founded').value,
            league_id: leagueId
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
            fetchTeams()   
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
        team.name = document.getElementById('team_name').value
        team.logo = document.getElementById('team_logo').value
        team.nickname = document.getElementById('team_nickname').value
        team.stadium = document.getElementById('team_stadium').value
        team.manager = document.getElementById('team_manager').value
        team.year_founded = document.getElementById('team_year_founded').value
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