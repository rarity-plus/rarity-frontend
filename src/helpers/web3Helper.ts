import { ethers } from 'ethers'

export const POLLING_INTERVAL = 12000

export const getWeb3Library = (provider: any) => {
    const library = new ethers.providers.Web3Provider(provider)
    library.pollingInterval = POLLING_INTERVAL
    return library
}

