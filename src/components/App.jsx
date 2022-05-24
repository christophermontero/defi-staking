import React, { Component } from 'react';
import ParticlesSettings from './ParticleSettings';
import Navbar from './Navbar';
import Main from './Main';
import Loader from './Loader';
import Web3 from 'web3';
import Tether from '../truffle-abis/Tether.json';
import Reward from '../truffle-abis/Reward.json';
import DeBank from '../truffle-abis/DeBank.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '0x0',
      tether: {},
      reward: {},
      debank: {},
      tetherBalance: 0,
      rewardBalance: 0,
      stakingBalance: 0,
      loading: true
    };
  }

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

  // Staking function
  stakeTokens = (amount) => {
    this.setState({ loading: true });

    this.state.tether.methods
      .approve(this.state.debank._address, amount)
      .send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        this.state.debank.methods
          .depositTokens(amount)
          .send({ from: this.state.account })
          .on('transactionHash', (hash) => {
            this.setState({ loading: false });
            window.location.reload(false);
          });
      });
  };

  // Unstaking function
  unstakeTokens = () => {
    this.setState({ loading: true });

    this.state.debank.methods
      .unstakeTokens()
      .send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        this.setState({ loading: false });
        window.location.reload(false);
      });
  };

  // Release reward
  issueReward = () => {
    this.setState({ loading: true });

    this.state.debank.methods
      .issueTokens()
      .send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        this.setState({ loading: false });
        window.location.reload(false);
      });
  };

  // Claim reward
  claimReward = () => {
    this.setState({ loading: true });

    console.log('Reward balance', this.state.rewardBalance);
    this.state.reward.methods
      .claim()
      .send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        this.setState({ loading: false });
        window.location.reload(false);
      });
  };

  render() {
    let content;

    {
      this.state.loading
        ? (content = <Loader />)
        : (content = (
            <Main
              account={this.state.account}
              tetherBalance={this.state.tetherBalance}
              rewardBalance={this.state.rewardBalance}
              stakingBalance={this.state.stakingBalance}
              stakeTokens={this.stakeTokens}
              unstakeTokens={this.unstakeTokens}
              issueReward={this.issueReward}
              claimReward={this.claimReward}
            />
          ));
    }

    return (
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute' }}>
          <ParticlesSettings />
        </div>
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
