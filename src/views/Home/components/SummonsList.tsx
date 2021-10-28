import { retryAxiosGet } from "@helpers/axiosHelper"
import { getRarityTokenURL } from "@helpers/ftmScanHelper"
import { useRarityContract } from "@hooks/useContract"
import useWeb3 from "@hooks/useWeb3"
import _ from "lodash"
import { useEffect, useState } from "react"


export interface SummonListProps {
    onSelectedCallback?: () => void
}

const SummonList = ({ onSelectedCallback }: SummonListProps) => {
    const {library, account} = useWeb3()
    const rarityContract = useRarityContract()

    const [summons, setSummons] = useState<number[]>([])

    useEffect(() => {
        (async () => {
            if(!account){
                return;
            }

            const response = await retryAxiosGet(getRarityTokenURL(account), {
                delay: 600,
                tries: 3
            })

            if(response){
                response.forEach(async (tx: any, _index: any, array: any) => {
                    if(!_.includes(array, tx.tokenID)){
                        const tokenOwner = await rarityContract.ownerOf(tx.tokenID)

                        if(tokenOwner.toString() === account){
                            return setSummons([...summons, tx.tokenID])
                        }
                    }
                })
            }
        })()
    }, [])

    return (
        <>
           {summons.length <= 0 ? 'Zero Summon' : summons.map((value) => {
                console.log(value)
                //    return (<>{value}</>)
           })}
        </>
    )
}

export default SummonList