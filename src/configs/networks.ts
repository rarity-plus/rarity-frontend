import { NetworksType } from "./types";


const Networks: NetworksType = {
    "FTM": {
        name: "Fantom Opera Mainnet",
        chainId: 9,
        rpcNodes: [
            "https://rpcapi.fantom.network"
        ],
        blockExplorer: "https://ftmscan.com/",
        
        currencyName: "FTM",
        currencySymbol: "ftm",
        currencyDecimals: 18
    }
}

export default Networks