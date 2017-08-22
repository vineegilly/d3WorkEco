// names
/*
 beetle,grass,earthworm,flower,hawk,
 mushroom,snake,tree, mouse,butterfly,raccoon,
 deer,rabbit,coyote,frog,songbird
 */
var d3 = require('d3');


var OrganismRuleConstants = {
    beetle: {
        prey: ["songbird", "mouse"], predator: ["grass", "flower", "tree"],
        DIE_NO_FOOD: 6000,
        DIE_POISON: 3000,
        REPRODUCE_RULE: {offspring: 4, elapse: 12000},
        color: "#000000"
    },
    grass: {
        prey: ["beetle", "rabbit", "deer", "songbird", "mouse"], predator: [],
        DIE_NO_FOOD: 6000,
        DIE_POISON: 2000,
        REPRODUCE_RULE: {offspring: 1, elapse: 12000}, // reproduce 2 per 12 ms
        PREDATOR_BUMP: 1,
        color: "#000000"
    },
    flower: {
        prey: ["butterfly", "rabbit", "deer"], predator: ["beetle"],
        DIE_NO_FOOD: 6000,
        DIE_POISON: 2000,
        REPRODUCE_RULE: {offspring: 3, elapse: 12000}, // reproduce 2 per 12 ms
        PREDATOR_BUMP: 1,
        color: "#000000"
    },

    tree: {
        prey: ["beetle", "butterfly", "deer", "songbird", "mouse"], predator: [],
        DIE_NO_FOOD: 12000,
        DIE_POISON: 6000,
        REPRODUCE_RULE: {offspring: 1, elapse: 12000}, // reproduce 2 per 12 ms
        PREDATOR_BUMP: 3,
        strokeStyle: ("3, 3"),
        color: "#000000"
    },

    butterfly: {
        prey: ["songbird"], predator: ["flower", "tree"],
        DIE_NO_FOOD: 6000,
        REPRODUCE_RULE: {offspring: 4, elapse: 12000},
        color: "#000000"
    },

    rabbit: {
        prey: [], predator: ["grass", "flower","mushroom"],
        DIE_NO_FOOD: 12000,
        REPRODUCE_RULE: {offspring: 3, elapse: 12000},
        color: "#000000"
    },

    deer: {
        prey: [], predator: ["grass", "flower", "tree","mushroom"],
        DIE_NO_FOOD: 6000,
        REPRODUCE_RULE: {offspring: 2, elapse: 12000},
        color: "#000000"
    },

    mouse: {
        prey: [], predator: ["grass", "flower", "tree", "beetle","mushroom"],
        DIE_NO_FOOD: 6000,
        REPRODUCE_RULE: {offspring: 2, elapse: 12000},
        color: "#000000"
    },

    //hawk is a predator of rabbit,songbird and mouse
    hawk: {
        prey: [], predator: ["rabbit", "songbird", "mouse","frog"],
        DIE_NO_FOOD: 6000,
        REPRODUCE_RULE: {offspring: 1, elapse: 12000},
        color: "#000000"
    },

    snake: {
        prey: [], predator: ["songbird", "mouse"],
        DIE_NO_FOOD: 6000,
        REPRODUCE_RULE: {offspring: 2, elapse: 12000},
        color: "#000000"
    },
    raccoon: {
        prey: [], predator: ["tree", "mouse"],
        DIE_NO_FOOD: 6000,
        REPRODUCE_RULE: {offspring: 2, elapse: 12000},
        color: "#000000"
    },
    coyote: {
        prey: [], predator: ["rabbit", "deer", "mouse"],
        DIE_NO_FOOD: 6000,
        REPRODUCE_RULE: {offspring: 2, elapse: 12000},
        color: "#000000"
    },
    frog: {
        prey: [], predator: ["beetle", "butterfly","mushroom"],
        NO_PREY: 6000,
        DIE_NO_FOOD: 6000,
        REPRODUCE_RULE: {offspring: 2, elapse: 12000},
        strokeStyle: ("3, 3"),
        color: "#000000"
    },
    songbird: {
        prey: [], predator: ["grass", "tree", "beetle", "butterfly"],
        DIE_NO_FOOD: 6000,
        REPRODUCE_RULE: {offspring: 2, elapse: 12000},
        color: "#000000"
    },

    // earthworm and mushroom has different set of rules
    earthworm: {
        color: "#000000",
        DIE_NO_FOOD: 6000,
        REPRODUCE_RULE: {offspring: 1, elapse: 12000}

    },

    mushroom: {
       prey: ["beetle", "rabbit", "deer", "songbird", "mouse"], predator: [],
        color: "#000000",
        prey:["rabbit","mouse","deer"],
        DIE_NO_FOOD: 6000,
        REPRODUCE_RULE: {offspring: 0, elapse: 12000},
        growsByRain: true
    }

};


module.exports = OrganismRuleConstants;
