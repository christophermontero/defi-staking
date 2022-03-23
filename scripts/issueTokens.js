const DeBank = artifacts.require('DeBank');

module.exports = async function issueRewards(callback) {
  let debank = await DeBank.deployed();
  await debank.issueTokens();
  console.log();
  callback('Tokens have been issued successfully');
};
