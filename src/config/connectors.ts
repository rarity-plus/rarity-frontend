import { InjectedConnector } from '@web3-react/injected-connector';

const injected = new InjectedConnector({ supportedChainIds: [250] })

export const connectors: {
  [key: string]: InjectedConnector
} = {
  "injected": injected
}