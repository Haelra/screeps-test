/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.Harvester');
 * mod.thing == 'a thing'; // true
 */

//harvestet speichert energie, baut, upgraded. also alles für anfang wichtig.
var roleHarvester = {
/*TODO: Umbauen, wenn es einen Collector gibt, dann zu ihm fahren anstatt zu harvesten?
*/

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy == 0){
            creep.memory.building = false;
            creep.memory.upgrading = false;
        }
        if(creep.carry.energy < creep.carryCapacity && !creep.memory.building && !creep.memory.upgrading) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            var targetsCons = creep.room.find(FIND_CONSTRUCTION_SITES);
            
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    //Problem: wenn er ein Target voll hat und noch energie, dann geht er harvesten.
                    
                }
                else {
                    
                    //wenn alles voll, dann was anderes machen.
                    //problem wenn zu wenige harvester, werden diese nachgebaut...
                    //console.log("harvester arbeitslos, switch to builder");
                }
            }
            //heißt spawner, tower und extensions voll, dann bauen.
            if(targets.length == 0){
                
                    if(creep.memory.building && creep.carry.energy == 0) {
                    creep.memory.building = false;
                    creep.say('🔄 harvest');
                    }
                    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
                        creep.memory.building = true;
                        creep.say('🚧 build');
                    }
                    if(creep.memory.building) { //building
                        targetsCons = creep.room.find(FIND_CONSTRUCTION_SITES);
                        if(targetsCons.length) {
                            if(creep.build(targetsCons[0]) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(targetsCons[0], {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }
                    }
            }
            if(targets.length == 0 && targetsCons.length == 0){
                // so some upgrading?    
                if(creep.memory.upgrading && creep.carry.energy == 0) {
                    creep.memory.upgrading = false;
                    creep.say('🔄 harvest');
                }
                if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
                    creep.memory.upgrading = true;
                    creep.say('⚡ upgrade');
                }

                if(creep.memory.upgrading) {
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            
            
            }
        }
    }
};

module.exports = roleHarvester;