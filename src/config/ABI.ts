/*
* Human Readable ABIs
* Be sure to set the correct function signature
* */

export const RARITY_ABI = [
  "function balanceOf(address owner) public view  returns (uint256)",
  "function ownerOf(uint256 tokenId) external view returns (address owner)",
  "function summoner(uint _summoner) external view returns (uint _xp, uint _log, uint _class, uint _level)",
  "function adventure(uint _summoner) external",
  "function adventurers_log(uint) public view returns (uint)"
]

export const RARITY_GOLD = [
  "function claim(uint summoner) external",
  "function approve(uint from, uint spender, uint amount) external returns (bool)",
  "function transfer(uint from, uint to, uint amount) external returns (bool)",
  "function transferFrom(uint executor, uint from, uint to, uint amount) external returns (bool)",
  "function wealth_by_level(uint level) public pure view returns (uint wealth)",
  "function balanceOf(uint) public view returns (uint)"
]