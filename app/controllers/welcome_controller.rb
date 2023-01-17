class WelcomeController < ApplicationController
  def index
    get_customers
  end

  def get_customers
    @customers = Business.all.includes(:jobs)
                             .includes(customer_payments: [:line_items])
  end
end
