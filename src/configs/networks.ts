import { NetworkType } from "./types";

export const RPC_NODES = [
    process.env.RPC_NODE_1,
    process.env.RPC_NODE_2,
    process.env.RPC_NODE_3
]

const Networks: NetworkType = {
    name: "Fantom Opera",
    chainId: 2,
    rpcNodes: [
        "https://rpcapi.fantom.network"
    ],
    blockExplorer: "https://ftmscan.com/",
    
    currencyName: "FTM",
    currencySymbol: "ftm",
    currencyDecimals: 18,
}

export default Networks