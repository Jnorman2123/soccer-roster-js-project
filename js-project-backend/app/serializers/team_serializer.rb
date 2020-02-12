class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :logo, :nickname, :stadium, :manager, :year_founded, :league_id
end
