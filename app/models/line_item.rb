class LineItem < ApplicationRecord
  belongs_to :job, optional: true
  belongs_to :payment, optional: true
  belongs_to :self, class_name: "LineItem", optional: true
  belongs_to :invoice, optional: true

  has_many :invoices, class_name: "LineItem", foreign_key: "job_id"
  has_many :payments, class_name: "LineItem", foreign_key: "invoice_id"
end
