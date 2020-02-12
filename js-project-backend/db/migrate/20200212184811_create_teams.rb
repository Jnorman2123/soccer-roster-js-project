class CreateTeams < ActiveRecord::Migration[6.0]
  def change
    create_table :teams do |t|
      t.string :name
      t.string :logo
      t.string :nickname
      t.string :stadium
      t.string :manager
      t.integer :year_founded
      t.references :league, null: false, foreign_key: true

      t.timestamps
    end
  end
end
