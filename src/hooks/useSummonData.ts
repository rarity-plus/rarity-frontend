import { useRarityContract } from './useContract';
import { useEffect, useState } from 'react';
import { autorun } from 'mobx';

import { gameState } from '../contexts/Game';
import { useWeb3React } from '@web3-react/core';

//TODO: Use useEffect and useState
const useSummonData = (): {xp: string, summonClass: string, level: string} => {
  const {account} = useWeb3React()
  const rarityContract = useRarityContract()

  const [summonData, setSummonData] = useState({
    xp: "",
    summonClass: "",
    level: "",
  })

  useEffect( () => {
    (async() => {
      if(account){
        const summon = await rarityContract.summoner(gameState.currentTokenId)

        setSummonData({
          xp: summon[0].toString(),
          summonClass: summon[2].toString(),
          level: summon[3].toString(),
        })
      }
    })()
  }, [account, rarityContract])

  return summonData
}

export default useSummonData