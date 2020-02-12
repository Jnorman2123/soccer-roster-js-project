# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
leagues = League.create([{ name: 'English Premier League', logo: 'https://a1.espncdn.com/combiner/i?img=%2Fi%2Fleaguelogos%2Fsoccer%2F500%2F23.png', country: 'England', division: "1st"}, 
    { name: 'LaLiga Santander', logo: 'https://i.pinimg.com/600x315/21/51/49/2151491e4502460763fe81aff4473217.jpg', country: 'Spain', division: '1st'}])

teams = Team.create([{ name: 'Chelsea F.C.', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/180px-Chelsea_FC.svg.png', nickname: 'The Blues, The Pensioners', stadium: 'Stamford Bridge', manager: 'Frank Lampard', year_founded: 1905, league_id: 1}, 
    { name: 'Barcelona F.C.', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/180px-FC_Barcelona_%28crest%29.svg.png', nickname: 'Barca, Blaugrana', stadium: 'Camp Nou', manager: 'Quigue Setien', year_founded: 1899, league_id: 2}]) 
    
players = Player.create([{ name: 'Lionel Messi', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRGqDnKbwHv1gHwsq6ZB0ELtcAE-wxLKVjSVY6vyjjCGe7TtjyX', nationality: 'Argentina', appearances: 713, goals: 622, market_value: '$154.00 million', jersey_number: 10, age: 32, team_id: 2}, 
    { name: 'Christian Pulisic', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQYrPNhX7CH6urKJs1oBa4GedN3P6THlB_dNbNedioV2c9gfl0', nationality: 'United States of America', appearances: 23, goals: 6, market_value: '$66.00 million', jersey_number: 22, age: 21, team_id: 1}])    