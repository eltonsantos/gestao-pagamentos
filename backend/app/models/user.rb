class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

  enum role: { seller: 0, admin: 1 }

  has_many :payments
  has_one :commission

  validates :password_confirmation, presence: true, on: %i[create update]

  def generate_jwt_token
    JWT.encode({ sub: id, role: role, exp: 24.hours.from_now.to_i }, Rails.application.credentials.devise_jwt_secret_key!)
  end
end
