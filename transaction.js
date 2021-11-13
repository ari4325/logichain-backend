const Web3 = require('web3');
const hdWalletProvider = require('@truffle/hdwallet-provider');
const baseContract = require('./build/contracts/baseContract.json');

const transactWithContract = async(account_address, account_key, contract_address) => {

    const provider = new hdWalletProvider(
        account_key,
        "https://ropsten.infura.io/v3/d1ed4d59de6b4faa878a943d8553d956"
    );
    const web3 = new Web3(provider);

    let contract = new web3.eth.Contract(
        baseContract.abi,
        contract_address
    );

    var val = await contract.methods.getBalanceOnContract().call();
    console.log(val);

}

exports.transactWith = transactWithContract;
//transactWithContract("0xD230b9c7b5fde1b253AB39e66635Be818245CF29", "0x78792c331ed2b9e802d5da08ce8158fcfa2e5ebd16ca7dd56e3f44e54e09b06b", "0x9776457fe5c54331142efc74d76bda1a5f5effe4");