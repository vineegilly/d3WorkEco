var inherit = axon.inherit;

/**
 *
 * @param name
 * @param time
 * @param count
 * @constructor
 */
function OrganismLifeLineSnapShot(name, time, count) {
    this.name = name;
    this.time = time;
    this.count = count;

}


inherit(Object, OrganismLifeLineSnapShot);


module.exports = OrganismLifeLineSnapShot;
