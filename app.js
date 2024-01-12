const { ethers } = require('ethers');
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

function encrypt(text, password) {
    const iv = crypto.randomBytes(16);
    const key = crypto.scryptSync(password, 'salt', 32);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag();

    // Concatenate content, tag, and iv
    return `${encrypted}:${tag.toString('hex')}:${iv.toString('hex')}`;
}

const password = process.env.PASSWORD;

// Generate a random wallet
const wallet = ethers.Wallet.createRandom();

// Extract information
const privateKey = wallet.privateKey;
const mnemonic = wallet.mnemonic.phrase;
const address = wallet.address;

const encryptedPrivateKey = encrypt(privateKey, password)
const encryptedMnemonic = encrypt(mnemonic, password)

console.log(`Private Key: ${privateKey}`)
console.log(`Mnemonic (12-word seed phrase): ${mnemonic}\n`)

console.log(`Wallet Address: ${address}`)
console.log(`Encrypted Private Key: ${encryptedPrivateKey}`)
console.log(`Encrypted Mnemonic: ${encryptedMnemonic}`)
