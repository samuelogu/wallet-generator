const Web3 = require('web3');
const rpcURL = "https://bsc-dataseed1.binance.org:443";
const web3 = new Web3(rpcURL);

const account = web3.eth.accounts.create();
console.log("Account:", account);
console.log("Private Key (Secret Phrase):", account.privateKey);