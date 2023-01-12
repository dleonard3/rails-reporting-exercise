class Business < ApplicationRecord
  has_many :jobs, foreign_key: "customer_id"
  has_many :invoices
  has_many :payments

  def job_amounts
    jobs = Job.where(customer_id: id)
    amounts = 0
    jobs.each do |job|
      amounts = amounts + job.line_item_amounts
    end

    return amounts
  end

  def invoice_amounts
    invoices = Invoice.where(business_id: id)
    amounts = 0
    invoices.each do |invoice|
      amounts = amounts + invoice.line_item_amounts
    end

    return amounts
  end

  def remaining_invoice_amounts
    
  end
end
