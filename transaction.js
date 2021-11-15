const Web3 = require('web3');
const hdWalletProvider = require('@truffle/hdwallet-provider');
const baseContract = require('./build/contracts/baseContract.json');

const transactWithContract = async(account_address, contract_address) => {

    /*const provider = new hdWalletProvider(
        account_key,
        "https://ropsten.infura.io/v3/d1ed4d59de6b4faa878a943d8553d956"
    );*/
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
    const web3 = new Web3(provider);

    let contract = new web3.eth.Contract(
        baseContract.abi,
        contract_address
    );

    var val = await contract.methods.getBalanceOnContract().call();
    // await contract.methods.addEther().send({
    //     from: account_address,
    //     value: 1000000000000000000
    // })

    console.log(val);

}

//exports.transactWith = transactWithContract;
transactWithContract("0x222Ae391215CC58dB7206342F9B193658C46031C",  "0xF013C03f8892a0DBbC7203cbD84c7C97b68Cc84B");