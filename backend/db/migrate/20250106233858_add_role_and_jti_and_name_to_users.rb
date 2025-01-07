class AddRoleAndJtiAndNameToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :role, :integer, default: 0
    add_column :users, :name, :string
    add_column :users, :jti, :string, null: false
    add_index :users, :jti, unique: true
  end
end
