import { BigNumber} from 'ethers';
import { RarityAttributesType, RarityClassType } from './types';
import { RarityAttributesEnum, RarityClassEnum } from './enums';

export const RARITY_CLASSES: RarityClassType = {
   [RarityClassEnum.BARBARIAN]: {
        title: "Barbarian",
        description: "TODO"
    },
   [RarityClassEnum.BARD]: {
        title: "Bard",
        description: "TODO"
    },
    [RarityClassEnum.CLERIC]: {
        title: "Cleric",
        description: "TODO"
    },
    [RarityClassEnum.DRUID]: {
        title: "Druid",
        description: "TODO"
    },
    [RarityClassEnum.FIGHTER]: {
        title: "Fighter",
        description: "TODO"
    },
    [RarityClassEnum.MONK]: {
        title: "Monk",
        description: "TODO"
    },
    [RarityClassEnum.PALADIN]: {
        title: "Paladin",
        description: "TODO"
    },
    [RarityClassEnum.RANGER]: {
        title: "Ranger",
        description: "TODO"
    },
    [RarityClassEnum.ROGUE]: {
        title: "Rogue",
        description: "TODO"
    },
    [RarityClassEnum.SORCERER]: {
        title: "Sorcerer",
        description: "TODO"
    },
    [RarityClassEnum.WIZARD]: {
        title: "Wizard",
        description: "TODO"
    },
}

export const RARITY_ATTRIBUTES: RarityAttributesType = {
    [RarityAttributesEnum.STRENGTH]: {
        title: "Strength"
    },
    [RarityAttributesEnum.DEXTERITY]: {
        title: "Dexterity"
    },
    [RarityAttributesEnum.CONSTITUTION]: {
        title: "Constitution"
    },
    [RarityAttributesEnum.INTELLIGENCE]: {
        title: "Intelligence"
    },
    [RarityAttributesEnum.WISDOM]: {
        title: "Wisdom"
    },
    [RarityAttributesEnum.CHARISMA]: {
        title: "Charisma"
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