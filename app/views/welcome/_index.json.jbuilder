json.name 'welcome/index'

json.customers do
  json.array! @customers do |customer|
    json.extract! customer, :id, :name, :job_amounts
    json.remaining customer.job_amounts - customer.invoices_for_customer.sum(:amount)
    json.invoices do
      json.array! customer.invoices_for_customer do |invoice|
        json.id invoice.id
        json.amount invoice.line_items.sum(:amount)
        json.line_items invoice.line_items
      end
    end
    json.payments do
      json.array! customer.customer_payments do |payment|
        json.extract! payment, :id, :payer_id, :payee_id, :amount, :reference, :payment_type, :line_items
      end
    end
  end
end
