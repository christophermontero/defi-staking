require('chai').use(require('chai-as-promised')).should();

const DeBank = artifacts.require('DeBank');
const Reward = artifacts.require('Reward');
const Tether = artifacts.require('Tether');

contract('DeBank', ([owner, customer]) => {
  let tether, reward, debank;

  function convert(num) {
    return web3.utils.toWei(num, 'ether');
  }

  before(async () => {
    tether = await Tether.new();
    reward = await Reward.new();
    debank = await DeBank.new(reward.address, tether.address);

    // Transfer all tokens to DeBank
    await reward.transfer(debank.address, convert('1000000'));

    // Transfer 100 USDT to customer
    await tether.transfer(customer, convert('100'), { from: owner });
  });

  describe('Tether contract deployment', async () => {
    it('matches names successfully', async () => {
      const name = await tether.name();
      assert.equal(name, 'Tether');
    });

    it('matches symbol successfully', async () => {
      const symbol = await tether.symbol();
      assert.equal(symbol, 'USDT');
    });
  });

  describe('Reward token contract deployment', async () => {
    it('matches names successfully', async () => {
      const name = await reward.name();
      assert.equal(name, 'Reward token');
    });

    it('matches symbol successfully', async () => {
      const symbol = await reward.symbol();
      assert.equal(symbol, 'RWD');
    });
  });
});
