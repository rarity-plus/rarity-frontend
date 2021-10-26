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
        currencyDecimals: 18,

        addresses: {
            RARITY_CONTRACT: "0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb",
            RARITY_GOLD_CONTRACT: "0x2069B76Afe6b734Fb65D1d099E7ec64ee9CC76B2",
            RARITY_ATTRIBUTE_CONTRACT: "0xB5F5AF1087A8DA62A23b08C00C6ec9af21F397a1"
        }
    }
}

export default Networks