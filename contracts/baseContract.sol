pragma solidity ^0.8.9;
contract baseContract {
    struct userStruct{
        string name;
        string mobile_no;
        address payable account;
        uint id;
        uint256 payment_amt;
    }

    mapping (address => userStruct) users;
    address payable [] public addressUsers;

    constructor(string name, string mobile_no, address payable _address) public {
        userStruct storage user = users[_address];

        user.name = name;
        user.mobile_no = mobile_no;
        user.id = 1;
        user.payment_amt = 0;
        user.account = _address;

        addressUsers.push(_address);
    }

  struct updateStruct{
    address _address;
    uint256 timestamp;
    string update;
  }

  function addUser(address payable _address, string memory name, string memory mobile_no, uint256 )

  mapping (address => logiStruct) logisticsProviders;
  address payable [] public addressLogistics;
  
  //adding a logistics provider to the contract
  function addLogisticsProvider(address payable _address, string memory name, string memory location, uint payment_amt) public {
      logiStruct storage logi = logisticsProviders[_address];
      
      logi.name = name;
      logi.location = location;
      logi.payment_amt = payment_amt;
      
      addressLogistics.push(_address);
  }
  
  //getting addresses of the logistics providers included in our contract.
  function getLogisticsAddresses() external view returns(address payable [] memory) {
      return addressLogistics;
  }
  
  //fetching name and location of logistics Provider who were registered on the contract
  function getDataLogistics(address _address) external view returns(string memory, string memory){
      return (logisticsProviders[_address].name, logisticsProviders[_address].location);
  }
  
  function addEther() external payable{}
  
  //checking value present on contract
  function getBalanceOnContract() external view returns(uint){
    return address(this).balance;
  }
  
  function hasSufficientFunds() external view returns(bool){
      uint amt_payable = 0;
      for(uint i = 0; i<addressLogistics.length; i++){
          address a = addressLogistics[i];
          amt_payable =  amt_payable + logisticsProviders[a].payment_amt;
      }
      uint available_amt = address(this).balance;
      return available_amt>=amt_payable;
  }
  
  
  //handling payments below
  function payEther(address payable _address, uint amt) external{
      _address.transfer(amt);
  }
  function releasePayment() external{
      if(this.hasSufficientFunds()){
          for(uint i = 0; i<addressLogistics.length; i++){
              address payable a = addressLogistics[i];
              a.transfer(logisticsProviders[a].payment_amt);
          }
      }
  }
  
  updateStruct[] updates;
  function setUpdate(address _address, string memory _update) external {
      updateStruct memory update = updateStruct(_address, block.timestamp, _update);
      updates.push(update);
  }
}
