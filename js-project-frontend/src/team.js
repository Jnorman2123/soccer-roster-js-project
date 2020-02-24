function fetchTeams() {
    removeLeagueTeams()
    const docMain = document.querySelector('#main')
    docMain.innerHTML = ''
    createTeamTable()
    fetch(teamsUrl)
        .then(response => response.json())
        .then((teamData) => {
            Team.renderAllTeams(teamData)
        })
        .catch( (e) => {
            catchMessage(e)
        })
}

function fetchLeagueTeams(league) {
    removeLeagueTeams()
    const leagueTeams = document.createElement('div')
    leagueTeams.setAttribute('id', 'league-teams')
    document.querySelector('body').append(leagueTeams)
    createButton('new-team-button', 'league-teams', 'Add a New Team')
    addLeagueTeamsEventListeners(league)
    const docMain = document.querySelector('#main')
    const leagueTeamsButton = document.querySelector('#league-teams-button')
    docMain.removeChild(leagueTeamsButton)
    createTeamTable()
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
        .catch( (e) => {
            catchMessage(e)
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
            createTeamTable()
            addTeamEventListeners(theTeam)
            theTeam.renderTeam('main')
        })
        .catch( (e) => {
            catchMessage(e)
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
        const teamTable = document.querySelector('#team-table')
        const teamCard = document.createElement('div')
        const teamName = document.createElement('h2')
        const teamLogo = document.createElement('img')
        const teamInfo = document.createElement('div')
        const teamNickname = document.createElement('h3')
        const teamStadium = document.createElement('h4')
        const teamManager = document.createElement('p')
        const teamYearFounded = document.createElement('p')
        div.appendChild(teamTable)
        teamTable.appendChild(teamCard)
        teamCard.setAttribute('id', 'team-card')
        teamName.setAttribute('id', 'team-name')
        teamLogo.setAttribute('id', 'team-logo')
        teamInfo.setAttribute('id', 'team-info')
        teamNickname.setAttribute('id', 'team-nickname')
        teamStadium.setAttribute('id', 'team-stadium')
        teamManager.setAttribute('id', 'team-manager')
        teamYearFounded.setAttribute('id', 'team-year-founded') 
        teamCard.appendChild(teamLogo)
        teamCard.appendChild(teamInfo)
        teamInfo.appendChild(teamName)
        teamInfo.appendChild(teamNickname)
        teamInfo.appendChild(teamStadium)
        teamInfo.appendChild(teamManager)
        teamInfo.appendChild(teamYearFounded)
        teamName.innerText = this.name
        teamLogo.src = this.logo
        teamNickname.innerText = this.nickname
        teamStadium.innerText = this.stadium
        teamManager.innerText = this.manager 
        teamYearFounded.innerText = this.year_founded
        teamCard.addEventListener('click', () => {
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
            name: document.querySelector('input[name="team_name"]').value,
            logo: document.querySelector('input[name="team_logo"]').value,
            nickname: document.querySelector('input[name="team_nickname"]').value,
            stadium: document.querySelector('input[name="team_stadium"]').value,
            manager: document.querySelector('input[name="team_manager"]').value,
            year_founded: document.querySelector('input[name="team_year_founded"]').value,
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
        .catch( (e) => {
            catchMessage(e)
        })
    }

    editTeam() {
        event.preventDefault()
        this.name = document.querySelector('input[name="team_name"]').value
        this.logo = document.querySelector('input[name="team_logo"]').value
        this.nickname = document.querySelector('input[name="team_nickname"]').value
        this.stadium = document.querySelector('input[name="team_stadium"]').value
        this.manager = document.querySelector('input[name="team_manager"]').value
        this.year_founded = document.querySelector('input[name="team_year_founded"]').value
        const editedTeam = new Team(this)

        fetch(teamsUrl + `/${this.id}`, {
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
        .catch( (e) => {
            catchMessage(e)
        })
    }

    deleteTeam() {
        return fetch(teamsUrl + `/${this.id}`, {
            method: 'DELETE'
        })
        .then(fetchTeams)
    }
}