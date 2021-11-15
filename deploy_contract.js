const hdWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const baseContract = require('./build/contracts/baseContract.json');
const userData = require('./build/contracts/userData.json');
const priv_key = "0x4b0069d43378189e247377039933f7deeb916100d207b20231d9b8101f730a77";
const account_address = "0x33d3FA0db669C8ea67BaA4b87563298DE22bCc4a";

const deployContract = async(req, res) => {
    const { address } = req.body;
    if( !address ){
        return res.status(400).json({
            error: true,
            message: "Data not provided"
         })
    }

    const provider = new hdWalletProvider(
        priv_key,
        "https://ropsten.infura.io/v3/d1ed4d59de6b4faa878a943d8553d956"
    );
    const web3 = new Web3(provider);
    let contract = new web3.eth.Contract(baseContract.abi);
    let contract_address = "";

    contract = await contract
        .deploy({data: baseContract.bytecode})
        .send({
                from: account_address, 
            },
            function(error, transactionHash){ 
            console.log(error);
        })
        .on('error', function(error){ 
            console.log(error);
        })
        .on('transactionHash', function(transactionHash){
            console.log(transactionHash);
         })
        .on('receipt', async function(receipt){
           console.log(receipt.contractAddress)
            contract_address = receipt.contractAddress;
        })
        .on('confirmation', function(confirmationNumber, receipt){ })
        .then(function(newContractInstance){
            console.log(newContractInstance.options.address) 
        });

    let user_contract = new web3.eth.Contract(
        userData.abi,
        "0xCF5712a30efF60A6b7d8424363360C8D90764c8D"
    )

    await user_contract.methods.addContractAddress(address, contract_address).send({
        from: account_address
    }).then(function(receipt){
        return res.status(200).json({
            err: false,
            msg: receipt
        })
    });
}

module.exports = deployContract;
//deployContract("0xD230b9c7b5fde1b253AB39e66635Be818245CF29", "0x78792c331ed2b9e802d5da08ce8158fcfa2e5ebd16ca7dd56e3f44e54e09b06b");