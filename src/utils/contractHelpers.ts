import { ethers } from 'ethers';

import { RARITY_ABI, RARITY_ATTRIBUTES_ABI, RARITY_GOLD_ABI } from '../config/ABI';

import { jsonRpcProvider } from './providers';

export const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? jsonRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getRarityContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
    return getContract(RARITY_ABI, address, signer)
}

export const getRarityGoldContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(RARITY_GOLD_ABI, address, signer)
}

export const getRarityAttributeContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(RARITY_ATTRIBUTES_ABI, address, signer)
}
