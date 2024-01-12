const { ethers } = require('ethers');
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

function getAddressFromPrivateKey(privateKey) {
    try {
        const wallet = new ethers.Wallet(privateKey);
        const address = wallet.address;
        return address;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

function decrypt(encryptedData, password) {
    try {
        // Split the encryptedData into components
        const [content, tag, iv] = encryptedData.split(':').map(part => Buffer.from(part, 'hex'));

        const key = crypto.scryptSync(password, 'salt', 32);
        const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
        decipher.setAuthTag(tag);

        let decrypted = decipher.update(content, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');

        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error.message);
        return null;
    }
}

const password = process.env.PASSWORD;

const encryptedPrivateKey = process.env.ENCRYPTED_PRIVATE_KEY;
const encryptedMnemonic = process.env.ENCRYPTED_MNEMONIC

const decryptedPrivateKey = decrypt(encryptedPrivateKey, password);
const decryptedMnemonic = decrypt(encryptedMnemonic, password);
const address = getAddressFromPrivateKey(decryptedPrivateKey);

console.log(`Wallet Address: ${address}`)
console.log(`Decrypted Private Key: ${decryptedPrivateKey}`)
console.log(`Decrypted Mnemonic: ${decryptedMnemonic}`)