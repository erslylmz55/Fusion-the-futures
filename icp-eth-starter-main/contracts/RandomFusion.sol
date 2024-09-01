// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RandomFusion {
    // Rastgele bir sayı oluşturma (Basit bir yöntem)
    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
    }

    // Rastgele Fusion İşlemi
    function randomFusion(address token1, address token2) public returns (address) {
        uint256 randomValue = random();

        // Rastgele bir karar vermek için randomValue'yu kullanın
        if (randomValue % 2 == 0) {
            return token1; // İlk token'i seç
        } else {
            return token2; // İkinci token'i seç
        }
    }
}
