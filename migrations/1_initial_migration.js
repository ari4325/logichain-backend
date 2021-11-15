const Migrations = artifacts.require("Migrations");
const baseContract = artifacts.require('../contracts/baseContract.sol');

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(baseContract)
  .then(() => console.log(baseContract.address));
};
