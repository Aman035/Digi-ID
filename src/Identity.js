import web3 from './web3';
import Identity from './contract/Identity.json';
import { CONTRACT_ADDRESS } from './helper';

let instance;
if(window.web3 !== undefined){
    instance = new web3.eth.Contract(Identity.abi,CONTRACT_ADDRESS);
}
else
    instance = null;

export default instance;