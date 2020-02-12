class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :nationality, :appearances, :goals, :market_value, :jersey_number, :team_id
end
