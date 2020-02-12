class LeagueSerializer < ActiveModel::Serializer
  attributes :id, :name, :logo, :country, :division
end
