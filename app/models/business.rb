class Business < ApplicationRecord
  has_many :jobs, foreign_key: "customer_id"
  has_many :invoices
  has_many :vendor_payments, class_name: "Payment", foreign_key: "payee_id"
  has_many :customer_payments, class_name: "Payment", foreign_key: "payer_id"

  def job_amounts
    customer_jobs_amounts = Job.includes(:line_items).where(customer_id: id).sum("line_items.amount")

    return customer_jobs_amounts
  end

  def invoices_for_customer
    customer_jobs = Job.includes(:line_items).where(customer_id: id).distinct
    invoices = Invoice.includes(:line_items).where('line_items.self_id': customer_jobs.ids)

    return invoices
  end

  def invoice_amounts
    return invoices_for_customer.sum(:amount)
  end

  def remaining_job_amount
    return job_amounts - invoices_for_customer.sum(:amount)
  end
end
