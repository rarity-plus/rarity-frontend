import { BigNumber} from 'ethers';
import { RarityClassType } from './types';
import { RarityClassEnum } from './enums';

export const RARITY_CLASSES: RarityClassType = {
   [RarityClassEnum.BARBARIAN]: {
        name: "Barbarian",
        description: "TODO"
    },
   [RarityClassEnum.BARD]: {
        name: "Bard",
        description: "TODO"
    },
    [RarityClassEnum.CLERIC]: {
        name: "Cleric",
        description: "TODO"
    },
    [RarityClassEnum.DRUID]: {
        name: "Druid",
        description: "TODO"
    },
    [RarityClassEnum.FIGHTER]: {
        name: "Fighter",
        description: "TODO"
    },
    [RarityClassEnum.MONK]: {
        name: "Monk",
        description: "TODO"
    },
    [RarityClassEnum.PALADIN]: {
        name: "Paladin",
        description: "TODO"
    },
    [RarityClassEnum.RANGER]: {
        name: "Ranger",
        description: "TODO"
    },
    [RarityClassEnum.ROGUE]: {
        name: "Rogue",
        description: "TODO"
    },
    [RarityClassEnum.SORCERER]: {
        name: "Sorcerer",
        description: "TODO"
    },
    [RarityClassEnum.WIZARD]: {
        name: "Wizard",
        description: "TODO"
    },
}



export const getXPRequiredToLevelUP = (currentLevel: number) => {
    if(currentLevel <= 0) return 0;

    let requiredXP = BigNumber.from(currentLevel).mul(1000)

    for(let i = 1; i < currentLevel; i++){
        requiredXP = requiredXP.add(BigNumber.from(i).mul(1000))
    }

    return requiredXP
}

export const formatXP = (xp: string) => {
    if(xp.length <= 0) return 0;

    return (BigNumber.from(xp).div(BigNumber.from(10).pow(18))).toString()
}

export const formatXPPercentage = (xp: string, level: number) => {
    const requiredXP = getXPRequiredToLevelUP(level)

    if(requiredXP <= 0) return 0;

    return BigNumber.from(xp).mul(100).div(requiredXP)
}