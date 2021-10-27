import Web3 from 'web3';
import Identity from './contract/Identity.json';

let instance;
if(window.web3 !== undefined){
    let web3 = new Web3(window.web3.currentProvider);
    //deploy contract instance
    instance = new web3.eth.Contract(Identity.abi,'0x920223824262C11B96b30F0809F0c6A930f1C7bE');
}
else
    instance = null;

export default instance;