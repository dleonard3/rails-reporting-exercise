import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedItem: null,
    }
  }


  calcAmounts = (items) => {
    const totalAmount = items.reduce((value, item) => {
        return value + parseFloat(item.line_item_amounts)
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


  showInvoiceDetails = (invoices) => {
    const invoice_details = invoices.map((invoice, index) => {
      const payment = this.props.payments.find(payment => payment.id == invoice.id)

      return (
        <div key={index}>
          <span>Invoice {invoice.id}: {invoice.line_item_amounts} - </span>
          <span>
            Payments {payment.amount} by {payment.payment_type} (reference: {payment.reference})
          </span>
        </div>
      )
    })

    return invoice_details
  }

  viewDetail = (customer, index) => {
    if (this.state.clickedItem == index) {
      return (
        <div>
          <p>{customer.name} Invoice Details</p>
          {customer.invoices ? this.showInvoiceDetails(customer.invoices) : 'No Invoices Outstanding'}
        </div>
      )
    } else {
      return null
    }
  }

  customerSummary = (customer, index) => {
    return (
      <tr>
        <td>
          {customer.id}
        </td>
        <td>
          {customer.name}
        </td>
        <td>
          {customer.job_amounts}
        </td>
        <td>
          {customer.job_amounts - customer.invoice_amounts}
        </td>
        <td>
          {customer.invoice_amounts}
        </td>
      </tr>
    )
  }

  showCustomerSummary = () => {
    const customers = this.props.customers.map((customer, index) => {
      return (
        <div key={index} className='clickable' onClick={() => this.showDetail(index)}>
          {this.customerSummary(customer, index)}
          {this.viewDetail(customer, index)}
        </div>
      )
    })

    return customers
  }

  render() {
    return (
      <div>
        <h3>Dashboard</h3>
        <table>
          <tr>
            <th>Id</th>
            <th>Customer</th>
            <th>Job Amounts</th>
            <th>Jobs Amounts Not Invoiced</th>
            <th>Invoiced Amounts</th>
          </tr>
          {this.showCustomerSummary()}
        </table>
      </div>
    )
  }
}

Dashboard.propTypes = {
  customers: PropTypes.array,
  payments: PropTypes.array,
}

export default Dashboard
