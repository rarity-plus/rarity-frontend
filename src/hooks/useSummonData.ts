import { useEffect, useState } from "react"
import { autorun } from "mobx"
import globalState from "@states/globalState"
import { useRarityContract } from "./useContract"
import useRefresh from "./useRefresh"


const useSummonData = () => {
    const {summonId} = globalState
    const rarityContract = useRarityContract()
    const {slowRefresh} = useRefresh()

    const [summonData, setSummonData] = useState({
        xp: "",
        summonClass: "",
        level: ""
    })

    useEffect(() => {
        autorun(async () => {
            if(summonId){
                const rawSummonData = await rarityContract.summoner(summonId)

                setSummonData({
                    xp: rawSummonData[0],
                    summonClass: rawSummonData[2],
                    level: rawSummonData[3]
                })
            }
        })
    }, [])

    useEffect(() => {
        (async () => {
            if(summonId){
                const rawSummonData = await rarityContract.summoner(summonId)

                setSummonData({
                    xp: rawSummonData[0],
                    summonClass: rawSummonData[2],
                    level: rawSummonData[3]
                })
            }
        })()
    }, [slowRefresh])

    return summonData
}

export default useSummonData