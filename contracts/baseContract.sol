pragma solidity ^0.8.9;
contract baseContract {

  struct updateStruct{
    address _address;
    string name;
    string category;
    uint256 timestamp;
    string update;
  }


  // structuring the data for logistics provider
  struct logiStruct{
    string name;
    string location;
    uint payment_amt;
  }

  mapping (address => logiStruct) logisticsProviders;
  address[] public addressLogistics;
  
  //adding a logistics provider to the contract
  function addLogisticsProvider(address _address, string memory name, string memory location, uint payment_amt) public {
      logiStruct storage logi = logisticsProviders[_address];
      
      logi.name = name;
      logi.location = location;
      logi.payment_amt = payment_amt;
      
      addressLogistics.push(_address) -1;
  }
  
  //getting addresses of the logistics providers included in our contract.
  function getLogisticsAddresses() external view returns(address[]) {
      return addressLogistics;
  }
  
  //fetching name and location of logistics Provider who were registered on the contract
  function getDataLogistics(address _address) external view returns(string, string){
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
  function payEther(address _address, uint amt) external{
      _address.transfer(amt);
  }
  function releasePayment() external{
      if(this.hasSufficientFunds()){
          for(uint i = 0; i<addressLogistics.length; i++){
              address a = addressLogistics[i];
              a.transfer(logisticsProviders[a].payment_amt);
          }
      }
  }
  
  updateStruct[] updates;
  function setUpdate(address _address, string memory name, string memory category, string memory _update) external {
      updateStruct memory update = updateStruct(_address, name, category, now, _update);
      updates.push(update);
  }
}
