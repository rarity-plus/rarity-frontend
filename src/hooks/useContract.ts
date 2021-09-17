import useWeb3 from './useWeb3';
import { useMemo } from 'react';
import { getRarityAttributeContract, getRarityContract, getRarityGoldContract } from '../utils/contractHelpers';
import addresses from '../config/addresses';


export const useRarityContract = () => {
  const { library } = useWeb3()

  return useMemo(() => getRarityContract(addresses.RARITY_CONTRACT, library.getSigner()), [library])
}

export const useRarityGoldContract = () => {
  const { library } = useWeb3()

  return useMemo(() => getRarityGoldContract(addresses.RARITY_GOLD_CONTRACT, library.getSigner()), [library])
}

export const useRarityAttributeContract = () => {
  const { library } = useWeb3()

  return useMemo(() => getRarityAttributeContract(addresses.RARITY_ATTRIBUTE_CONTRACT, library.getSigner()), [library])
}