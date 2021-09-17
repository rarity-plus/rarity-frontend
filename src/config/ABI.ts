/*
* Human Readable ABIs
* Be sure to set the correct function signature
* */

//TODO: Use generated ABIs instead of manual ones 

export const RARITY_ABI = [
  "function balanceOf(address owner) public view  returns (uint256)",
  "function ownerOf(uint256 tokenId) external view returns (address owner)",
  "function summoner(uint _summoner) external view returns (uint _xp, uint _log, uint _class, uint _level)",
  "function adventure(uint _summoner) external",
  "function adventurers_log(uint) public view returns (uint)"
]

export const RARITY_GOLD_ABI = [
  "function claim(uint summoner) external",
  "function approve(uint from, uint spender, uint amount) external returns (bool)",
  "function transfer(uint from, uint to, uint amount) external returns (bool)",
  "function transferFrom(uint executor, uint from, uint to, uint amount) external returns (bool)",
  "function wealth_by_level(uint level) public pure view returns (uint wealth)",
  "function balanceOf(uint) public view returns (uint)"
]

export const RARITY_SKILLS_ABI = [
  "function get_skills(uint _summoner) external view returns (uint8[36] memory)",
  "function set_skills(uint _summoner, uint8[36] memory _skills) external",
  "function skills(uint) public view returns (uint8[36])",
  "function base_per_class(uint _class) public pure returns (uint base)",
  "function skills_per_level(int _int, uint _class, uint _level) public pure returns (uint points)",
  "function modifier_for_attribute(uint _attribute) public pure returns (int _modifier)",
  "function class_skills(uint _class) public pure returns (bool[36] memory _skills)",
  "function is_valid_set(uint _summoner, uint8[36] memory _skills) public view returns (bool)",
  "function calculate_points_for_set(uint _class, uint8[36] memory _skills) public pure returns (uint points)",
  "function class_skills_by_name(uint _class) public view returns (string[] memory)",
]

export const RARITY_ATTRIBUTES_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"creator","type":"address"},{"indexed":false,"internalType":"uint256","name":"summoner","type":"uint256"},{"indexed":false,"internalType":"uint32","name":"strength","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"dexterity","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"constitution","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"intelligence","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"wisdom","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"charisma","type":"uint32"}],"name":"Created","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"leveler","type":"address"},{"indexed":false,"internalType":"uint256","name":"summoner","type":"uint256"},{"indexed":false,"internalType":"uint32","name":"strength","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"dexterity","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"constitution","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"intelligence","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"wisdom","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"charisma","type":"uint32"}],"name":"Leveled","type":"event"},{"inputs":[{"internalType":"uint256","name":"current_level","type":"uint256"}],"name":"abilities_by_level","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ability_scores","outputs":[{"internalType":"uint32","name":"strength","type":"uint32"},{"internalType":"uint32","name":"dexterity","type":"uint32"},{"internalType":"uint32","name":"constitution","type":"uint32"},{"internalType":"uint32","name":"intelligence","type":"uint32"},{"internalType":"uint32","name":"wisdom","type":"uint32"},{"internalType":"uint32","name":"charisma","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"score","type":"uint256"}],"name":"calc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_str","type":"uint256"},{"internalType":"uint256","name":"_dex","type":"uint256"},{"internalType":"uint256","name":"_const","type":"uint256"},{"internalType":"uint256","name":"_int","type":"uint256"},{"internalType":"uint256","name":"_wis","type":"uint256"},{"internalType":"uint256","name":"_cha","type":"uint256"}],"name":"calculate_point_buy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"character_created","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_summoner","type":"uint256"}],"name":"increase_charisma","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_summoner","type":"uint256"}],"name":"increase_constitution","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_summoner","type":"uint256"}],"name":"increase_dexterity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_summoner","type":"uint256"}],"name":"increase_intelligence","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_summoner","type":"uint256"}],"name":"increase_strength","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_summoner","type":"uint256"}],"name":"increase_wisdom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"level_points_spent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_summoner","type":"uint256"},{"internalType":"uint32","name":"_str","type":"uint32"},{"internalType":"uint32","name":"_dex","type":"uint32"},{"internalType":"uint32","name":"_const","type":"uint32"},{"internalType":"uint32","name":"_int","type":"uint32"},{"internalType":"uint32","name":"_wis","type":"uint32"},{"internalType":"uint32","name":"_cha","type":"uint32"}],"name":"point_buy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_summoner","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]