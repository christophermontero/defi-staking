import React, { Component } from 'react'
import bank from '../bank.png'

class Navbar extends Component {
  render() {
    return (
      <div
        className="navbar navbar-dark fixed-top shadow p-0"
        style={{ backgroundColor: 'black', height: '50px' }}
      >
        <a
          className="navbar-brand col-sm-3 col-md mr-0"
          href="#"
          style={{ color: 'white' }}
        >
          <img
            src={bank}
            alt="bank logo"
            width="50"
            height="30"
            className="d-inline-block aling-top"
          />
          &nbsp; Dapp yield staking
        </a>
        <ul className="navbar-nav px-3">
          <li className="text-nowrap d-none nav-item d-sm-none d-sm-block">
            <small style={{ color: 'white' }}>
              ACCOUNT NUMBER: {this.props.account}
            </small>
          </li>
        </ul>
      </div>
    )
  }
}

export default Navbar
