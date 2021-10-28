import { RarityClassEnum } from "@helpers/enums"
import { RARITY_CLASSES } from "@helpers/rarityHelper"
import { useRarityContract } from "@hooks/useContract"
import { useEffect, useState } from "react"

export interface SummonsListElementProps {
    tokenId: number,
    onSelected: (tokenId: number) => void
}

const SummonsListElement = ({tokenId, onSelected}: SummonsListElementProps) => {
    const rarityContract = useRarityContract()
    
    const [summonData, setSummonData] = useState({
        summonClass: "",
        level: ""
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async() => {
            const rawSummonData = await rarityContract.summoner(tokenId)
            
            setSummonData({
                summonClass: rawSummonData[2].toString(),
                level: rawSummonData[3].toString(),
            })

            setLoading(false)
        })()
    }, [])

    return (
        <div className='w-full bg-gray-500 bg-opacity-50 border border-gray-400 px-3 py-2'>
            {loading && (
                <div className="flex flex-col space-y-2"> 
                    <div className='w-1/2 p-3 bg-gray-700 animate-pulse rounded-md'></div>
                    <div className='w-10 p-2 bg-gray-700 animate-pulse rounded-md'></div>
                </div>
            )}

            {!loading && (
                <div className="flex flex-col space-y-2"> 
                    <div>{RARITY_CLASSES[Number(summonData.summonClass) as RarityClassEnum].title} </div>
                    <div>{summonData.level}</div>
                </div>
            )}
        </div>
    )
}

export default SummonsListElement