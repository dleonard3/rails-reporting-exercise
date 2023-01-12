class Invoice < ApplicationRecord
  belongs_to :business
  has_many :line_items

  def line_item_amounts
    invoice_line_items_amounts = LineItem.where(invoice_id: id).sum(:amount)

    return invoice_line_items_amounts
  end
end
