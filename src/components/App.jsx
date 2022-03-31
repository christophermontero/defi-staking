import React, { Component } from 'react';
import Navbar from './Navbar';
import Web3 from 'web3';
import Tether from '../truffle-abis/Tether.json';

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
    const networkId = await web3.eth.net.getId();

    // Load Tether contract
    const tetherData = Tether.networks[networkId];

    if (tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      this.setState({ tether });
      let tetherBalance = await tether.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ tetherBalance: tetherBalance.toString() });
      console.log('Tether balance', tetherBalance);
    } else {
      window.alert('Error! Tether contract is not deployed to detect network');
    }
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
