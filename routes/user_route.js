const hdWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const userData = require('../build/contracts/userData.json');
const priv_key = "0x4b0069d43378189e247377039933f7deeb916100d207b20231d9b8101f730a77";
const account_address = "0x33d3FA0db669C8ea67BaA4b87563298DE22bCc4a";

const provider = new hdWalletProvider(
    priv_key,
    "https://ropsten.infura.io/v3/d1ed4d59de6b4faa878a943d8553d956"
);
const web3 = new Web3(provider);
let contract = new web3.eth.Contract(
    userData.abi,
    "0xCF5712a30efF60A6b7d8424363360C8D90764c8D"
)

const signIn = async(req, res) => {
    const { address, name, mobile_no } = req.body;

    if(!name || !address || !mobile_no){
        return res.status(400).json({
            error: true,
            message: "Data not provided"
         })
    }

    let val = await contract.methods.findUser(address).call();
    console.log(val);
    if(val[0] != '1'){
        await contract.methods.createUser(address, name, mobile_no).send({
            from: account_address,
        }).then(function(receipt){
            return res.status(200).json({
                err: false,
                msg: receipt
            })
        });
    }else{
        return res.status(200).json({
            err: false,
            msg: "User already exists",
            value: val
        })
    }
}

module.exports = signIn;