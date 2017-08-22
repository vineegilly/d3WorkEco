
var inherit = axon.inherit;
var PropertySet = axon.PropertySet;
var EcoSystemConstants = require('../EcoSystemConstants');
var Vector2 = dot.Vector2;
var OrganismImageCollection = require('../organisms/OrganismImageCollection');
var OrganismRuleConstants = require('../OrganismRuleConstants');


//states
var ReturnToOriginState = require('../states/ReturnToOriginState');
var OrganismRestingState = require('../states/OrganismRestingState');
var RandomMovementState = require('../states/RandomMovementState');
var SupportReproducingState = require('../states/SupportReproducingState');
var ReproducingState = require('../states/ReproducingState');
var PredatingState = require('../states/PredatingState');
var DyingState = require('../states/DyingState');


var returnToOriginStateInstance = new ReturnToOriginState();
var organismRestingStateInstance = new OrganismRestingState();
var randomMovementState = new RandomMovementState();
var predatingState = new PredatingState();
var dyingState = new DyingState();
var reproducingState = new ReproducingState();
var supportReproducingState = new SupportReproducingState();

var OBJECT_ID_COUNTER = 100;
/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} motionBounds
 * @constructor
 */
function BaseOrganismModel(ecoSystemModel, organismInfo, initialPosition, motionBounds, createdThroughInteraction) {
    var thisModel = this;
    PropertySet.call(thisModel, {
        userControlled: false,
        position: initialPosition.copy(),
        interactionState: EcoSystemConstants.NON_INTERACTION_STATE,
        dead: false,
        scale: 1,
        opacity: 1
    });

    thisModel.objectId = OBJECT_ID_COUNTER++;
    thisModel.name = organismInfo.name;
    thisModel.organismInfo = organismInfo;
    thisModel.appearanceImage = OrganismImageCollection.getRepresentation(thisModel.name);
    thisModel.ecoSystemModel = ecoSystemModel;
    thisModel.organismState = organismRestingStateInstance;
    thisModel.velocity = EcoSystemConstants.ANIMATION_VELOCITY;

    // some models gets created through interaction
    thisModel.createdThroughInteraction = createdThroughInteraction;

    thisModel.organismBeingEaten = null;
    thisModel.organismReproducingWith = null;
    thisModel.newlyProducedModels = [];
    this.motionBounds = motionBounds;
    this.multipliedOrganisms = [this];// add the current one

    this.defineTimeLapseRules();

    // to differentiate natural and death by predator
    this.causeOfDying = -1;

    //temp
    this.elapsedTime = 0;

}


inherit(PropertySet, BaseOrganismModel, {

    step: function (dt) {
        if (!this.userControlled) {
            this.doStep(dt);
        }

        if (this.ecoSystemModel.isPlaying()) {
            this.playStep(dt);
        }

    },

    defineTimeLapseRules: function () {
        this.timeElapsedWithoutFood = 0;
        this.timeElapsedSinceReproduction = OrganismRuleConstants[this.name].REPRODUCE_RULE.elapse; // start with the ability to reproduce

    },

    onRain: function () {

    },

    onPoisonSpray: function () {

    },


    playStep: function (dt) {
        this.incrementTimeElapsedWithoutFood(dt);
        this.incrementTimeElapsedSinceReproduction(dt);
        this.stepState(dt);
        this.validateExpiryState(dt);
    },

    playReset: function () {

    },

    isSprayApplicable: function () {
        return false;
    },

    incrementTimeElapsedWithoutFood: function (dt) {

        if(this.canGerminate()){
            return; // the rain rules will increment the lapse
        }
        this.timeElapsedWithoutFood += dt * 1000; // in milliseconds
    },

    incrementTimeElapsedSinceReproduction: function (dt) {
        this.timeElapsedSinceReproduction += dt * 1000;
    },


    validateExpiryState: function (dt) {

      if (this.interactionState == EcoSystemConstants.DYING_STATE) {

            return;
        }
        if (this.timeElapsedWithoutFood >= this.getTimeThresholdWithoutFood()) {
            this.moveToDyingStateBecauseOfNoFood();
        }
    },

    moveToDyingStateBecauseOfNoFood: function () {
        this.causeOfDying = EcoSystemConstants.DIE_BECAUSE_OF_NO_FOOD;
        this.startDying();
    },

    getTimeThresholdWithoutFood: function () {
        return OrganismRuleConstants[this.name].DIE_NO_FOOD;
    },

    /**
     *
     * @param {number} dt
     */
    stepState: function (dt) {
        this.organismState.step(this, dt);
    },

    setState: function (newState) {
        this.organismState.exit(this);// exist the previus state
        this.organismState = newState;
        this.organismState.entered(this); // enter the new state
    },

    returnToOriginState: function () {
        this.setState(returnToOriginStateInstance);
    },

    goToRest: function () {
        this.setState(organismRestingStateInstance);
    },

    startRandomMotion: function () {
        this.setState(randomMovementState);
    },

    startPredating: function (preyBeingEaten) {
        this.setState(predatingState);
        this.organismBeingEaten = preyBeingEaten;
        var preyPosition = preyBeingEaten.position;
        this.setDestination(preyPosition, true, EcoSystemConstants.ANIMATION_VELOCITY / 2);
        this.interactionState = EcoSystemConstants.EATING_STATE;
        this.timeElapsedWithoutFood = 0;
    },

    startDying: function () {
        this.setState(dyingState);
        this.ecoSystemModel.addDyingOrganisms(this);
        this.interactionState = EcoSystemConstants.DYING_STATE;

    },

    startReproducing: function (otherOrganism) {
        //store the partner
        this.organismReproducingWith = otherOrganism;
        var otherPartnerPos = otherOrganism.position;
        this.setDestination(otherPartnerPos, true, EcoSystemConstants.ANIMATION_VELOCITY / 2);
        this.interactionState = EcoSystemConstants.REPRODUCING_STATE;

        //set the current state
        this.setState(reproducingState);
        otherOrganism.supportReproducing();
        this.timeElapsedSinceReproduction = 0;
    },

    supportReproducing: function () {
        this.interactionState = EcoSystemConstants.REPRODUCING_STATE;
        this.timeElapsedSinceReproduction = 0;
        //set the current to support reproducing
        this.setState(supportReproducingState);
    },

    doStep: function (dt) {

    },

    /**
     * called when population Range slider is invoked
     */
    multiply: function (newRange) {


        // only original elements can be multiplied
        if (this.createdThroughInteraction) {
            return;
        }

        if (this.multipliedOrganisms.length === newRange) {
            return;
        }

        if (this.multipliedOrganisms.length > newRange) {
            for (var i = newRange; i < this.multipliedOrganisms.length; i++) {
                var organism = this.multipliedOrganisms[i];
                this.ecoSystemModel.removeOrganism(organism);
            }

            this.multipliedOrganisms.splice(newRange);
        }

        else {
            var newOrganisms = [];

            for (var j = this.multipliedOrganisms.length; j < newRange; j++) {
                var randomPosX = _.random(this.motionBounds.minX, this.motionBounds.maxX);
                var randomPosY = _.random(this.motionBounds.minY, this.motionBounds.maxY);
                var newPos = this.motionBounds.closestPointTo(new Vector2(randomPosX, randomPosY));
                var newMultipliedOrganism = this.ecoSystemModel.cloneOrganism(this, newPos, EcoSystemConstants.NON_INTERACTION_STATE, true);
                newOrganisms.push(newMultipliedOrganism);
            }

            this.multipliedOrganisms = this.multipliedOrganisms.concat(newOrganisms);
        }
    },

    canReproduce: function () {
        var minThresholdTime = OrganismRuleConstants[this.name].REPRODUCE_RULE.elapse;
        // if it passes the min time allow to reproduce
        if (this.timeElapsedSinceReproduction >= minThresholdTime) {
            return true;
        }

        return false;
    },

    /**
     * As of now, no restriction on predator rule
     * @returns {boolean}
     */
    canPredate: function () {
        return true;
    },


    /**
     * Organisms like Grass,Flower,Tree override this class because they dont move
     */
    initState: function () {
        this.setState(randomMovementState);
    },

    /**
     *
     * @returns {Vector2}
     */
    getPosition: function () {
        return this.position;
    },

    moveRandomly: function () {
        throw new Error("moveRandomly must be implemented in  BaseOrganismModel's descendant class");
    },


    clone: function (initialPos) {
        throw new Error("clone must be implemented in  BaseOrganismModel's descendant class");
    },

    canGerminate: function () {
        return false;
    },


    /**
     *
     * @param {Vector2} position
     */
    setPosition: function (position) {
        this.position = position;
    },

    /**
     * Return the shape to the place where it was originally created.
     * @param {boolean} animate
     * @param {number} velocity
     */
    returnToOrigin: function (animate, velocity) {
        this.velocity = velocity || EcoSystemConstants.ANIMATION_VELOCITY;
        this.setDestination(this.positionProperty.initialValue, animate);

    },

    /**
     * @param {Vector2} destination
     * @param {boolean} animate
     * @param {number} velocity
     */
    setDestination: function (destination, animate, velocity) {
        this.destination = destination;
        this.velocity = velocity || EcoSystemConstants.ANIMATION_VELOCITY;
        if (animate) {
            this.animating = true;
        }
        else {
            this.position = destination;
        }
    },

    /**
     *
     * @param pt
     */
    snapToGrid: function (point) {
        var snapedPt = new Vector2();

        var scaledPadding = 3.2;// TODO? why
        var gridGap = EcoSystemConstants.ORGANISM_RADIUS * 2 + scaledPadding;
        var middleOfGap = gridGap / 2;

        //find the cell where to place the organism
        var cellX = (point.x / gridGap) | 0;
        var cellY = (point.y / gridGap) | 0;

        if ((point.x % gridGap) > middleOfGap) {
            cellX = cellX + 1;
        }

        if ((point.y % gridGap) > middleOfGap) {
            cellY = cellY + 1;
        }

        snapedPt.x = (cellX * gridGap);
        snapedPt.y = (cellY * gridGap );

        return snapedPt;
    },

    nextRandomMovement: function () {
        var direction = _.random(1, 4);
        var playVelocity = EcoSystemConstants.ANIMATION_VELOCITY / 10;
        var currentPosition = this.position;
        var containsPoint = this.motionBounds.containsPoint(currentPosition);
        var nextDistance = EcoSystemConstants.PLAY_STEP_DISTANCE - 10;

        var newPosition = null;
        var animatePlay = true;
        switch (direction) {
            case 1:
                newPosition = currentPosition.plus(new Vector2(nextDistance, 0));
                break;
            case 2:
                newPosition = currentPosition.plus(new Vector2(-nextDistance, 0));
                break;
            case 3:
                newPosition = currentPosition.plus(new Vector2(0, nextDistance));
                break;
            case 4:
                newPosition = currentPosition.plus(new Vector2(0, -nextDistance));
                break;
        }

        newPosition = this.snapToGrid(newPosition);
        newPosition = this.motionBounds.closestPointTo(newPosition);
        this.setDestination(newPosition, animatePlay, playVelocity);

    },

    play: function () {
        this.position = this.snapToGrid(this.position);
        this.setState(randomMovementState);
    },

    pause: function () {
        this.goToRest();
    },


    canInteract: function () {
        if (this.interactionState === EcoSystemConstants.NON_INTERACTION_STATE) {
            return true;
        }
        if (this.interactionState === EcoSystemConstants.BEING_PRODUCED_STATE) {
            return true;
        }

        return false;
    },

    isDead: function () {
        return this.dead;
    },

    /**
     * check if this organism is a prey with respect to the given predator (also checks for producer/consumer)
     * @returns {*}
     */
    isPrey: function (withRespectToPredator) {
        var preyPredatorRule = OrganismRuleConstants[withRespectToPredator.name];
        if (preyPredatorRule) {
            var predatorOfList = preyPredatorRule["predator"];
            if (predatorOfList) {
                return _.contains(predatorOfList, this.name); // is predator of this.name?
            }
        }
        return false;
    },

    /**
     * Checks if this object is a predator with respect to a given prey
     *
     * @param withRespectToPrey
     * @returns {boolean}
     */
    isPredator: function (withRespectToPrey) {
        var preyPredatorRule = OrganismRuleConstants[withRespectToPrey.name];
        if (preyPredatorRule) {
            var preyOf = preyPredatorRule["prey"];
            if (preyOf) {
                return _.contains(preyOf, this.name);
            }
        }
        return false;
    },

    isEating: function () {
        return this.interactionState === EcoSystemConstants.EATING_STATE;
    },


    die: function () {
        this.ecoSystemModel.removeDyingOrganisms(this);
        this.ecoSystemModel.removeOrganism(this);
        this.dead = true;
    },

    finishEating: function () {
        this.interactionState = EcoSystemConstants.NON_INTERACTION_STATE;
        this.setState(randomMovementState);

    },

    overlapBounds: function (otherModel) {
        var r1 = EcoSystemConstants.ORGANISM_RADIUS;
        var r2 = EcoSystemConstants.ORGANISM_RADIUS;

        var tolerance = 5;

        var c1 = this.position;
        var c2 = otherModel.position;

        // Determine minimum and maximum radii where circles can intersect
        var r_max = r1 + r2;
        var r_min = Math.abs(r1 - r2);

        // Determine actual distance between circle circles
        var c_dist = c1.distance(c2);

        c_dist += tolerance;

        if (c_dist > r_max) {
            return false;
        }

        return true;
    },

    reproduceWith: function (otherModel) {
        var thisPos = this.position;
        var otherPos = otherModel.position;
        var midPoint = thisPos.average(otherPos);
        var createdThroughInteraction = true;

        var noOfOffSpringToProduce = OrganismRuleConstants[this.name].REPRODUCE_RULE.offspring;
        for (var i = 0; i < noOfOffSpringToProduce; i++) {
            var newlyProducedModel = this.ecoSystemModel.cloneOrganism(this, midPoint, EcoSystemConstants.BEING_PRODUCED_STATE, createdThroughInteraction);
            newlyProducedModel.timeElapsedSinceReproduction = 0;
            this.ecoSystemModel.addNewlyReproducedOrganism(newlyProducedModel);
            this.newlyProducedModels.push(newlyProducedModel);
        }

    },


    /**
     * some dying organisms produce new organism
     * @param organismToProduce
     */
    produceNewOrganism:function(organismToProduce){
        var currentPosition = this.position;
        var createdThroughInteraction = true;
        var newlyProducedModel = this.ecoSystemModel.cloneOrganism(organismToProduce, currentPosition, EcoSystemConstants.BEING_PRODUCED_STATE, createdThroughInteraction);
        newlyProducedModel.timeElapsedSinceReproduction = 0;
      //  this.ecoSystemModel.addNewlyReproducedOrganism(newlyProducedModel);
        this.newlyProducedModels.push(newlyProducedModel);

    },

    /**
     * True only for non-animate beings like mushroom, grass etc
     */
    germinate: function () {

    },

    finishReproducing: function () {
        this.interactionState = EcoSystemConstants.NON_INTERACTION_STATE;
        this.setState(randomMovementState);

        for (var i = 0; i < this.newlyProducedModels.length; i++) {
            var newlyProducedModel = this.newlyProducedModels[i];
            newlyProducedModel.interactionState = EcoSystemConstants.NON_INTERACTION_STATE;
            newlyProducedModel.play();
        }

        if (this.newlyProducedModels.length) {
            this.newlyProducedModels = [];
        }
    },

    isInAnimate: function () {
        return false;
    }

});

module.exports = BaseOrganismModel;
