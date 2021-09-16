import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { wrappedAxiosGet } from '../utils/axiosUtils';
import { getRaritySummonsAPIUrl } from '../utils/ftmscan';
import { useRarityContract } from '../hooks/useContract';
import _ from 'lodash';
import { RarityClasses } from '../utils/rarityHelper';
import { gameState } from '../contexts/Game';

const StyledLoginWrapper = styled.div`
  width: 100%;
  padding: 1rem 1rem;
`

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Logo = styled.h1`
  font-size: 3rem;
  padding: 1em 1em;
`

const CharacterInfo = styled.div`
  padding: 0.5em 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  & > * {
    margin-top: 0.1em;
  }
`

const ChracterTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
`

const CharacterId = styled.h2`
  font-size: small;
  opacity: 70%;
  margin-top: 0.5em;
`

const CharacterLevel = styled.span`
  font-size: small;
  font-weight: normal;
  align-self: start;
  margin-left: 0.2em;
  opacity: 80%;
`

const StyledAccountAddress = styled.p`
  padding: 0.5rem;
  opacity: .5;
`

//TODO: Use typings
const CharacterItem = (summonObj: any, selectSummonHandle: () => void) => {
  //TODO: Figure out why you need to do this
  const {summonClass, level, id} = summonObj.summonObj

  return (
    <div className={'panel flex row justify-between'}>
      <CharacterInfo>
        <ChracterTitle>
          <span>{RarityClasses[summonClass?.toString()]}</span>
          <CharacterLevel>Level {level?.toString()}</CharacterLevel>
        </ChracterTitle>
        <CharacterId>#{id}</CharacterId>
      </CharacterInfo>

      <button onClick={() => selectSummonHandle()} className={'btn'}>Select</button>
    </div>
  )
}

const CharacterSelectionView: React.FC = () => {
  const history = useHistory()
  const {account} = useWeb3React()
  const rarityContract = useRarityContract()

  const [summoners, setSummoners] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(!account){
      history.push("/")
    }

    account && (async () => {
      let response = await wrappedAxiosGet(getRaritySummonsAPIUrl(account), {
        delay: 600,
        tries: 3
      })

      //TODO: Need to find a better way of fetching tokens ids

      const rawTokenID = response?.map((tx, index, array) => {
            const id = tx.tokenID

            if(!_.includes(array, id)){
              return {id: Number(id)}
            }
      })

      const ownedTokenID = rawTokenID.map(async (token) => {
        const tokenOwner = await rarityContract.ownerOf(token.id)

        if (tokenOwner.toString() === account) {
          return Number(token.id)
        }
      })

      if(summoners.length > 0){
        setSummoners([])
      }

      for (const id of ownedTokenID) {
        const summon = await rarityContract.summoner(id)

        console.log(summon)
        let _id = await id

        setSummoners((oldSummoners) => [...oldSummoners, {
          id: _id,
          xp: summon[0],
          summonClass: summon[2],
          level: summon[3],
        }])
      }

      setLoading(true)
    })()
  }, [])

  const summonersListElement = summoners.map((rawSummon, index) => {
      const selectSummon = () => {
          gameState.setCurrentTokenId(rawSummon.id)

          history.push('/play')
      }

      return (
       <CharacterItem key={index} summonObj={rawSummon} selectSummonHandle={selectSummon} />
      )
  })

  return (
    <div className={'container'}>
      <StyledWrapper>
        <Logo className={'logo'}>Select an summon</Logo>

        <StyledLoginWrapper className={'panel black'}>
          <StyledAccountAddress>{`${account?.substring(0,5)}...${account?.substring(account.length - 4, account.length)}'s summons`}</StyledAccountAddress>
          {
            summonersListElement
          }

          {
            (summoners.length <= 0 && loading) && <button className={'btn'}>New Summon</button>
          }
        </StyledLoginWrapper>

      </StyledWrapper>
    </div>
  );
}


export default CharacterSelectionView;