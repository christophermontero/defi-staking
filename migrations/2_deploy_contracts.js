const DeBank = artifacts.require('DeBank');
const Reward = artifacts.require('Reward');
const Tether = artifacts.require('Tether');

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Reward);
  const reward = await Reward.deployed();

  await deployer.deploy(Tether);
  const tether = await Tether.deployed();

  await deployer.deploy(DeBank, reward.address, tether.address);
  const debank = await DeBank.deployed();

  await reward.transfer(debank.address, '1000000000000000000000000');

  // Distribute 100 USDT to investor
  await tether.transfer(accounts[1], '100000000000000000000');
};
