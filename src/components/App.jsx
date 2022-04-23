import React, { Component } from 'react';
import Navbar from './Navbar';
import Main from './Main';
import Loader from './Loader';
import Web3 from 'web3';
import Tether from '../truffle-abis/Tether.json';
import Reward from '../truffle-abis/Reward.json';
import DeBank from '../truffle-abis/DeBank.json';

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
    } else {
      window.alert('Error! Tether contract is not deployed to detect network');
    }

    // Load Reward contract
    const rewardData = Reward.networks[networkId];

    if (rewardData) {
      const reward = new web3.eth.Contract(Reward.abi, rewardData.address);
      this.setState({ reward });
      let rewardBalance = await reward.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ rewardBalance: rewardBalance.toString() });
    } else {
      window.alert('Error! Reward contract is not deployed to detect network');
    }

    // Load DeBank contract
    const debankData = DeBank.networks[networkId];

    if (debankData) {
      const debank = new web3.eth.Contract(DeBank.abi, debankData.address);
      this.setState({ debank });
      let stakingBalance = await debank.methods
        .stakingBalances(this.state.account)
        .call();
      this.setState({ stakingBalance: stakingBalance.toString() });
    } else {
      window.alert('Error! DeBank contract is not deployed to detect network');
    }

    this.setState({ loading: false });
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
    let content;

    {
      this.state.loading
        ? (content = <Loader />)
        : (content = (
            <Main
              tetherBalance={this.state.tetherBalance}
              rewardBalance={this.state.rewardBalance}
              stakingBalance={this.state.stakingBalance}
            />
          ));
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row content">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: '600px', minHeight: '100vm' }}
            >
              {content}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
