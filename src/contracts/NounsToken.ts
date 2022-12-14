import { ethers } from "ethers";
import { Auction, Bid, Proposal, TokenMetadata, Vote, VoteDirection, NounsTokenSeed, Account, EventData } from '../types';
import { NounsTokenABI } from '@nouns/contracts';

export class _NounsToken {

  private provider : ethers.providers.JsonRpcProvider;
  public Contract :  ethers.Contract; 

  constructor(provider: ethers.providers.JsonRpcProvider) {

    this.provider = provider;
    this.Contract = new ethers.Contract( '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03' , NounsTokenABI, this.provider );
  }

  public async on( eventType: string, listener: Function) {

    switch(eventType) {

      case "DelegateChanged": // WORKING
  
        this.Contract.on("DelegateChanged", (delegator: string, fromDelegate: string, toDelegate: string, event: ethers.Event) => {
  
            const data: EventData.DelegateChanged = {
              delegator: { id : delegator } as Account,
              fromDelegate: { id : fromDelegate } as Account,
              toDelegate: { id : toDelegate } as Account,
              event: event
            };
  
            listener(data);
                  
          }); 
  
        break;
  
      case "DelegateVotesChanged" : // WORKING
  
        this.Contract.on("DelegateVotesChanged", (delegate: string, previousBalance: number, newBalance: number, event: ethers.Event) => {
  
          const data: EventData.DelegateVotesChanged = {
            delegate: { id: delegate } as Account,
            previousBalance: previousBalance,
            newBalance: newBalance,
            event: event
          };
  
          listener(data);
                  
        }); 
  
        break;
  
      case "Transfer" : // WORKING
              
        this.Contract.on("Transfer", (from: string, to: string, tokenId: number, event: ethers.Event) => {
                  
          const data: EventData.Transfer = {
            from: { id: from } as Account,
            to: { id: to } as Account,
            tokenId: tokenId,
            event: event
          }
  
          listener(data);
                  
        });        
        break;
  
      case "Approval" : // WORKING
  
        this.Contract.on("Approval", (owner: string, approved: string, tokenId: number, event: ethers.Event) => {
  
          const data: EventData.Approval = {
            owner: { id: owner } as Account,
            approved: { id: approved } as Account,
            tokenId: tokenId,
            event: event
          }
  
          listener(data);
              
        });  
  
        break;
  
  
      // **********************************************************
      //
      // TESTING - Double check details, haven't confirmed live event yet
      //
      // **********************************************************
      case "ApprovalForAll" :
  
        this.Contract.on("ApprovalForAll", (owner: string, operator: string, approved: boolean, event: ethers.Event) => {
  
          const data: EventData.ApprovalForAll = {
            owner: { id: owner } as Account,
            operator: { id: operator } as Account,
            approved: approved,
            event: event
          }
  
          listener(data);
  
        });
  
        break;
  
      case "NounCreated" : // WORKING
  
        this.Contract.on("NounCreated", (tokenId : number, seed: NounsTokenSeed, event: ethers.Event) => {
  
          const data : EventData.NounCreated = {
            id: tokenId,
            seed: seed,
            event: event
          }
  
          listener(data);
        });
  
        break;
  
      // **********************************************************
      //
      // TESTING - Double check details, haven't confirmed live event yet
      //
      // **********************************************************
      case "DescriptorLocked" :
  
        this.Contract.on("DescriptorLocked", (event: ethers.Event) => {
  
          const data: EventData.DescriptorLocked = {
            event: event
          }
  
          listener(data);
  
        });
  
      break;
  
  
      // **********************************************************
      //
      // TESTING - Double check details, haven't confirmed live event yet
      //
      // **********************************************************
      case "DescriptorUpdated" :
  
        this.Contract.on("DescriptorUpdated", (_descriptor: string, event: ethers.Event) => {
  
          const data : EventData.DescriptorUpdated = {
            descriptor: { id: _descriptor } as Account,
            event: event
          }
  
          listener(data);
  
        });
  
        break;
  
  
      // **********************************************************
      //
      // TESTING - Double check details, haven't confirmed live event yet
      //
      // **********************************************************
      case "MinterLocked" :
  
        this.Contract.on("MinterLocked", (event: ethers.Event) => {
  
        const data : EventData.MinterLocked = {
          event: event
        }
  
        listener(data);
        });
  
        break;
  
  
      // **********************************************************
      //
      // TESTING - Double check details, haven't confirmed live event yet
      //
      // **********************************************************
      case "MinterUpdated" :
  
        this.Contract.on("MinterUpdated", (_minter: string, event: ethers.Event) => {
  
          const data : EventData.MinterUpdated = {
            minter: { id: _minter } as Account,
            event: event
          }
  
          listener(data);
          
        });
  
        break;
  
        
      // **********************************************************
      //
      // TESTING - Double check details, haven't confirmed live event yet
      //
      // **********************************************************
      case "NounBurned" :
  
          this.Contract.on("NounBurned", (nounId: number, event: ethers.Event) => {
  
          const data : EventData.NounBurned = {
            id: nounId,
            event: event
          }
  
          listener(data);
        });
  
        break;
  
      // **********************************************************
      //
      // TESTING - Double check details, haven't confirmed live event yet
      //
      // **********************************************************
      case "NoundersDAOUpdated" :
  
          this.Contract.on("NoundersDAOUpdated", (_noundersDAO: string, event: ethers.Event) => {
  
            const data : EventData.NoundersDAOUpdated = {
              noundersDAO: { id: _noundersDAO } as Account,
              event: event
            }
  
            listener(data);
  
          });
  
        break;
  
  
      // **********************************************************
      //
      // TESTING - Double check details, haven't confirmed live event yet
      //
      // **********************************************************
      case "OwnershipTransferred" :
  
        this.Contract.on("OwnershipTransferred", (previousOwner: string, newOwner: string, event: ethers.Event) => {
  
          const data : EventData.OwnershipTransferred = {
            previousOwner: { id: previousOwner } as Account,
            newOwner: { id: newOwner } as Account,
            event: event
          }
  
          listener(data);
        });
  
        break;
  
  
  
      // **********************************************************
      //
      // TESTING - Double check details, haven't confirmed live event yet
      //
      // **********************************************************
      case "SeederLocked" :
  
        this.Contract.on("SeederLocked", (event: ethers.Event) => {
  
          const data : EventData.SeederLocked = {
            event: event
          }
  
          listener(data);
        });
  
        break;
      
  
        
      // **********************************************************
      //
      // TESTING - Double check details, haven't confirmed live event yet
      //
      // **********************************************************
      case "SeederUpdated" :
  
        this.Contract.on("SeederUpdated", (_seeder: string, event: ethers.Event) => {
    
          const data : EventData.SeederUpdated = {
            seeder: { id: _seeder } as Account,
            event: event
          }
    
          listener(data);
        });
    
        break;  
    }

  }

  public async callView( fName: string, fArgs: any[] ) {

    switch(fName) {
  
      case "DELEGATION_TYPEHASH": 
        return( await this.Contract.DELEGATION_TYPEHASH() ); // returns "bytes32", is it string in js?
        break;
  
      case "DOMAIN_TYPEHASH":
        return(await this.Contract.DOMAIN_TYPEHASH()); // returns "bytes32", is it string in js?
        break;
  
      case "balanceOf":
        return(await this.Contract.balanceOf(fArgs[0])); // returns uint256
        break;
      case "checkpoints":
        // address, checkpoint id. ID starts at zero and increments when checkpoints change
        return(await this.Contract.checkpoints(fArgs[0], fArgs[1])); 
        // returns [number (fromblock), big number (votes)]
        break;
      case "contractURI":
        return(await this.Contract.contractURI()); // returns string
        break;
  
      case "dataURI":
        // ARG is tokenID  - difficult one, fails on etherscan. Document how to consistently run
        return(await this.Contract.dataURI(fArgs[0])); // returns string
        break;
      case "decimals":
        return(await this.Contract.decimals()); // returns string
        break;
      case "delegates":
        return(await this.Contract.delegates(fArgs[0])); // returns string
        break;
      case "descriptor":
        return(await this.Contract.descriptor()); // returns string
        break;
      case "getApproved":
        return(await this.Contract.getApproved(fArgs[0])); // returns string
        break;
      case "getCurrentVotes":
        return(await this.Contract.getCurrentVotes(fArgs[0])); // returns BigNumber
        break;
      case "getPriorVotes":
        return(await this.Contract.getPriorVotes(fArgs[0], fArgs[1])); // returns BigNumber
        break;
      case "isApprovedForAll":
  // {
  //   "inputs": [
  //     {
  //       "internalType": "address",
  //       "name": "owner",
  //       "type": "address"
  //     },
  //     {
  //       "internalType": "address",
  //       "name": "operator",
  //       "type": "address"
  //     }
  //   ],
  //   "name": "isApprovedForAll",
  //   "outputs": [
  //     {
  //       "internalType": "bool",
  //       "name": "",
  //       "type": "bool"
  //     }
  //   ],
  //   "stateMutability": "view",
  //   "type": "function"
  // },
        break;
      case "isDescriptorLocked":
  // {
  //   "inputs": [],
  //   "name": "isDescriptorLocked",
  //   "outputs": [
  //     {
  //       "internalType": "bool",
  //       "name": "",
  //       "type": "bool"
  //     }
  //   ],
  //   "stateMutability": "view",
  //   "type": "function"
  // },
        break;
      case "isMinterLocked":
  
  // {
  //   "inputs": [],
  //   "name": "isMinterLocked",
  //   "outputs": [
  //     {
  //       "internalType": "bool",
  //       "name": "",
  //       "type": "bool"
  //     }
  //   ],
  //   "stateMutability": "view",
  //   "type": "function"
  // },
  
        break;
      case "isSeederlocked":
  
      
  // {
  //   "inputs": [],
  //   "name": "isSeederLocked",
  //   "outputs": [
  //     {
  //       "internalType": "bool",
  //       "name": "",
  //       "type": "bool"
  //     }
  //   ],
  //   "stateMutability": "view",
  //   "type": "function"
  // },
        break;
      case "minter":
  // {
  //   "inputs": [],
  //   "name": "minter",
  //   "outputs": [
  //     {
  //       "internalType": "address",
  //       "name": "",
  //       "type": "address"
  //     }
  //   ],
  //   "stateMutability": "view",
  //   "type": "function"
  // },
  
        break;
      case "name":
  // {
  //   "inputs": [],
  //   "name": "name",
  //   "outputs": [
  //     {
  //       "internalType": "string",
  //       "name": "",
  //       "type": "string"
  //     }
  //   ],
  //   "stateMutability": "view",
  //   "type": "function"
  // },
        break;
      case "nonces":
  // {
  //   "inputs": [
  //     {
  //       "internalType": "address",
  //       "name": "",
  //       "type": "address"
  //     }
  //   ],
  //   "name": "nonces",
  //   "outputs": [
  //     {
  //       "internalType": "uint256",
  //       "name": "",
  //       "type": "uint256"
  //     }
  //   ],
  //   "stateMutability": "view",
  //   "type": "function"
  // },
        break;
      case "noundersDAO":
  // {
  //   "inputs": [],
  //   "name": "noundersDAO",
  //   "outputs": [
  //     {
  //       "internalType": "address",
  //       "name": "",
  //       "type": "address"
  //     }
  //   ],
  //   "stateMutability": "view",
  //   "type": "function"
  // },
        break;
      case "numCheckpoints":
  // {
  //   "inputs": [
  //     {
  //       "internalType": "address",
  //       "name": "",
  //       "type": "address"
  //     }
  //   ],
  //   "name": "numCheckpoints",
  //   "outputs": [
  //     {
  //       "internalType": "uint32",
  //       "name": "",
  //       "type": "uint32"
  //     }
  //   ],
  //   "stateMutability": "view",
  //   "type": "function"
  // },
        break;
      case "owner":
  // {
  //   "inputs": [],
  //   "name": "owner",
  //   "outputs": [
  //     {
  //       "internalType": "address",
  //       "name": "",
  //       "type": "address"
  //     }
  //   ],
  //   "stateMutability": "view",
  //   "type": "function"
  // },
        break;
      case "ownerOf":
        return(await this.Contract.ownerOf(fArgs[0])); // returns address string
        break;
      case "proxyRegistry":
  // {
  //   "inputs": [],
  //   "name": "proxyRegistry",
  //   "outputs": [
  //     {
  //       "internalType": "contract IProxyRegistry",
  //       "name": "",
  //       "type": "address"
  //     }
  //   ],
  //   "stateMutability": "view",
  //   "type": "function"
  // },
        break;
      case "seeder":
  // {
  //   "inputs": [],
  //   "name": "seeder",
  //   "outputs": [
  //     {
  //       "internalType": "contract INounsSeeder",
  //       "name": "",
  //       "type": "address"
  //     }
  //   ],
  //   "stateMutability": "view",
  //   "type": "function"
  // },
        break;
      case "seeds":
  // {
  //   "inputs": [
  //     {
  //       "internalType": "uint256",
  //       "name": "",
  //       "type": "uint256"
  //     }
  //   ],
  //   "name": "seeds",
  //   "outputs": [
  //     {
  //       "internalType": "uint48",
  //       "name": "background",
  //       "type": "uint48"
  //     },
  //     {
  //       "internalType": "uint48",
  //       "name": "body",
  //       "type": "uint48"
  //     },
  //     {
  //       "internalType": "uint48",
  //       "name": "accessory",
  //       "type": "uint48"
  //     },
  //     {
  //       "internalType": "uint48",
  //       "name": "head",
  //       "type": "uint48"
  //     },
  //     {
  //       "internalType": "uint48",
  //       "name": "glasses",
  //       "type": "uint48"
  //     }
  //   ],
  //   "stateMutability": "view",
  //   "type": "function"
  // },
        break;
      case "supportsInterface":
  // {
  //   "inputs": [
  //     {
  //       "internalType": "bytes4",
  //       "name": "interfaceId",
  //       "type": "bytes4"
  //     }
  //   ],
  //   "name": "supportsInterface",
  //   "outputs": [
  //     {
  //       "internalType": "bool",
  //       "name": "",
  //       "type": "bool"
  //     }
  //   ],
  //   "stateMutability": "view",
  //   "type": "function"
  // },
        break;
      case "symbol":
  // {
  //   "inputs": [],
  //   "name": "symbol",
  //   "outputs": [
  //     {
  //       "internalType": "string",
  //       "name": "",
  //       "type": "string"
  //     }
  //   ],
  //   "stateMutability": "view",
  //   "type": "function"
  // },
        break;
      case "tokenByIndex":
  // {
  //   "inputs": [
  //     {
  //       "internalType": "uint256",
  //       "name": "index",
  //       "type": "uint256"
  //     }
  //   ],
  //   "name": "tokenByIndex",
  //   "outputs": [
  //     {
  //       "internalType": "uint256",
  //       "name": "",
  //       "type": "uint256"
  //     }
  //   ],
  //   "stateMutability": "view",
  //   "type": "function"
  // },
        break;
      case "tokenOfOwnerByIndex":
  // {
  //   "inputs": [
  //     {
  //       "internalType": "address",
  //       "name": "owner",
  //       "type": "address"
  //     },
  //     {
  //       "internalType": "uint256",
  //       "name": "index",
  //       "type": "uint256"
  //     }
  //   ],
  //   "name": "tokenOfOwnerByIndex",
  //   "outputs": [
  //     {
  //       "internalType": "uint256",
  //       "name": "",
  //       "type": "uint256"
  //     }
  //   ],
  //   "stateMutability": "view",
  //   "type": "function"
  // },
        break;
      case "tokenURI":
  // {
  //   "inputs": [
  //     {
  //       "internalType": "uint256",
  //       "name": "tokenId",
  //       "type": "uint256"
  //     }
  //   ],
  //   "name": "tokenURI",
  //   "outputs": [
  //     {
  //       "internalType": "string",
  //       "name": "",
  //       "type": "string"
  //     }
  //   ],
  //   "stateMutability": "view",
  //   "type": "function"
  // },
        break;
      case "totalSupply":
  
  // {
  //   "inputs": [],
  //   "name": "totalSupply",
  //   "outputs": [
  //     {
  //       "internalType": "uint256",
  //       "name": "",
  //       "type": "uint256"
  //     }
  //   ],
  //   "stateMutability": "view",
  //   "type": "function"
  // },
        break;
      case "votesToDelegate":
  // {
  //   "inputs": [
  //     {
  //       "internalType": "address",
  //       "name": "delegator",
  //       "type": "address"
  //     }
  //   ],
  //   "name": "votesToDelegate",
  //   "outputs": [
  //     {
  //       "internalType": "uint96",
  //       "name": "",
  //       "type": "uint96"
  //     }
  //   ],
  //   "stateMutability": "view",
  //   "type": "function"
  // }
        break;
    }
  
  }

  public name() {
    return "NounsToken";
  }

}