json.name 'welcome/index'

json.customers do
  json.array! @customers do |customer|
    json.extract! customer, :id, :name, :job_amounts, :invoice_amounts
  end
end
