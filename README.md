[![GitHub contributors](https://img.shields.io/github/contributors/Aman035/Digi-ID?style=for-the-badge)](https://github.com/Aman035/Digi-ID/contributors)
[![GitHub issues](https://img.shields.io/github/issues/Aman035/Digi-ID?style=for-the-badge)](https://github.com/Aman035/Digi-ID/issues)
[![GitHub forks](https://img.shields.io/github/forks/Aman035/Digi-ID?style=for-the-badge)](https://github.com/Aman035/Digi-ID/network)
[![GitHub stars](https://img.shields.io/github/stars/Aman035/Digi-ID?style=for-the-badge)](https://github.com/Aman035/Digi-ID/stargazers)
[![GitHub license](https://img.shields.io/github/license/Aman035/Digi-ID?style=for-the-badge)](https://github.com/Aman035/Digi-ID/blob/main/LICENSE)

<!-- PROJECT LOGO -->
<br />
<p align="center">
    <!-- <img src="images/logo.png" alt="Logo" width="80" height="80"> -->
  <h3 align="center">DIGI ID</h3>
  <p align="center">
    <a href="TODO">View Demo</a>
    ·
    <a href="https://github.com/Aman035/Digi-ID/issues">Report Bug</a>
    ·
    <a href="https://github.com/Aman035/Digi-ID/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#contract-code">Contract Code</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#installation">Installation</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

DIGI ID’ provides a decentralized identification system.

The project tends to offer a secured application where a user can create any digital identity, encrypt it using his public/private keys and store it on a secure decentralized storage system IPFS. This storage data is published on blockchain in encrypted form using asymmetric encryptions and empowers a user to share these identities securely. Also, the issuers are allowed to digitally sign all the identities for verification of data using the public-private key encryption.

<p align="center">
<img src="public\assets\flow.png"/>
</p>

#### Contract Code

Contract is deployed on Polygon Mumbai testnet.
Contract Address - [View on PolygonScan](https://mumbai.polygonscan.com/address/0xFbD45EFD350dDC7953F3DbEe9B1E5E233b567845)
0xFbD45EFD350dDC7953F3DbEe9B1E5E233b567845

#### Built With

- ReactJS
- Redux
- Stylings - Material UI , Bootstrap , React Spring
- Wallet Integrations - Metamask
- Solidity
- Test Cases - Mocha And Chai
- Deployment - Polygon Mumbai Testnet

## Installation

1. Clone the repo

```sh
git clone https://github.com/Aman035/Digi-ID.git
```

#### Frontend

1.2. Install NPM packages

```sh
npm install
```

1.3. Start the React App

```sh
npm start
```

#### Contracts

2.2 Go to Contract Directory

```sh
cd contract
```

2.2 Insall packages using truffle

```sh
truffle init
```

1.2. For running test cases start local test net Instance on port 8545 using Ganache

```sh
truffle test
```

1.3. To compile the contarcts

```sh
truffle compile
```

1.3. To deploy the contracts add a .env file with the following variables

```sh
PRIVATE_KEY=YOUR_ETHEREUM_ACCOUNT_PRIVATE_KEY
NETWORK=RPC_URL_OF_NETWORK
```

```sh
truffle deploy --network NEWTWORK_NAME
```
