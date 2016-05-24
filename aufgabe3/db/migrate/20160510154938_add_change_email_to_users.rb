class AddChangeEmailToUsers < ActiveRecord::Migration
  def change
    add_column :users, :email_change_at, :datetime
    add_column :users, :email_change_digest, :string
    add_column :users, :email_to_verify, :string
  end
end
