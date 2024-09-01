const NewToken = artifacts.require("NewToken");

module.exports = function (deployer) {
  // İlk deploy sırasında kullanmak istediğin isim, sembol ve arz miktarı
  const name = "FusionToken";
  const symbol = "FUS";
  const initialSupply = 1000000;

  deployer.deploy(NewToken, name, symbol, initialSupply);
};
