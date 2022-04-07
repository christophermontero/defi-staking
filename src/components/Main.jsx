import React, { Component } from 'react';
import tether from '../tether.png';

class Main extends Component {
  render() {
    return (
      <div id="content" className="mt-3">
        <table className="table text-muted text-center">
          <thead>
            <tr style={{ color: 'white' }}>
              <th scope="col">Staking balance</th>
              <th scope="col">Reward balance</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ color: 'white' }}>
              <td>USDT</td>
              <td>RWD</td>
            </tr>
          </tbody>
        </table>
        <div className="card mb-2" style={{ opacity: '0.9' }}>
          <form className="mb-3">
            <div style={{ borderSpacing: '0 1em' }}>
              <label className="float-left" style={{ marginLeft: '15px' }}>
                <b>Stake tokens</b>
              </label>
              <span
                className="float-right"
                style={{ marginLeft: '8px', marginRight: '15px' }}
              >
                Balance:
              </span>
              <div className="input-group ml-3 mb-4">
                <input type="text" placeholder="0" required />
                <div className="input-grouped-open ml-2">
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
        </div>
      </div>
    );
  }
}

export default Main;
