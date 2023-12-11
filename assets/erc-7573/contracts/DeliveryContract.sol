// SPDX-License-Identifier: CC0-1.0
pragma solidity >=0.7.0;

import "./interfaces/IDeliveryWithKey.sol";

contract DeliveryContract is IDeliveryWithKey {

 //   event AssetTransferIncepted(address initiator, uint id);
 //   event AssetTransferConfirmed(address confirmer, uint id);
 //   event AssetClaimed(uint id, string key);
 //   event AssetReclaimed(uint id, string key);

    address sellerAddress;
    address buyerAddress;

    constructor(address _sellerAddress, address _buyerAddress){
        sellerAddress = _sellerAddress;
        buyerAddress = _buyerAddress;
    }

    modifier onlySeller() {
        require(msg.sender == sellerAddress, "You are not the seller."); _;
    }
    modifier onlyBuyer() {
        require(msg.sender == sellerAddress, "You are not the buyer."); _;
    }

    function inceptTransfer(uint id, int amount, address from, string memory keyEncryptedSeller) external override onlyBuyer{
        emit AssetTransferIncepted(buyerAddress,id);

    }


    function confirmTransfer(uint id, int amount, address to, string memory keyEncryptedBuyer) external override onlySeller{
        emit AssetTransferConfirmed(sellerAddress,id);
    }


    function transferWithKey(uint id, string memory key) external{
        if (msg.sender == sellerAddress)
            emit AssetReclaimed(id,key);
        if (msg.sender == buyerAddress)
            emit AssetClaimed(id,key);
    }
}
