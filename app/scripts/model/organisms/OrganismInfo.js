var inherit = axon.inherit;

/**
 *
 * @param id
 * @param type
 * @param prey
 * @param predator
 * @param producer
 * @param decomposer
 * @constructor
 */
function OrganismInfo(jsonInfo) {
    this.id = jsonInfo.id;
    this.name = jsonInfo.name;
}

inherit(Object, OrganismInfo);


module.exports = OrganismInfo;