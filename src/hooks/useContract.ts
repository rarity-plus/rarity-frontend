import useWeb3 from './useWeb3';
import { useMemo } from 'react';
import { getRarityContract } from '../utils/contractHelpers';
import addresses from '../config/addresses';


export const useRarityContract = () => {
  const { library } = useWeb3()

  return useMemo(() => getRarityContract(addresses.RARITY_CONTRACT, library.getSigner()), [library])
}

export const useRarityGoldContract = () => {
  const { library } = useWeb3()

  return useMemo(() => getRarityContract(addresses.RARITY_CONTRACT, library.getSigner()), [library])
}