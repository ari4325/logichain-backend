const hdWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const baseContract = require('./build/contracts/baseContract.json')

const deployContract = async(address, key) => {
    const provider = new hdWalletProvider(
        key,
        "https://ropsten.infura.io/v3/d1ed4d59de6b4faa878a943d8553d956"
    );
    const web3 = new Web3(provider);
    let contract = new web3.eth.Contract(
        baseContract.abi
    );

    contract = await contract
        .deploy({data: baseContract.bytecode})
        .send({from: address}, function(error, transactionHash){ 
            console.log(error);
        })
        .on('error', function(error){ 
            console.log(error);
        })
        .on('transactionHash', function(transactionHash){
            console.log(transactionHash);
         })
        .on('receipt', function(receipt){
           console.log(receipt.contractAddress)
        })
        .on('confirmation', function(confirmationNumber, receipt){ })
        .then(function(newContractInstance){
            console.log(newContractInstance.options.address) 
        });
}

exports.deployContract = deployContract;
//deployContract("0xD230b9c7b5fde1b253AB39e66635Be818245CF29", "0x78792c331ed2b9e802d5da08ce8158fcfa2e5ebd16ca7dd56e3f44e54e09b06b");