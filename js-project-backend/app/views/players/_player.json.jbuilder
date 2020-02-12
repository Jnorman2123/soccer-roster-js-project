json.extract! player, :id, :name, :image, :nationality, :appearances, :goals, :market_value, :jersey_number, :age, :team_id, :created_at, :updated_at
json.url player_url(player, format: :json)
