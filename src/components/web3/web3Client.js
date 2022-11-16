import Web3 from 'web3';

let selectedAccount;
let isInitialized = false;
let erc20Contract;

export const init = async () => {
    let provider = window.ethereum;

    if(typeof provider !== 'undefined') {
      provider
        .request({method: 'eth_requestAccounts'})
        .then(accounts => {
            selectedAccount = accounts[0];
        console.log(`Selected account is ${selectedAccount}`)
      }).catch(err => {
        console.log(err);
      });

      window.ethereum.on('accountsChanged', function (accounts) {
        selectedAccount = accounts[0];
        console.log(`Selected account changed to ${selectedAccount}`);
      });
    }
    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    console.log(networkId, "net-id");
    const erc20Abi = [
        {
           "anonymous":false,
           "inputs":[
              {
                 "indexed":true,
                 "internalType":"address",
                 "name":"src",
                 "type":"address"
              },
              {
                 "indexed":true,
                 "internalType":"address",
                 "name":"guy",
                 "type":"address"
              },
              {
                 "indexed":false,
                 "internalType":"uint256",
                 "name":"wad",
                 "type":"uint256"
              }
           ],
           "name":"Approval",
           "type":"event"
        },
        {
           "anonymous":false,
           "inputs":[
              {
                 "indexed":true,
                 "internalType":"address",
                 "name":"dst",
                 "type":"address"
              },
              {
                 "indexed":false,
                 "internalType":"uint256",
                 "name":"wad",
                 "type":"uint256"
              }
           ],
           "name":"Deposit",
           "type":"event"
        },
        {
           "anonymous":false,
           "inputs":[
              {
                 "indexed":true,
                 "internalType":"address",
                 "name":"src",
                 "type":"address"
              },
              {
                 "indexed":true,
                 "internalType":"address",
                 "name":"dst",
                 "type":"address"
              },
              {
                 "indexed":false,
                 "internalType":"uint256",
                 "name":"wad",
                 "type":"uint256"
              }
           ],
           "name":"Transfer",
           "type":"event"
        },
        {
           "anonymous":false,
           "inputs":[
              {
                 "indexed":true,
                 "internalType":"address",
                 "name":"src",
                 "type":"address"
              },
              {
                 "indexed":false,
                 "internalType":"uint256",
                 "name":"wad",
                 "type":"uint256"
              }
           ],
           "name":"Withdrawal",
           "type":"event"
        },
        {
           "payable":true,
           "stateMutability":"payable",
           "type":"fallback"
        },
        {
           "constant":true,
           "inputs":[
              {
                 "internalType":"address",
                 "name":"",
                 "type":"address"
              },
              {
                 "internalType":"address",
                 "name":"",
                 "type":"address"
              }
           ],
           "name":"allowance",
           "outputs":[
              {
                 "internalType":"uint256",
                 "name":"",
                 "type":"uint256"
              }
           ],
           "payable":false,
           "stateMutability":"view",
           "type":"function"
        },
        {
           "constant":false,
           "inputs":[
              {
                 "internalType":"address",
                 "name":"guy",
                 "type":"address"
              },
              {
                 "internalType":"uint256",
                 "name":"wad",
                 "type":"uint256"
              }
           ],
           "name":"approve",
           "outputs":[
              {
                 "internalType":"bool",
                 "name":"",
                 "type":"bool"
              }
           ],
           "payable":false,
           "stateMutability":"nonpayable",
           "type":"function"
        },
        {
           "constant":true,
           "inputs":[
              {
                 "internalType":"address",
                 "name":"",
                 "type":"address"
              }
           ],
           "name":"balanceOf",
           "outputs":[
              {
                 "internalType":"uint256",
                 "name":"",
                 "type":"uint256"
              }
           ],
           "payable":false,
           "stateMutability":"view",
           "type":"function"
        },
        {
           "constant":true,
           "inputs":[
              
           ],
           "name":"decimals",
           "outputs":[
              {
                 "internalType":"uint8",
                 "name":"",
                 "type":"uint8"
              }
           ],
           "payable":false,
           "stateMutability":"view",
           "type":"function"
        },
        {
           "constant":false,
           "inputs":[
              
           ],
           "name":"deposit",
           "outputs":[
              
           ],
           "payable":true,
           "stateMutability":"payable",
           "type":"function"
        },
        {
           "constant":true,
           "inputs":[
              
           ],
           "name":"name",
           "outputs":[
              {
                 "internalType":"string",
                 "name":"",
                 "type":"string"
              }
           ],
           "payable":false,
           "stateMutability":"view",
           "type":"function"
        },
        {
           "constant":true,
           "inputs":[
              
           ],
           "name":"symbol",
           "outputs":[
              {
                 "internalType":"string",
                 "name":"",
                 "type":"string"
              }
           ],
           "payable":false,
           "stateMutability":"view",
           "type":"function"
        },
        {
           "constant":true,
           "inputs":[
              
           ],
           "name":"totalSupply",
           "outputs":[
              {
                 "internalType":"uint256",
                 "name":"",
                 "type":"uint256"
              }
           ],
           "payable":false,
           "stateMutability":"view",
           "type":"function"
        },
        {
           "constant":false,
           "inputs":[
              {
                 "internalType":"address",
                 "name":"dst",
                 "type":"address"
              },
              {
                 "internalType":"uint256",
                 "name":"wad",
                 "type":"uint256"
              }
           ],
           "name":"transfer",
           "outputs":[
              {
                 "internalType":"bool",
                 "name":"",
                 "type":"bool"
              }
           ],
           "payable":false,
           "stateMutability":"nonpayable",
           "type":"function"
        },
        {
           "constant":false,
           "inputs":[
              {
                 "internalType":"address",
                 "name":"src",
                 "type":"address"
              },
              {
                 "internalType":"address",
                 "name":"dst",
                 "type":"address"
              },
              {
                 "internalType":"uint256",
                 "name":"wad",
                 "type":"uint256"
              }
           ],
           "name":"transferFrom",
           "outputs":[
              {
                 "internalType":"bool",
                 "name":"",
                 "type":"bool"
              }
           ],
           "payable":false,
           "stateMutability":"nonpayable",
           "type":"function"
        },
        {
           "constant":false,
           "inputs":[
              {
                 "internalType":"uint256",
                 "name":"wad",
                 "type":"uint256"
              }
           ],
           "name":"withdraw",
           "outputs":[
              
           ],
           "payable":false,
           "stateMutability":"nonpayable",
           "type":"function"
        }
     ];
    const erc20Address = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'

    erc20Contract = new web3.eth.Contract(
        erc20Abi,
        erc20Address

    );

    isInitialized = true;
};

export const getBalance = async () => {
    if(!isInitialized){
        await init();
    }
    return erc20Contract.methods.balanceOf(selectedAccount).call().then(balance => {
        return Web3.utils.fromWei(balance);
    });

};
