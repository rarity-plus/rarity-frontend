import useWeb3 from "./useWeb3";
import globalState from "@states/globalState";
import { useMemo } from "react";
import { getContractAddress } from "@helpers/contractHelper";

export const useRarityContract = () => {
    if(!globalState.isNetworkSet()){
        return null;
    }

    const { library } = useWeb3()
    const { RARITY_CONTRACT } = getContractAddress(globalState.network)

    return useMemo(() => {

    }, [])
}