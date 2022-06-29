if(process.env.NODE_ENV!=='PRODUCTION'){
    require('dotenv').config();
}
const Web3 = require('web3');
const {abi, evm} = require('./compile');
const WalletProvider = require('@truffle/hdwallet-provider');


const initialMessage = "Welcome ATOM";
const walletSecret = process.env.WALLET_SECRET;
const infuraUrl = process.env.INFURA_LINK;
let provider = new WalletProvider(walletSecret, infuraUrl);
let web3 = new Web3(provider);
(async()=>{
    const accounts = await web3.eth.getAccounts();
    console.log('account: ', accounts[0]);
   let contractAddress=  await new web3.eth.Contract(abi)
    .deploy({data: evm.bytecode.object, arguments: [initialMessage]} )
    .send({from: accounts[0], gas: '1000000'});

    console.log('contract address: ', contractAddress);
    provider.engine.stop();


})();

