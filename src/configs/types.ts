import { AbstractConnector } from "@web3-react/abstract-connector"


export type NetworkType = {
    name: string,
    chainId: number,
    rpcNodes: string[],
    blockExplorer: string,

    currencyName: string,
    currencySymbol: string,
    currencyDecimals: number,
}

export type ConnectorType = {
    name: string,
    connectorObject: AbstractConnector 
}

export interface ConnectorsType {
    [key: string]: ConnectorType
}


