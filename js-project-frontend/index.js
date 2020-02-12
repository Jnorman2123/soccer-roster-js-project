const baseUrl = 'http://localhost:3000/'
document.addEventListener('DOMContentLoaded', () => {
    console.log('this is working')
    fetch(baseUrl + 'leagues')
    .then(response => response.json())
    .then((leagueData) => {
        console.log(leagueData)
    })
})