class Payment < ApplicationRecord
  belongs_to :payee, class_name: "Business"
  belongs_to :payer, class_name: "Business"
  has_many :line_items

  def line_item_amounts
    payment_line_items_amounts = LineItem.where(payment_id: id).sum(:amount)

    return payment_line_items_amounts
  end
end
