import { RPC_NODES } from "@configs/networks";
import _ from 'lodash'

export const setupNetwork = async () => {
    const provider = (window as any)['ethereum']
    
    if (provider) {
      let rpcNode = _.sample(RPC_NODES)
  
      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: process.env.CHAIN_ID,
              chainName: "Fantom Opera",
              nativeCurrency: {
                name: "FTM",
                symbol: "ftm",
                decimals: 18,
              },
              rpcUrls: [
                rpcNode
              ],
  
              blockExplorerUrls: [process.env.BLOCK_EXPLORER],
            },
          ],
        })
        return true
      } catch (error) {
        console.error('Failed to setup the network in Metamask:', error)
        return false
      }
    } else {
      console.error("Can't setup the network because window.ethereum is undefined")
      return false
    }
  }