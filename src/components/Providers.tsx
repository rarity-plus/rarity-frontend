import React from "react"
import { Web3ReactProvider } from '@web3-react/core'
import { RefreshContextProvider } from "@contexts/RefreshContext"

import { getWeb3Library } from '@helpers/web3Helper'

const Providers: React.FC = ({children}) => {
    return (
        <Web3ReactProvider getLibrary={getWeb3Library}>
            <RefreshContextProvider>
                {children}
            </RefreshContextProvider>
        </Web3ReactProvider>
    )
}

export default Providers