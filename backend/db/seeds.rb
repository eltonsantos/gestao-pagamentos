puts "Criando Administrador..."
admin = User.create(
  name: "Administrador", 
  email: "admin@admin.com", 
  password: "123456", 
  password_confirmation: "123456", 
  role: 1
)

puts "Criando Vendedores..."
10.times do |i|
  seller = User.create(
    name: "Vendedor #{i+1}",
    email: "vendedor#{i+1}@vendedor.com",
    password: "123456",
    password_confirmation: "123456",
    role: 0
  )
  
  commission = Commission.create(
    user: seller,
    percentage: rand(5..15)
  )

  puts "Criado #{seller.name} com comissão de #{commission.percentage}%"
end

puts "Criando Clientes..."
10.times do |i|
  Customer.create(
    name: "Cliente #{i+1}",
    email: "cliente#{i+1}@cliente.com",
    phone: "8598765#{i+1}#{i+1}#{i+1}#{i+1}"
  )
end

puts "Criando Pagamentos..."
10.times do |i|
  seller = User.where(role: 0).order('RANDOM()').first
  customer = Customer.find(i+1)
  
  payment = Payment.create(
    value: rand(100..1000).to_f,
    status: Payment.statuses.keys.sample,
    gateway: Payment.gateways.keys.sample,
    user_id: seller.id,
    customer_id: customer.id,
    created_at: Faker::Time.between(from: DateTime.now - 6.months, to: DateTime.now)
  )
  
  puts "Criado pagamento de R$ #{payment.value} para o #{customer.name} com o #{seller.name}."
end

puts "Seed concluído!"
