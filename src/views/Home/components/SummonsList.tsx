import { retryAxiosGet } from "@helpers/axiosHelper"
import { getRarityTokenURL } from "@helpers/ftmScanHelper"
import { useRarityContract } from "@hooks/useContract"
import useWeb3 from "@hooks/useWeb3"
import _ from "lodash"
import { useEffect, useState } from "react"
import SummonsListElement from "./SummonsListElement"


export interface SummonListProps {
    onSelectedCallback?: (tokenId: number) => void
}

const SummonList = ({ onSelectedCallback }: SummonListProps) => {
    const {account} = useWeb3()
    const rarityContract = useRarityContract()

    const [summons, setSummons] = useState<number[]>([])

    useEffect(() => {
        (async () => {
            if(!account){
                return;
            }

            summons.length > 0 &&  setSummons([])

            const response = await retryAxiosGet(getRarityTokenURL(account), {
                delay: 600,
                tries: 3
            })

            if(response){
                response.forEach(async (tx: any, _index: any, array: any) => {
                    if(!_.includes(array, tx.tokenID)){
                        const tokenOwner = await rarityContract.ownerOf(tx.tokenID)

                        if(tokenOwner.toString() === account){
                            return setSummons((prevSummons) => [...prevSummons, tx.tokenID])
                        }
                    }
                })
            }
        })()
    }, [])

    const renderElementList = summons.map((value, index) => {
        const onSelectedHandle = (tokenId: number) => {
           onSelectedCallback && onSelectedCallback(tokenId)
        }

        return (<SummonsListElement key={value+index} tokenId={value} onSelected={onSelectedHandle} />)
   })

    return (
        <>
           {summons.length > 0 && renderElementList}
        </>
    )
}

export default SummonList