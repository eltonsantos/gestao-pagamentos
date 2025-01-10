class CommissionSerializer < ActiveModel::Serializer
  include JSONAPI::Serializer
  attributes :id, :percentage
end