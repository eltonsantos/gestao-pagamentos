class Payment < ApplicationRecord
  belongs_to :user
  belongs_to :customer

  enum status: { pending: 0, approved: 1, failed: 2 }
  enum gateway: { mercado_pago: 0, pagseguro: 1 }

  validates :value, presence: true, numericality: { greater_than: 0 }
  validates :gateway, presence: true

  def formatted_value
    "R$ #{'%.2f' % value}".gsub('.', ',')
  end

  def as_json(options = {})
    super(options).merge({
      'status' => status,
      'gateway' => gateway
    })
  end
end
