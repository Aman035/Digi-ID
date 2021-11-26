import Web3 from 'web3';
let web3;
if(window.ethereum !== undefined){
    web3 = new Web3(window.ethereum);
}
else
    web3 = null;

export default web3;