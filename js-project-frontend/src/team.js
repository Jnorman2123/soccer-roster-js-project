class Team {
    constructor(id, name, logo, nickname, stadium, manager, year_founded, league_id) {
        this.id = id
        this.name = name
        this.logo = logo
        this.nickname = nickname
        this.stadium = stadium
        this.manager = manager
        this.year_founded = year_founded
        this.league_id = league_id
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
        teamCard.setAttribute('id', 'team_card')
        teamName.setAttribute('id', 'team_name')
        teamLogo.setAttribute('id', 'team_logo')
        teamNickname.setAttribute('id', 'team_nickname')
        teamStadium.setAttribute('id', 'team_stadium')
        teamManager.setAttribute('id', 'team_manager')
        teamYearFounded.setAttribute('id', 'team_year_founded')
        docMain.appendChild(teamCard)
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
            const newTeam = new Team(team.id, team.name, team.logo, team.nickname, team.stadium, team.manager, team.year_founded)
            newTeam.renderTeam()
        })
    }

    editTeam() {
        const teamID = ''
        const teamName = document.getElementById('team_name').value
        const teamLogo = document.getElementById('team_logo').value
        const teamNickname = document.getElementById('team_nickname').value
        const teamStadium = document.getElementById('team_stadium').value
        const teamManager = document.getElementById('team_manager').value
        const teamYearFounded = document.getElementById('team_year_founded').value
        const team = new Team(teamID, teamName, teamLogo, teamNickname, teamStadium, teamManager, teamYearFounded)

        fetch(teamsUrl + `/${this.id}`, {
            method: 'PATCH',
            body: JSON.stringify(team),
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
}