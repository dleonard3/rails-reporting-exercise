# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

prng = Random.new

vendors = [1, 2, 3].map {|_i| Business.create!(name: Faker::Company.name) }

bar = TTY::ProgressBar.new("seeding database [:bar]", total: 100)

100.times do
  customer = Business.create!(name: Faker::Company.name)
  jobs = [1, 2, 3].map { |_i| Job.create!(customer: customer, name: Faker::Educator.university) }
  invoices = [1, 2, 3].map { |_i| Invoice.create!(business: vendors.sample, number: Faker::Number.number(digits: 5), due_date: Faker::Date.forward(days: 90), status: ["paid", "unpaid", "draft"]) }

  invoice_line_items =
    (1..250).map do |_i|
      job_line_item = LineItem.create!(
        job: jobs.sample,
        invoice: nil,
        payment: nil,
        self_id: nil,
        description: Faker::Commerce.product_name,
        amount: Faker::Invoice.amount_between(from: 1.00, to: 1000.00),
      )

      if prng.rand(1.0) < 0.5 then
        LineItem.create!(
          job: nil,
          invoice: invoices.sample,
          payment: nil,
          self_id: job_line_item.job_id,
          description: job_line_item.description,
          amount: job_line_item.amount
        )
      else
        nil
      end
    end.compact

    invoice_line_items.group_by { |item| item.invoice }.map do |invoice, items|
      paid_items = items.filter { |_item| prng.rand(1.0) < 0.5 }

      method = ["cheque", "credit card", "debit card"].sample
      amount = paid_items.sum { |item| item.amount }
      reference = if method == "cheque" then
        Faker::Number.number(digits: 3)
      else
        "x#{Faker::Number.number(digits: 4)}"
      end
      initiated = Faker::Date.backward(days: 365)
      completed =
        if prng.rand(1.0) < 0.5 then
          initiated + 7.days
        else
          nil
        end
      payment = Payment.create!(
        payer: customer,
        payee: invoice.business,
        amount: amount,
        reference: reference,
        payment_type: method,
        initiated_at: initiated,
        completed_at: completed
      )

      paid_items.each do |item|
         LineItem.create!(
          job: nil,
          invoice: nil,
          payment: payment,
          self_id: item.id,
          description: item.description,
          amount: item.amount
        )
      end
    end
  bar.advance
end
