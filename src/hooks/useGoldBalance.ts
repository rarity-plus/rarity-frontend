import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { useRarityGoldContract } from "./useContract"
import useRefresh from "./useRefresh"
import useWeb3 from "./useWeb3"

const useGoldBalance = () => {
    const rarityGoldContract = useRarityGoldContract()
    const {account} = useWeb3()
    const {fastRefresh} = useRefresh()

    const [balance, setBalance] = useState(0)

    useEffect(() => {
        (async () => {
            if(account){
                const rawBalance = await rarityGoldContract.balanceOf(account)
                
                setBalance(Number(ethers.utils.formatEther(rawBalance)))
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            if(account){
                const rawBalance = await rarityGoldContract.balanceOf(account)
                
                setBalance(Number(ethers.utils.formatEther(rawBalance)))
            }
        })()
    }, [fastRefresh])

    return balance
}

export default useGoldBalance