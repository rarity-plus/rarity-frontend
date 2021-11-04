import { useCallback, useEffect } from "react"
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import Connectors from "@configs/connectors"
import { setupNetwork } from "@helpers/walletHelper"

import globalState from "@states/globalState"

const useAuth = () => {
    const { activate, deactivate, account } = useWeb3React()

    useEffect(() => {
        if(account){
            globalState.setEthAddress(account)
        }
    }, [account])

    const login = useCallback((connectorKey?: string) => {
        const connector = Connectors[connectorKey ? connectorKey : "injected"]

        if(connector.connectorObject){
            activate(connector.connectorObject, async (error: Error) => {
                if (error instanceof UnsupportedChainIdError) {
                    const hasSetup = await setupNetwork()
      
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