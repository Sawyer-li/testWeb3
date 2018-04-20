let Web3 = require('web3');
let web3;
let solc = require('solc');
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
//编译合约
let source = "pragma solidity ^0.4.0;contract Mysalc{  /*区块链存储*/  uint count;  /*执行会写入数据，所以需要`transaction`的方式执行。*/  function add(uint a, uint b) returns(uint){    count++;    return a + b;  }  /*执行不会写入数据，所以允许`call`的方式执行。*/  function getCount() constant returns (uint){    return count;  }}";

// Setting 1 as second paramateractivates the optimiser
var output = solc.compile(source, 1)
var bytecode = "";
//2.1 获取合约的代码，部署时传递的就是合约编译后的二进制码
for (var contractName in output.contracts) {
    // code and ABI that are needed by web3
    bytecode = console.log(contractName + ': ' + output.contracts[contractName].bytecode)
    console.log(contractName + '; ' + JSON.parse(output.contracts[contractName].interface))
}

web3.eth.getAccounts(function(err, res){ 
    console.log("account:");
    //console.log(res);     

})

web3.eth.getBlockNumber(function(err,res){
    console.log('blockNumber:');
    console.log(res);
})
