

export type NetworkType = {
    name: string,
    chainId: number,
    rpcNodes: string[],
    blockExplorer: string,

    currencyName: string,
    currencySymbol: string,
    currencyDecimals: number
}