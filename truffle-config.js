require('babel-register');
require('babel-polyfill');

module.exports = {
    networks: {
        development: {
            host: 'HTTP://127.0.0.1',
            port: '7545',
            netwok_id: '*' // Connect to any network
        }
    },
    contracts_directory: './src/contracts',
    contracts_build_directory: './src/truffle-abis',
    compilers: {
        solc: {
            version: '^0.5.0',
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
}