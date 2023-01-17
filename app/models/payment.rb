class Payment < ApplicationRecord
  belongs_to :payee, class_name: "Business"
  belongs_to :payer, class_name: "Business"
  has_many :line_items
end
