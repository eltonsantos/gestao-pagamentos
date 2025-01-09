class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :name, :role

  has_one :commission, serializer: CommissionSerializer
end
