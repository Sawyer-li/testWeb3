var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//var web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
//初始化账户插件
var Accounts = require('web3-eth-accounts');
//初始化建立链接
var accounts = new Accounts('ws://localhost:8546');
//添加查看账户的扩展
web3.extend({
    property: 'myModule',
    methods: [{
        name: 'getBalance',
        call: 'eth_getBalance',
        params: 2,
        inputFormatter: [web3.extend.formatters.inputAddressFormatter, web3.extend.formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: web3.utils.hexToNumberString
    },{
        name: 'getGasPriceSuperFunction',
        call: 'eth_gasPriceSuper',
        params: 2,
        inputFormatter: [null, web3.utils.numberToHex]
    }]
});

web3.extend({
    methods: [{
        name: 'directCall',
        call: 'eth_callForFun',
    }]
});




//正式写代码jj
web3.eth.getBlockNumber()
.then(console.log);
web3.eth.getCoinbase()
.then(console.log);

web3.eth.personal.newAccount('!@superpassword')
.then(console.log);

var private1 = 'e4ed566579edab0db6bff06090e494be52d464c908db432de59f30b7ed975301';
var public1 = '0xb2833ced8a37b990445b2ad4a16849ad8aff1034';
var public2 = '0xc01625bbd9a3a3f1ba80de913b8796f92263017c';

var coinbase = web3.eth.coinbase;
//解锁public1账户 
web3.eth.personal.unlockAccount(public1,  600)
    .then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });

web3.eth.accounts.signTransaction({
    to: public2,
    value: '100000000000',
    gas: 2000000
}, private1)
.then(function(res){
    //查看账户所剩etha
    console.log(res);
    web3.myModule.getBalance(public1).then(function(res){
        console.log(web3.utils.fromWei(res, 'ether'));
    });
    web3.eth.getBalance(public2).then(function(res){
        console.log(web3.utils.fromWei(res, 'ether'));
    });
});

//查看账户所剩etha
web3.myModule.getBalance(public1).then(function(res){
    console.log(web3.utils.fromWei(res, 'ether'));
});
web3.eth.getBalance(public2).then(function(res){
    console.log(web3.utils.fromWei(res, 'ether'));
});


