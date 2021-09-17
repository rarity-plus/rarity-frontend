

export const RarityClasses = {
    1: "Barbarian",
    2: "Bard",
    3: "Cleric",
    4: "Druid",
    5: "Fighter",
    6: "Monk",
    7: "Paladin",
    8: "Ranger",
    9: "Rogue",
    10: "Sorcerer",
    11: "Wizard"
}

export const RaritySkills = {
    1: {
       name: "Appraise",
       attributeId: 4,
       synergy: 6,
       retry: false,
       armorCheckPenalty: false,
       check: "You can appraise common or well-known objects with a DC 12 Appraise check. Failure means that you estimate the value at 50% to 150% (2d6+3 times 10%,) of its actual value. Appraising a rare or exotic item requires a successful check against DC 15, 20, or higher. If the check is successful, you estimate the value correctly; failure means you cannot estimate the items value.",
       action: "Appraising an item takes 1 minute (ten consecutive full-round actions)."
    },
    2: {
        name: "Balance",
        attributeId: 2,
        synergy: 34,
        retry: false,
        armorCheckPenalty: true,
        check: "You can walk on a precarious surface. A successful check lets you move at half your speed along the surface for 1 round. A failure by 4 or less means you cant move for 1 round. A failure by 5 or more means you fall. The difficulty varies with the surface, as follows:",
        action: "None. A Balance check doesnt require an action; it is made as part of another action or as a reaction to a situation."
    },
    3: {
        name: "Bluff",
        attributeId: 6,
        synergy: 0,
        retry: true,
        armorCheckPenalty: false,
        check: "A Bluff check is opposed by the targets Sense Motive check. See the accompanying table for examples of different kinds of bluffs and the modifier to the targets Sense Motive check for each one.",
        action: "Varies. A Bluff check made as part of general interaction always takes at least 1 round (and is at least a full-round action), but it can take much longer if you try something elaborate."
    },
    4: {
        name: "Climb",
        attributeId: 6,
        synergy: 0,
        retry: true,
        armorCheckPenalty: false,
        check: "A Bluff check is opposed by the targets Sense Motive check. See the accompanying table for examples of different kinds of bluffs and the modifier to the targets Sense Motive check for each one.",
        action: "Varies. A Bluff check made as part of general interaction always takes at least 1 round (and is at least a full-round action), but it can take much longer if you try something elaborate."
    },
}