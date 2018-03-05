var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var newAddree = "0x1ED4d3E08f0c36179bA22c68fAE1638c28D99c43";

web3.eth.getBalance(newAddree).then(function(res){
    console.log(web3.utils.fromWei(res, 'ether'));
});

web3.eth.getAccounts()
.then((res)=>{
	console.log(res.length)
});

//解锁public1账户 
web3.eth.personal.unlockAccount(newAddree,'aixiaoyao',  600)
    .then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
