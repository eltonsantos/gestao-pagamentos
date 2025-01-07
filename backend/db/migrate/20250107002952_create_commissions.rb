class CreateCommissions < ActiveRecord::Migration[7.1]
  def change
    create_table :commissions do |t|
      t.references :user, null: false, foreign_key: true
      t.decimal :percentage

      t.timestamps
    end
  end
end
