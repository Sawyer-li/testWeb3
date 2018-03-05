var Web3 = require('web3');
var ganache = require("ganache-cli");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.setProvider(ganache.provider());