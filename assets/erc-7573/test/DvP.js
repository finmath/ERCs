const { ethers } = require("hardhat");
const { expect } = require("chai");
const AbiCoder = ethers.utils.AbiCoder;
const Keccak256 = ethers.utils.keccak256;

describe("Livecycle Unit-Tests for Delivery-vs-Payment", () => {
const abiCoder = new AbiCoder();
  const trade_data = "<xml>here are the trade specification</xml";
  let sdc;
  let deliveryContract;
  let paymentContract;
  let buyer;
  let seller;
  let id = 456754567;
  let assetAmount = 10000;
  let paymentAmount = 9000;

  before(async () => {
    const [_buyer, _seller] = await ethers.getSigners();
    buyer = _buyer;
    seller = _seller;
    const deliveryContractFactory = await ethers.getContractFactory("DeliveryContract");
    const paymentContractFactory = await ethers.getContractFactory("PaymentContract");
    deliveryContract = await deliveryContractFactory.deploy(buyer,seller);
    paymentContract = await paymentContractFactory.deploy(buyer,seller);
    await deliveryContract.deployed();
    await paymentContract.deployed();
    console.log("DeliveryContract Address: %s", deliveryContract.address);
    console.log("PaymentContract Address: %s", paymentContract.address);
  });

  it("Transfer Incept", async () => {
     string keyEncryptedSeller = "key";
     const call = await deliveryContract.connect(buyer).inceptTransfer(id, assetAmount, seller, keyEncryptedSeller) ;
     await expect(call).to.emit(sdc, "AssetTransferIncepted");
  });


});