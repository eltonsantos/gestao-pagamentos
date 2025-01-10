class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :name, :email
  has_many :payments
end