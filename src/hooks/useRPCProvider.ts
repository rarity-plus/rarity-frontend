import { ethers } from "ethers"
import { autorun } from "mobx"
import { useEffect, useState } from "react"

import globalState from "@states/globalState"
import Networks from "@configs/networks"
import _ from "lodash"

const useRPCProvider = () => {
    const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider | null>(null)

    useEffect(() => {
        autorun(() => {
            if(!globalState.isNetworkSet()){
                return;
            }

            const rpcNode = _.sample(Networks[globalState.network].rpcNodes)

            setProvider(new ethers.providers.JsonRpcProvider(rpcNode))
        })
    }, [])

    return provider
}

export default useRPCProvider