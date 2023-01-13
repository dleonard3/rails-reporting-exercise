json.name 'welcome/index'

json.customers do
  json.array! @customers do |customer|
    json.extract! customer, :id, :name, :job_amounts, :invoice_amounts
    json.jobs do
      if customer.jobs
        json.array! customer.jobs do |job|
          json.extract! job, :id, :name
        end
      end
    end
    json.invoices do
      if customer.invoices
        json.array! customer.invoices do |invoice|
          json.extract! invoice, :id, :number, :due_date, :line_item_amounts
        end
      end
    end
    json.payments do
      if customer.payments
        json.array! customer.payments do |payment|
          json.extract! payment, :id, :payer_id, :payee_id, :amount, :reference, :payment_type
        end
      end
    end
  end
end
json.payments do
  json.array! @payments do |payment|
    json.extract! payment, :id, :payer_id, :payee_id, :amount, :reference, :payment_type
  end
end
