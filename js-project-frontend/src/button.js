class Button {
    constructor(button) {
        this.name = button.name 
        this.mount = button.mount
        this.action = button.action
        this.label = button.label
        this.listener = button.listener
    }
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