import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedItem: null,
      minimum: null,
      maximum: null,
      customers: this.sortedCustomers(this.props.customers),
    }
  }

  filterCustomers = () => {
    const min = this.state.minimum || 0
    const max = this.state.maximum || this.maxRemaining(this.sortedCustomers(this.props.customers))

    const customers = this.props.customers.filter((customer) => {
      return parseFloat(customer.remaining) >= parseFloat(min) && parseFloat(customer.remaining) <= parseFloat(max)
    })
    const sorted = this.sortedCustomers(customers)

    this.setState({customers: sorted})
  }

  sortedCustomers = (customers) => {
    return customers.sort((a, b) => a.remaining - b.remaining)
  }


  maxRemaining = (customers) => {
    const last = customers[customers.length - 1]

    return last.remaining
  }

  calcAmounts = (items) => {
    const totalAmount = items.reduce((value, item) => {
        return value + parseFloat(item.amount)
      }, 0)

    return totalAmount.toFixed(2)
  }

  showDetail = (index) => {
    if (this.state.clickedItem == index) {
      this.setState({clickedItem: null})
    } else {
      this.setState({clickedItem: index})
    }
  }


  showInvoiceDetails = (customer) => {
    const invoiceDetails = customer.invoices.map((invoice, index) => {
      return (
        <div key={index}>
          <span>Invoice {invoice.id}: {invoice.amount}</span> Payments:
          {customer.payments.length ? this.showPaymentDetails(customer.payments, invoice) : null}
        </div>
      )
    })

    return invoiceDetails
  }

  showPaymentDetails = (payments, invoice) => {
    const paymentLineItems = payments.map((payment, index) => {
      const paymentsOnInvoice = invoice.line_items.reduce((value, item) => {
        const paymentItems = payment.line_items.filter(pItem => pItem.self_id == item.id)
        const itemAmounts = paymentItems.reduce((pValue, paymentItem) => {
          return parseFloat(paymentItem.amount)
        }, 0)

        return value + itemAmounts
      }, 0)
      if (paymentsOnInvoice > 0) {
        return (
          <span key={index}>
            {paymentsOnInvoice.toFixed(2)} by {payment.payment_type} (reference: {payment.reference})
          </span>
        )
      }
    })

    return paymentLineItems
  }

  viewDetail = (customer, index) => {
    if (this.state.clickedItem == index) {
      return (
        <div>
          <p>Invoice Details</p>
          {customer.invoices.length ? this.showInvoiceDetails(customer) : 'No Invoices Outstanding'}
        </div>
      )
    } else {
      return null
    }
  }

  customerSummary = (customer, index) => {
    const invoiceAmounts = this.calcAmounts(customer.invoices)

    return (
      <div className='grid-container'>
        <div className="grid-column">
          {customer.id}
        </div>
        <div className="grid-column">
          {customer.name}
        </div>
        <div className="grid-column">
          {customer.job_amounts}
        </div>
        <div className="grid-column">
          {customer.remaining}
        </div>
        <div className="grid-column">
          {invoiceAmounts}
        </div>
      </div>
    )
  }

  showCustomerSummary = () => {
    const customers = this.state.customers.map((customer, index) => {
      return (
        <div key={index} className='clickable' onClick={() => this.showDetail(index)}>
          {this.customerSummary(customer, index)}
          {this.viewDetail(customer, index)}
        </div>
      )
    })

    return customers
  }

  onFilterChange = (type, e) => {
    this.setState({[type]: e.target.value})
  }

  filtersInputs = () => {
    return (
      <div>
        <p>Filter by Job Amounts Remaining to be invoiced</p>
        <span>Min</span>
        <input
          type='text'
          name='minimum'
          value={this.state.minimum}
          onChange={(e) => this.onFilterChange('minimum', e)}
        />
        <span>Max</span>
        <input
          type='text'
          name='maximum'
          value={this.state.maximum}
          onChange={(e) => this.onFilterChange('maximum', e)}
        />
        <button onClick={() => this.filterCustomers()}>Filter</button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h3>Dashboard</h3>
        {this.filtersInputs()}
        <div className='grid-container'>
          <div className="grid-item">Id</div>
          <div className="grid-item">Customer</div>
          <div className="grid-item">Job Amounts</div>
          <div className="grid-item">Jobs Amounts Not Invoiced</div>
          <div className="grid-item">Invoiced Amounts</div>
        </div>
        {this.showCustomerSummary()}
      </div>
    )
  }
}

Dashboard.propTypes = {
  payments: PropTypes.array,
}

export default Dashboard
