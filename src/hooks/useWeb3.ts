import { Web3Provider } from "@ethersproject/providers"
import { useWeb3React } from "@web3-react/core"
import { Web3ReactContextInterface } from "@web3-react/core/dist/types"
import { useEffect, useRef, useState } from "react"

import useRPCProvider from "./useRPCProvider"

const useWeb3 = (): Web3ReactContextInterface<Web3Provider> => {
    const { library, chainId, ...web3React } = useWeb3React()
    const rpcProvider = useRPCProvider()

    const refEth = useRef(library)
    const [provider, setprovider] = useState(library || rpcProvider)
    
    useEffect(() => {
        if (library !== refEth.current) {
            setprovider(library || rpcProvider)
            refEth.current = library
        }
    }, [library])

    return {library: provider, chainId: chainId, ...web3React}
}

export default useWeb3