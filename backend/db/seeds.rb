User.create(name: "Vendedor", email: "vendedor@vendedor.com", password: 123456, password_confirmation: 123456, role: 0)
User.create(name: "Administrador", email: "admin@admin.com", password: 123456, password_confirmation: 123456, role: 1)

5.times do |i|
  Customer.create(
    name: "Cliente #{i+1}",
    email: "cliente#{i+1}@cliente.com",
    phone: "8598765#{i+1}#{i+1}#{i+1}#{i+1}"
  )
end