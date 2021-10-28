import { BigNumber, BigNumberish, utils } from 'ethers';

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