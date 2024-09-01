// SPDX-License-Identifier: MIT

// Ethers.js kütüphanesini içe aktarın
const { ethers } = require('ethers');

// Kontratın ABI ve adres bilgilerini yükleyin
const contractABI = [
    // Kontratın ABI'sini buraya ekleyin
    "function fuseTokens(string memory _name, string memory _symbol, address _token1, address _token2, uint256 _amount1, uint256 _amount2) public",
    "function balanceOf(address _user) public view returns (uint256)"
];

const contractAddress = "0xYourContractAddress"; // Kontratın dağıtım adresini buraya ekleyin

// Ethereum sağlayıcısı ve kontrat ile etkileşim kurmak için bir sağlayıcı oluşturun
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const coinFusionContract = new ethers.Contract(contractAddress, contractABI, signer);

// DOM ile etkileşim
document.getElementById('fuseButton').addEventListener('click', async () => {
    const name = document.getElementById('nameInput').value;
    const symbol = document.getElementById('symbolInput').value;
    const token1 = document.getElementById('token1Input').value;
    const token2 = document.getElementById('token2Input').value;
    const amount1 = ethers.utils.parseUnits(document.getElementById('amount1Input').value, 18);
    const amount2 = ethers.utils.parseUnits(document.getElementById('amount2Input').value, 18);

    try {
        const tx = await coinFusionContract.fuseTokens(name, symbol, token1, token2, amount1, amount2);
        await tx.wait();
        alert('Tokens fused successfully!');
    } catch (error) {
        console.error(error);
        alert('An error occurred while fusing tokens.');
    }
});

document.getElementById('balanceButton').addEventListener('click', async () => {
    const userAddress = document.getElementById('addressInput').value;

    try {
        const balance = await coinFusionContract.balanceOf(userAddress);
        document.getElementById('balanceOutput').innerText = `Balance: ${ethers.utils.formatUnits(balance, 18)}`;
    } catch (error) {
        console.error(error);
        alert('An error occurred while fetching the balance.');
    }
});

async function fuseNFTs() {
    const nftContract1 = document.getElementById("nftContract1").value;
    const tokenId1 = document.getElementById("tokenId1").value;
    const nftContract2 = document.getElementById("nftContract2").value;
    const tokenId2 = document.getElementById("tokenId2").value;
    const newTokenURI = document.getElementById("newTokenURI").value;

    const nftFusionContract = new ethers.Contract(nftFusionAddress, nftFusionAbi, signer);
    const tx = await nftFusionContract.fuseNFTs(nftContract1, tokenId1, nftContract2, tokenId2, newTokenURI);
    await tx.wait();

    console.log("New fused NFT created with token ID:", tx.events[0].args.newTokenId.toNumber());
}

// Kullanıcı cüzdanını bağlama fonksiyonu
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Cüzdanı bağlamak için istek gönder
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            
            // Bağlantı başarılı olursa cüzdan adresini göster
            document.getElementById('walletAddress').innerText = `Wallet Address: ${account}`;
            
            // Profil sayfası için profil güncelleme fonksiyonunu çağır
            updateProfile(account);
        } catch (error) {
            console.error("User denied account access", error);
            document.getElementById('walletAddress').innerText = "Error: Could not connect wallet.";
        }
    } else {
        // Web3 sağlayıcısı mevcut değilse kullanıcıya bilgi ver
        alert("MetaMask is not installed. Please install MetaMask to use this app.");
    }
}

// Kullanıcı profilini güncelleme fonksiyonu
async function updateProfile(account) {
    document.getElementById('userAddress').innerText = `Wallet Address: ${account}`;
    
    // NFT kontratından kullanıcıya ait NFT sayısını al
    const nftContract = new ethers.Contract(nftContractAddress, nftAbi, provider);
    const balance = await nftContract.balanceOf(account);
    document.getElementById('nftCount').innerText = `Owned NFTs: ${balance.toString()}`;
}

// Sayfa yüklendiğinde hangi fonksiyonların çalışacağını belirleme
window.onload = function() {
    const page = document.body.getAttribute('data-page');
    
    if (page === 'connect_wallet') {
        document.getElementById('connectWalletButton').addEventListener('click', connectWallet);
    } else if (page === 'profile') {
        connectWallet();
    }
};

// Akıllı kontrat adresi ve ABI
const NftFusionAddress = 'YOUR_CONTRACT_ADDRESS';
const NftFusionAbi = [
    // ABI detaylarını buraya ekleyin
];

// Ethers.js sağlayıcısı
const Provider = new ethers.providers.Web3Provider(window.ethereum);
const Signer = provider.getSigner();
const NftFusionContract = new ethers.Contract(nftFusionAddress, nftFusionAbi, signer);

// NFT'leri birleştirme fonksiyonu
async function fuseNFTs(tokenIds) {
    try {
        const tx = await nftFusionContract.fuseNFTs(tokenIds);
        await tx.wait();
        alert("NFTs fused successfully!");
    } catch (error) {
        console.error("Error fusing NFTs:", error);
        alert("Failed to fuse NFTs. Check the console for details.");
    }
}

// Sayfa yüklendiğinde gerekli event listener'ları ekle
window.onload = function() {
    const fuseButton = document.getElementById('fuseButton');
    if (fuseButton) {
        fuseButton.addEventListener('click', async () => {
            const tokenIds = JSON.parse(document.getElementById('nftTokenIds').value);
            await fuseNFTs(tokenIds);
        });
    }
};

// Akıllı kontrat adresi ve ABI
const nftFusionAddress = 'YOUR_CONTRACT_ADDRESS';
const nftFusionAbi = [
    // ABI detaylarını buraya ekleyin
];

// Ethers.js sağlayıcısı
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const nftFusionContract = new ethers.Contract(nftFusionAddress, nftFusionAbi, signer);

async function connectWallet() {
    try {
        // Kullanıcıdan cüzdan bağlantısı iste
        await provider.send("eth_requestAccounts", []);
        const account = await signer.getAddress();
        document.getElementById('walletAddress').innerText = `Connected: ${account}`;
        console.log("Wallet connected:", account);
    } catch (error) {
        console.error("Error connecting wallet:", error);
        document.getElementById('walletAddress').innerText = "Failed to connect wallet. Check the console for details.";
    }
}

async function fuseNFTs(tokenIds) {
    try {
        const tx = await nftFusionContract.fuseNFTs(tokenIds);
        await tx.wait();
        document.getElementById('fusionResult').innerText = "NFTs fused successfully!";
    } catch (error) {
        console.error("Error fusing NFTs:", error);
        document.getElementById('fusionResult').innerText = "Failed to fuse NFTs. Check the console for details.";
    }
}

window.onload = function() {
    const page = document.body.getAttribute('data-page');
    
    if (page === 'nft_fusion') {
        const fuseButton = document.getElementById('fuseButton');
        if (fuseButton) {
            fuseButton.addEventListener('click', async () => {
                const tokenIdsInput = document.getElementById('nftTokenIds').value;
                const tokenIds = tokenIdsInput.split(',').map(id => id.trim()).filter(id => id.length > 0);
                if (tokenIds.length > 0) {
                    await fuseNFTs(tokenIds);
                } else {
                    document.getElementById('fusionResult').innerText = "Please enter valid Token IDs.";
                }
            });
        }
    }

    if (page === 'connect_wallet') {
        const connectButton = document.getElementById('connectWalletButton');
        if (connectButton) {
            connectButton.addEventListener('click', async () => {
                await connectWallet();
            });
        }
    }
};
// Ethers.js sağlayıcısı ve signer'ı tanımla
let provider;
let signer;

// Cüzdan bağlantısını sağlama fonksiyonu
async function connectWallet() {
    try {
        // MetaMask'ın sağladığı sağlayıcıyı kullanarak bağlantı iste
        if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            const account = await signer.getAddress();
            document.getElementById('walletAddress').innerText = `Connected: ${account}`;
            console.log("Wallet connected:", account);
        } else {
            console.error("MetaMask is not installed.");
            document.getElementById('walletAddress').innerText = "MetaMask is not installed.";
        }
    } catch (error) {
        console.error("Error connecting wallet:", error);
        document.getElementById('walletAddress').innerText = "Failed to connect wallet. Check the console for details.";
    }
}

// NFT Fusion işlemi
const nftFusionAddress = 'YOUR_CONTRACT_ADDRESS'; // Kontrat adresinizi buraya ekleyin
const nftFusionAbi = [
    // ABI detaylarını buraya ekleyin
];

let nftFusionContract;

async function setupContract() {
    if (signer) {
        nftFusionContract = new ethers.Contract(nftFusionAddress, nftFusionAbi, signer);
    } else {
        console.error("Wallet not connected. Please connect your wallet first.");
    }
}

async function fuseNFTs(tokenIds) {
    try {
        if (!nftFusionContract) {
            await setupContract();
        }
        const tx = await nftFusionContract.fuseNFTs(tokenIds);
        await tx.wait();
        document.getElementById('fusionResult').innerText = "NFTs fused successfully!";
    } catch (error) {
        console.error("Error fusing NFTs:", error);
        document.getElementById('fusionResult').innerText = "Failed to fuse NFTs. Check the console for details.";
    }
}

// Sayfa yüklendiğinde gerekli event listener'ları ekle
window.onload = function() {
    const page = document.body.getAttribute('data-page');
    
    if (page === 'nft_fusion') {
        const fuseButton = document.getElementById('fuseButton');
        if (fuseButton) {
            fuseButton.addEventListener('click', async () => {
                const tokenIdsInput = document.getElementById('nftTokenIds').value;
                const tokenIds = tokenIdsInput.split(',').map(id => id.trim()).filter(id => id.length > 0);
                if (tokenIds.length > 0) {
                    await fuseNFTs(tokenIds);
                } else {
                    document.getElementById('fusionResult').innerText = "Please enter valid Token IDs.";
                }
            });
        }
    }

    if (page === 'connect_wallet') {
        const connectButton = document.getElementById('connectWalletButton');
        if (connectButton) {
            connectButton.addEventListener('click', async () => {
                await connectWallet();
            });
        }
    }
};

// Anasayfa için
if (document.getElementById('nftFusionBtn')) {
    document.getElementById('nftFusionBtn').addEventListener('click', function() {
        window.location.href = 'nft-fusion.html'; // NFT Fusion sayfasına yönlendir
    });
}

if (document.getElementById('coinFusionBtn')) {
    document.getElementById('coinFusionBtn').addEventListener('click', function() {
        window.location.href = 'coin-fusion.html'; // Coin Fusion sayfasına yönlendir
    });
}

// NFT Fusion sayfası için
if (document.getElementById('homeBtn')) {
    document.getElementById('homeBtn').addEventListener('click', function() {
        window.location.href = 'index.html'; // Anasayfaya yönlendir
    });
}

if (document.getElementById('coinFusionBtn')) {
    document.getElementById('coinFusionBtn').addEventListener('click', function() {
        window.location.href = 'coin-fusion.html'; // Coin Fusion sayfasına yönlendir
    });
}

// Coin Fusion sayfası için
if (document.getElementById('homeBtn')) {
    document.getElementById('homeBtn').addEventListener('click', function() {
        window.location.href = 'index.html'; // Anasayfaya yönlendir
    });
}

if (document.getElementById('nftFusionBtn')) {
    document.getElementById('nftFusionBtn').addEventListener('click', function() {
        window.location.href = 'nft-fusion.html'; // NFT Fusion sayfasına yönlendir
    });
}

// Metamask provider'ını tespit etme
async function connectWallet() {
    if (window.ethereum) {
        try {
            // Kullanıcının cüzdanını bağlama
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            console.log('Connected account:', account);

            // Cüzdan adresini bir HTML elementine yazdırma (opsiyonel)
            document.getElementById('walletAddress').textContent = `Connected: ${account}`;
        } catch (error) {
            console.error('User rejected the request:', error);
        }
    } else {
        alert('Metamask not detected! Please install Metamask.');
    }
}

// "Connect Wallet" butonuna tıklama olayını bağlama
if (document.getElementById('connectWalletBtn')) {
    document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
}

// Web3.js ile bağlantı
const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

// ABI ve kontrat adresi
const newTokenAbi = [ /* ... ABI Kodu ... */ ];  // ABI'yi buraya ekle
const newTokenAddress = "CONTRACT_ADDRESS";  // Deploy edilen kontrat adresi

// Kontrata bağlanma
const newTokenContract = new web3.eth.Contract(newTokenAbi, newTokenAddress);

// Metamask üzerinden kullanıcı hesabını bağlama
async function connectWallet() {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  console.log("Connected account:", account);
  return account;
}

// Fusion sonrası yeni token mint etme
async function mintNewToken(amount) {
  const account = await connectWallet();
  await newTokenContract.methods.mintNewTokenAfterFusion(account, amount).send({ from: account });
  console.log(`${amount} new tokens minted for ${account}`);
}
document.getElementById('mintButton').addEventListener('click', async () => {
    const amount = 100;  // Mint edilecek token miktarı (örnek)
    await mintNewToken(amount);
  });

// app.js

document.addEventListener("DOMContentLoaded", () => {
    const mintButton = document.getElementById("mintButton");

    mintButton.addEventListener("click", async () => {
        // MetaMask'ın kurulu olup olmadığını kontrol et
        if (window.ethereum) {
            try {
                // Kullanıcıdan cüzdan bağlantısını talep et
                await window.ethereum.request({ method: "eth_requestAccounts" });

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();

                // Akıllı kontratın adresini ve ABI'sini tanımla
                const contractAddress = "YOUR_CONTRACT_ADDRESS";
                const abi = [
                    "function mintTwoTokens(address to) public",
                ];

                const contract = new ethers.Contract(contractAddress, abi, signer);

                // Kullanıcının adresini al
                const userAddress = await signer.getAddress();

                // İki token mint et
                const tx = await contract.mintTwoTokens(userAddress);
                await tx.wait();

                alert("Two tokens have been minted!");
            } catch (error) {
                console.error("Error minting tokens:", error);
                alert("An error occurred. Check the console for details.");
            }
        } else {
            alert("Please install MetaMask to use this feature.");
        }
    });
});

document.getElementById("randomFusionBtn").addEventListener("click", async function() {
    const token1 = "0x..."; // İlk token adresi
    const token2 = "0x..."; // İkinci token adresi
    
    try {
        const result = await contract.methods.randomFusion(token1, token2).call();
        document.getElementById("fusionResult").innerText = `Fusion Result: ${result}`;
    } catch (error) {
        console.error("Fusion failed", error);
        document.getElementById("fusionResult").innerText = "Fusion failed!";
    }
});

// Metamask veya başka bir cüzdanın bağlandığından emin olun
async function connectWallet() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const web3 = new Web3(window.ethereum);
            console.log("Wallet connected");
            return web3;
        } catch (error) {
            console.error("User denied wallet connection", error);
        }
    } else {
        console.error("Metamask not found");
    }
}

// Kontrata bağlan
async function getContractInstance(web3) {
    const contractABI = [ /* ABI'yi buraya ekleyin */ ];
    const contractAddress = "CONTRACT_ADDRESS"; // Kontratın adresini buraya ekleyin
    return new web3.eth.Contract(contractABI, contractAddress);
}

// Random Fusion İşlemini Gerçekleştir
async function randomFusion() {
    const web3 = await connectWallet();
    const contract = await getContractInstance(web3);

    const token1 = document.getElementById("token1").value;
    const token2 = document.getElementById("token2").value;

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    try {
        const result = await contract.methods.randomFusion(token1, token2).send({ from: account });
        document.getElementById("fusionResult").innerText = `Fusion Result: ${result}`;
    } catch (error) {
        console.error("Fusion failed", error);
        document.getElementById("fusionResult").innerText = "Fusion failed!";
    }
}

// Button Click Event
document.getElementById("randomFusionBtn").addEventListener("click", randomFusion);

document.getElementById("randomFusionBtn").addEventListener("click", function() {
    window.location.href = "randomFusion.html"; // Yönlendirme yapılacak sayfa
});

document.addEventListener('DOMContentLoaded', function () {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const abi = [ /* Your contract ABI here */ ];

    const contract = new web3.eth.Contract(abi, contractAddress);
    const createBtn = document.getElementById('create-btn');
    const criteriaInput = document.getElementById('criteria');
    const rewardInput = document.getElementById('reward');
    const challengesList = document.getElementById('challenges');

    // Create Challenge
    createBtn.addEventListener('click', async () => {
        const criteria = criteriaInput.value;
        const reward = web3.utils.toWei(rewardInput.value, 'ether');
        const accounts = await web3.eth.requestAccounts();
        const account = accounts[0];

        contract.methods.createChallenge(criteria, reward).send({ from: account })
            .on('receipt', function (receipt) {
                alert('Challenge Created!');
                loadChallenges();
            });
    });

    // Load Challenges
    async function loadChallenges() {
        const challengeCount = await contract.methods.challengeCount().call();
        challengesList.innerHTML = '';

        for (let i = 1; i <= challengeCount; i++) {
            const challenge = await contract.methods.challenges(i).call();
            const listItem = document.createElement('li');
            listItem.textContent = `Criteria: ${challenge.criteria}, Reward: ${web3.utils.fromWei(challenge.reward, 'ether')} ETH`;
            challengesList.appendChild(listItem);
        }
    }

    loadChallenges();
});
