class WelcomeController < ApplicationController
  def index
    @customers = Business.all.includes(:jobs)
                             .includes(:invoices)
                             .includes(:payments)
    @payments = Payment.all
  end
end
