import { createElement, useEffect, useState } from 'react';
import { useRarityAttributeContract } from '../hooks/useContract';



const AttributesModal = createElement(() => {

  const [attributePoints, setAttributePoints] = useState([8,8,8,8,8,8])

  const rarityAttributeContract = useRarityAttributeContract()

  useEffect(() => {
    (async () => {
        const characterCreated = rarityAttributeContract.character_created()
    })()
  }, [])

  return (
    <h1>

    </h1>
  )
})

export default AttributesModal