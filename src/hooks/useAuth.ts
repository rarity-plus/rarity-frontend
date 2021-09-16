import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { useCallback, useContext } from 'react';

import { connectors } from '../config/connectors';
import { Simulate } from 'react-dom/test-utils';
import { setupNetwork } from '../utils/wallet';

//TODO: Needs to use connectors based on user choice

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()

  const login = useCallback(() => {
      let connector = connectors["injected"]

      if(connector){
          activate(connector, async (error: Error) => {
            if (error instanceof UnsupportedChainIdError) {
              const hasSetup = await setupNetwork()

              if (hasSetup) {
                await activate(connector)
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