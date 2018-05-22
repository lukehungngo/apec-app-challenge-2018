require('babel-register')({
  ignore: /node_modules\/(?!zeppelin-solidity\/test\/helpers)/
});
require('babel-polyfill');

var ropsten_url = 'https://ropsten.infura.io/GM5nJcgmyLduHVd0yuxy';
var rinkeby_url = 'https://rinkeby.infura.io/GM5nJcgmyLduHVd0yuxy';
var mainnet_url = 'https://mainnet.infura.io/GM5nJcgmyLduHVd0yuxy';
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "useless vibrant excuse design test become cause window simple spawn ship member"
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 5000000
    },
    testrpc: {
      host: "localhost",
      port: 9545,
      network_id: "*", // Match any network id
      gas: 5000000
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, ropsten_url)
      },
      network_id: 3,
      gas:"2700000" // Gas limit used for deploys
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, rinkeby_url)
      }, 
      network_id: 4,
      gas: "2700000" // Gas limit used for deploys
    }
  }
};
