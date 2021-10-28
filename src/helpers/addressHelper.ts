

/**
 * 
 * @returns contract addresses, it reverts to the mainnet contract addresses if the env ones are not set
 */
export const getContractAddress = () => {
    return [
        process.env.RARITY_CONTRACT_ADDRESS ?? '0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb',
        process.env.RARITY_GOLD_CONTRACT_ADDRESS ?? '0x2069B76Afe6b734Fb65D1d099E7ec64ee9CC76B2',
        process.env.RARITY_ATTRIBUTES_CONTRACT_ADDRESS ?? '0xB5F5AF1087A8DA62A23b08C00C6ec9af21F397a1'
    ]
}