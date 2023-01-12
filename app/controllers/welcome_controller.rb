class WelcomeController < ApplicationController
  def index
    @customers = Business.all.includes(:jobs).includes(:invoices)
    # .includes(:payment)
  end
end
