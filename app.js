const { ethers } = require('ethers');
const crypto = require('crypto');

function encrypt(text, password) {
    const iv = crypto.randomBytes(16);
    const key = crypto.scryptSync(password, 'salt', 32);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag();

    // return { content: encrypted, tag, iv: iv.toString('hex') };
    return encrypted;
}

function decrypt(encryptedData, password) {
    const key = crypto.scryptSync(password, 'salt', 32);
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(encryptedData.iv, 'hex'));
    decipher.setAuthTag(Buffer.from(encryptedData.tag, 'hex'));

    let decrypted = decipher.update(encryptedData.content, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
}

// Example usage
const password = 'fish';

// Generate a random wallet
const wallet = ethers.Wallet.createRandom();

// Extract information
const privateKey = wallet.privateKey;
const mnemonic = wallet.mnemonic.phrase;
const address = wallet.address;

const encryptedPrivateKey = encrypt(privateKey, password)
const encryptedMnemonic = encrypt(mnemonic, password)

console.log(`Wallet Address: ${address}`)
console.log(`Private Key: ${privateKey}`)
console.log(`Mnemonic (12-word seed phrase): ${mnemonic}\n`)

console.log(`Encrypted Private Key: ${encryptedPrivateKey}`)
console.log(`Encrypted Mnemonic: ${encryptedMnemonic}`)


