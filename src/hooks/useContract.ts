import useWeb3 from './useWeb3';
import { useMemo } from 'react';
import { getContract, getRarityContract } from '../utils/contractHelpers';
import addresses from '../config/addresses';


export const useRarityContract = () => {
  const { library, account } = useWeb3()

  return useMemo(() => getRarityContract(addresses.RARITY_CONTRACT, library.getSigner()), [library])
}