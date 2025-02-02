const { ethers } = require('ethers');
const dotenv = require('dotenv');
const bip39 = require('bip39');

dotenv.config();

async function privateKeyToMnemonic(privateKey) {
    try {
        const wallet = new ethers.Wallet(privateKey);
        const mnemonic = bip39.entropyToMnemonic(wallet.privateKey);
        return mnemonic;
    } catch (error) {
        throw error;
    }
}

const privateKey = process.env.PRIVATE_KEY; // Make sure it's in hexadecimal format
privateKeyToMnemonic(privateKey)
    .then(mnemonic => {
        console.log('Mnemonic Phrase:', mnemonic);
    })
    .catch(error => {
        console.error('Error:', error);
    });