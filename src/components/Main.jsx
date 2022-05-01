import React, { Component } from 'react';
import tether from '../tether.png';

class Main extends Component {
  render() {
    return (
      <div id="content" className="mt-3">
        <table className="table text-muted text-center">
          <thead>
            <tr style={{ color: 'black' }}>
              <th scope="col">Staking balance</th>
              <th scope="col">Reward balance</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ color: 'black' }}>
              <td>
                {window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')}{' '}
                USDT
              </td>
              <td>
                {window.web3.utils.fromWei(this.props.rewardBalance, 'Ether')}{' '}
                RWD
              </td>
            </tr>
          </tbody>
        </table>
        <div className="card mb-2 p-1" style={{ opacity: '0.9' }}>
          <form
            className="mb-3"
            onSubmit={event => {
              event.preventDefault();

              let amount;
              amount = this.input.value.toString();
              console.log('amount:', amount);
              amount = window.web3.utils.toWei(amount, 'Ether');

              this.props.stakeTokens(amount);
            }}
          >
            <div style={{ borderSpacing: '0 1em' }}>
              <label className="float-left" style={{ marginLeft: '15px' }}>
                <b>Stake tokens</b>
              </label>
              <span
                className="float-right"
                style={{ marginLeft: '8px', marginRight: '15px' }}
              >
                Balance:{' '}
                {window.web3.utils.fromWei(this.props.tetherBalance, 'Ether')}
              </span>
              <div className="input-group ml-3 mb-4">
                <input
                  ref={input => {
                    this.input = input;
                  }}
                  type="text"
                  placeholder=" 0"
                  required
                />
                <div className="input-group-open ml-2">
                  <div className="input-group-text">
                    <img src={tether} height="35px" alt="tether logo" />
                    &nbsp;&nbsp;&nbsp;USDT
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Deposit
              </button>
            </div>
          </form>
          <button className="btn btn-primary btn-lg btn-block">Withdraw</button>
          <div className="card-body text-center" style={{ color: 'blue' }}>
            Airdrop
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
