import Networks from "@configs/networks"
import { ethers } from "ethers"
import { RARITY_ABI, RARITY_ATTRIBUTES_ABI, RARITY_GOLD_ABI, RARITY_SKILLS_ABI } from "./abiHelper"
import { getRPCProvider } from "./web3Helper"

export type ContractSignature = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => ethers.Contract

export const getContract = (abi: any[], address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
    const signerOrProvider = signer ?? getRPCProvider()

    return new ethers.Contract(address, abi, signerOrProvider)
}

export const getRarityContract: ContractSignature = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
    return getContract(RARITY_ABI, address, signer)
}

export const getRarityGoldContract: ContractSignature = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
    return getContract(RARITY_GOLD_ABI, address, signer)
}

export const getRaritySkillsContract: ContractSignature = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
    return getContract(RARITY_SKILLS_ABI, address, signer)
}

export const getRarityAttributesContract: ContractSignature = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
    return getContract(RARITY_ATTRIBUTES_ABI, address, signer)
}



