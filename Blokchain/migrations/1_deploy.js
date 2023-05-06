const Appearance = artifacts.require("appearances");
const Support = artifacts.require("support");
const Clients = artifacts.require("Client");
const FIs = artifacts.require("FI");
const KYC = artifacts.require("KYC");

module.exports = function (deployer, network, accounts) {
  console.log(accounts);

  if (network == "development") {
    deployer.deploy(Support);
    deployer.deploy(Appearance);
    deployer.link(Support, Clients);
    deployer.link(Appearance, Clients);
    deployer.deploy(Clients);
    deployer.link(Support, FIs);
    deployer.link(Appearance, FIs);
    deployer.deploy(FIs);
    deployer.deploy(KYC, "AK", "aekkaraj.k@gmail.com");
  } else {
    // For live & test networks

    deployer.deploy(Support);
    deployer.deploy(Appearance);
    deployer.link(Support, Clients);
    deployer.link(Appearance, Clients);
    deployer.deploy(Clients);
    deployer.link(Support, FIs);
    deployer.link(Appearance, FIs);
    deployer.deploy(FIs);
    deployer.deploy(KYC, "AK", "aekkaraj.k@gmail.com");
  }
};