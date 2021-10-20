import Web3 from 'web3';
import Identity from './contract/Identity.json';

let instance;
if(window.web3 !== undefined){
    let web3 = new Web3(window.web3.currentProvider);
    //contract deployed address
    instance = new web3.eth.Contract(Identity.abi,'0x0e13f14a7E0c307E288eE34F15c28850d8ac8449');
}
else
    instance = null;

export default instance;