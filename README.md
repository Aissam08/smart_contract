# Ethereum Smart Contract with Truffle


## Useful tools 

For using this smart contract application we have to get installed on your environment (the version we used): 

* Truffle v5.4.24 (core: 5.4.24)
* Solidity - 0.8.10 (solc-js)
* Node v17.3.0
* Web3.js v1.5.3

The Ethereum blockchain has been implemented using Ganache, which can be installed at the following line : 

https://trufflesuite.com/ganache/


The crypto wallet Metamask allowed us to connect the blockchain to our browser (Google Chrome) can be installed at the following link: 

https://trufflesuite.com/ganache/

We also need to get NPM installed for running the project

## How to run the project 

Once the tools is installed on your computer, you should go in the repository and open 2 terminals.

1. The first one is used to run the JavaScript file (app.js), at the root of the project, type 'npm run dev'. A web page should open on your browser.

2. Use the other terminal for executing the testcase : type 'truffle test'

3. If you don't have a Metamask account, you have to create one and connect it to the blockchain. The local network used by Ganache is the same : http://127.0.0.1:7545 

4. On Ganache application you can copy one of the user's private key and use it on Metamask to import an account.

5. You can do it with several account, so the transaction can be done between them.