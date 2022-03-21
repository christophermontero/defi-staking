require('chai').use(require('chai-as-promised')).should();

const DeBank = artifacts.require('DeBank');
const Reward = artifacts.require('Reward');
const Tether = artifacts.require('Tether');

contract('DeBank', ([owner, customer]) => {
  let tether, reward, debank;

  function convertToWei(num) {
    return web3.utils.toWei(num, 'ether');
  }

  before(async () => {
    tether = await Tether.new();
    reward = await Reward.new();
    debank = await DeBank.new(reward.address, tether.address);

    // Transfer all tokens to DeBank
    await reward.transfer(debank.address, convertToWei('1000000'));

    // Transfer 100 USDT to customer
    await tether.transfer(customer, convertToWei('100'), { from: owner });
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

  describe('Decentral bank contract deployment', async () => {
    it('matches names successfully', async () => {
      const name = await debank.name();
      assert.equal(name, 'DeBank');
    });

    it('contract has tokens', async () => {
      const balance = await reward.balanceOf(debank.address);
      assert.equal(balance, convertToWei('1000000'));
    });
  });

  describe('Yield farming', async () => {
    it('rewards tokens for staking', async () => {
      let result;

      // Check investor balance
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        convertToWei('100'),
        'Customer wallet before staking'
      );

      // Check staking for customer of 100 tokens
      await tether.approve(debank.address, convertToWei('100'), {
        from: customer
      });
      await debank.depositTokens(convertToWei('100'), { from: customer });

      // Check updated balance for customer
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        convertToWei('0'),
        'Customer wallet after staking 100 tokens'
      );

      // Check updated balance for DeBank
      result = await tether.balanceOf(debank.address);
      assert.equal(
        result.toString(),
        convertToWei('100'),
        'DeBank wallet after staking form customer'
      );

      result = await debank.isStaking(customer);
      assert.equal(
        result.toString(),
        'true',
        'Customer staking status to be true aftes staking'
      );
    });
  });
});
