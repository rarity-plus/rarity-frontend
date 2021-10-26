import { useCallback } from "react"
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"

import Connectors from "@configs/connectors"
import { setupNetwork } from "@helpers/walletHelper"
import Networks from "@configs/networks"

const useAuth = () => {
    const { activate, deactivate } = useWeb3React()

    const login = useCallback((connectorKey?: string) => {
        const connector = Connectors[connectorKey ? connectorKey : "injected"]

        if(connector.connectorObject){
            activate(connector.connectorObject, async (error: Error) => {
                if (error instanceof UnsupportedChainIdError) {
                    const hasSetup = await setupNetwork(Networks['FTM'])
      
                    if (hasSetup) {
                      await activate(connector.connectorObject)
                    }
                }
            })
        }
    }, [activate])

    const logout = useCallback(() => {
        deactivate()
    }, [deactivate])

    return {
        login,
        logout
    }
}

export default useAuth