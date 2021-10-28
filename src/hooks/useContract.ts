import { useMemo } from "react";
import { getContractAddress } from "@helpers/addressHelper";
import { getRarityAttributesContract, getRarityContract, getRarityGoldContract } from "@helpers/contractHelper";
import useWeb3 from "./useWeb3";

const { RARITY_CONTRACT_ADDRESS, RARITY_GOLD_CONTRACT_ADDRESS, RARITY_ATTRIBUTES_CONTRACT_ADDRESS  } = getContractAddress()

export const useRarityContract = () => {
    const { library } = useWeb3()
    return useMemo(() => getRarityContract(RARITY_CONTRACT_ADDRESS, library?.getSigner()), [library])
}

export const useRarityGoldContract = () => {
    const { library } = useWeb3()
    return useMemo(() => getRarityGoldContract(RARITY_GOLD_CONTRACT_ADDRESS, library?.getSigner()), [library])
}

export const useRarityAttributesContract = () => {
    const { library } = useWeb3()
    return useMemo(() => getRarityAttributesContract(RARITY_ATTRIBUTES_CONTRACT_ADDRESS, library?.getSigner()), [library])
}