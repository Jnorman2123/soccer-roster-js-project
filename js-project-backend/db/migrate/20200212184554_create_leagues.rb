class CreateLeagues < ActiveRecord::Migration[6.0]
  def change
    create_table :leagues do |t|
      t.string :name
      t.string :logo
      t.string :country
      t.string :division

      t.timestamps
    end
  end
end
