# ERC20 Wallet Generator

Follow the setup below to generate a new erc20 wallet address with private key and mnemonic seed phrase.

## Installation & Setup ##

> Follow this [instruction](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to install Git version control based on your operating system if you don't already have it installed.

Using a terminal of your choice; clone the Github repository into your local machine. 

```bash
git clone https://github.com/samuelogu/wallet-generator.git
cd wallet-generator
npm i
touch .env
```

Update the `.env` file with your chose of encryption password. The ENCRYPTED_PRIVATE_KEY and ENCRYPTED_MNEMONIC are for decrypting back to original values.

```javascript
PASSWORD="encryption_password"
ENCRYPTED_PRIVATE_KEY=
ENCRYPTED_MNEMONIC=
```

Generate a new wallet address by running `npm run generate` in the project terminal.