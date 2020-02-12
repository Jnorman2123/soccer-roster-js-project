# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
leagues = League.create([{ name: 'English Premier League', logo: 'https://a1.espncdn.com/combiner/i?img=%2Fi%2Fleaguelogos%2Fsoccer%2F500%2F23.png', country: 'England', division: "1st"}, 
    { name: 'LaLiga Santander', logo: 'https://i.pinimg.com/600x315/21/51/49/2151491e4502460763fe81aff4473217.jpg', country: 'Spain', division: '1st'}])