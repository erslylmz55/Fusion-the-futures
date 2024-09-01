// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NewToken is ERC20, Ownable {
    // Yeni tokenin total supply'ını (toplam arzını) belirlemek için constructor'da parametre alıyoruz.
    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply * (10 ** decimals())); // Başlangıç arzı mint ediliyor.
    }

    // Kullanıcılar için yeni token oluşturma işlevi
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Coin Fusion sonrası yeni tokenları mint etmek için kullanılacak
    function mintNewTokenAfterFusion(address to, uint256 amount) public onlyOwner {
        require(amount > 0, "Amount must be greater than zero");
        _mint(to, amount);
    }
}
