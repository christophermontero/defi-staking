const DeBank = artifacts.require('DeBank');
const Reward = artifacts.require('Reward');
const Tether = artifacts.require('Tether');

module.exports = async function (deployer) {
  await deployer.deploy(DeBank);
  await deployer.deploy(Reward);
  await deployer.deploy(Tether);
};
