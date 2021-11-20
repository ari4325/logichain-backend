const Migrations = artifacts.require("Migrations");
const baseContract = artifacts.require('../contracts/userData.sol');

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(baseContract)
  .then(() => console.log(baseContract.address));
};
