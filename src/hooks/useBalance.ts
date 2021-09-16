import { useRarityGoldContract } from './useContract';
import { useEffect, useState } from 'react';
import { autorun } from 'mobx';
import { gameState } from '../contexts/Game';
import useWeb3 from './useWeb3';


const useBalance = (): number => {
  const goldContract = useRarityGoldContract()
  const {account} = useWeb3()
  const [balance, setBalance] = useState(0)

  useEffect( () => {
    autorun( async () => {
      if(account){
        const rawBalance = await goldContract.balanceOf(gameState.currentTokenId)

        console.log(rawBalance)

        setBalance(rawBalance.toString())
      }
    })
  }, [])

  return balance
}

export default useBalance