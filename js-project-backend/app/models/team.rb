class Team < ApplicationRecord
  belongs_to :league
  has_many :players
  validates :name, :logo, :nickname, :stadium, :manager, :year_founded, presence: true
end
