const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { interface, bytecode } = require('./compile')
//updated web3 and hdwallet-provider imports added for convenience

// deploy code will go here
const provider = new HDWalletProvider (
    'visual club detail skill six awake ankle twin pair dry enlist vital',
    'https://sepolia.infura.io/v3/939decee814a479ea958c0d9d912ca53'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy( { data: bytecode, arguments: ['Hi there!']})
        .send({ from: accounts[0], gas: '100000', gasPrice: '1000000' });
    console.log('Contract deployed to', result.options.address); 
    provider.engine.stop();   

};
deploy();