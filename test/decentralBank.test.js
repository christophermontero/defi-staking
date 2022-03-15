require('chai').use(require('chai-as-promised')).should();

const DeBank = artifacts.require('DeBank');
const Reward = artifacts.require('Reward');
const Tether = artifacts.require('Tether');

contract('DeBank', (accounts) => {
  let tether, reward;

  before(async () => {
    tether = await Tether.new();
    reward = await Reward.new();
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
