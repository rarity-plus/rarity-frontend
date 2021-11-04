import Networks from '@configs/networks'
import { ethers } from 'ethers'
import _ from 'lodash'

export const POLLING_INTERVAL = 12000
export const RPC_NODE = _.sample(Networks.rpcNodes)

export const getWeb3Library = (provider: any) => {
    const library = new ethers.providers.Web3Provider(provider)
    library.pollingInterval = POLLING_INTERVAL
    return library
}

export const getRPCProvider = () => {
    return new ethers.providers.JsonRpcProvider(RPC_NODE)
}

