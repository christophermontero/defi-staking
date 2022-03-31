import React, { Component } from 'react';
import Navbar from './Navbar';
import Web3 from 'web3';

class App extends Component {
  async UNSAFE_componentWillMount() {
    await this.loadedWeb3();
    await this.loadBlockchainData();
  }

  async loadedWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('No ethereum browser detected! You can check out Metamask');
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    this.setState({ account: account[0] });
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '0x0',
      tether: {},
      reward: {},
      deBank: {},
      tetherBalance: 0,
      rewardBalance: 0,
      stakingBalance: 0,
      loading: true
    };
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
      </div>
    );
  }
}

export default App;
