import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Dashboard extends Component {

  calcAmounts = (items) => {
    const totalAmount = items.reduce((value, item) => {
        return value + parseFloat(item.line_item_amounts)
      }, 0)

    return totalAmount.toFixed(2)
  }


  customerSummary = (customer) => {
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
    const customers = this.props.customers.map((customer) => {
      return this.customerSummary(customer)
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
            <th>Job Items</th>
            <th>Jobs Items Not Invoiced</th>
            <th>Invoiced Items</th>
          </tr>
          {this.showCustomerSummary()}
        </table>
      </div>
    )
  }
}

Dashboard.propTypes = {
  customers: PropTypes.array,
}

export default Dashboard
