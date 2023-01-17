class LineItem < ApplicationRecord
  belongs_to :job, optional: true
  belongs_to :payment, optional: true
  belongs_to :self, class_name: "LineItem", optional: true
  belongs_to :invoice, optional: true
end
