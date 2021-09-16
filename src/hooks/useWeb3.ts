import { useEffect, useRef, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { jsonRpcProvider } from '../utils/providers';
import { Web3Provider } from '@ethersproject/providers'
import network from '../config/network';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';


const useWeb3 = (): Web3ReactContextInterface<Web3Provider> => {
  const { library, chainId, ...web3React } = useWeb3React()
  const refEth = useRef(library)
  const [provider, setprovider] = useState(library || jsonRpcProvider)

  useEffect(() => {
    if (library !== refEth.current) {
      setprovider(library || jsonRpcProvider)
      refEth.current = library
    }
  }, [library])

  return { library: provider, chainId: chainId ?? network.chainId, ...web3React }
}

export default useWeb3