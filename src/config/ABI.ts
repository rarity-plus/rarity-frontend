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

export const RARITY_SKILLS = [
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