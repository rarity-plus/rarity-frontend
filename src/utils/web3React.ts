import { ethers } from 'ethers';
import { InjectedConnector } from '@web3-react/injected-connector';

const POLLING_INTERVAL = 12000


export const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
}