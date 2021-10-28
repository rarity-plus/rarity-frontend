

export const FTMSCAN_API_KEY = "2VB2G9EGY5156FY3UBVH9JGPINPFBG6I8U"

export const getRarityTokenURL = (account: string) => {
    return `https://api.ftmscan.com/api?module=account&action=tokennfttx&contractaddress=0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb&address=${account}&apikey=${FTM_APY_KEY}`
  }