class Job < ApplicationRecord
  belongs_to :customer, class_name: "Business"
  has_many :line_items

  def line_item_amounts
    jobs_line_items_amounts = LineItem.where(job_id: id).sum(:amount)

    return jobs_line_items_amounts
  end
end
