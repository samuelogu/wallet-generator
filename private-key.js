const { ethers } = require('ethers');
const dotenv = require('dotenv');

dotenv.config();

const mnemonic = process.env.MNEMONIC;
const wallet = ethers.Wallet.fromPhrase(mnemonic);

const privateKey = wallet.privateKey;

console.log('Private Key:', privateKey);