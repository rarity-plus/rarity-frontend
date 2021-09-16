import network from '../config/network';
import _ from 'lodash';

export const setupNetwork = async () => {
  const provider = window.ethereum
  if (provider) {

    let rpcNode = _.sample(network.rpcNodes)

    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: network.chainId,
            chainName: network.name,
            nativeCurrency: {
              name: 'FTM',
              symbol: 'ftm',
              decimals: 18,
            },
            rpcUrls: [
              rpcNode
            ],

            blockExplorerUrls: [network.blockExplorer],
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