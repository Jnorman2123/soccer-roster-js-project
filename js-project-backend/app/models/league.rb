class League < ApplicationRecord
    has_many :teams
    validates :name, :logo, :country, :division, presence: true
end
