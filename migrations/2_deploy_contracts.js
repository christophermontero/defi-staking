const DeBank = artifacts.require('DeBank');
const Reward = artifacts.require('Reward');
const Tether = artifacts.require('Tether');

module.exports = async function (deployer, network, accounts) {
  const tether = await deployer.deploy(DeBank);
  const reward = await deployer.deploy(Reward);
  const debank = await deployer.deploy(Tether);

  await reward.transfer(DeBank.address, 1000000000000000000000000);

  // Distribute 100 USDT to investor
  await tether.transfer(accounts[1], 1000000000000000000);
};
