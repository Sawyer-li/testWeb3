var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

web3.eth.personal.newAccount('aixiaoyao')
.then(console.log);