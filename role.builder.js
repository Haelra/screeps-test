/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.Builder');
 * mod.thing == 'a thing'; // true
 */

// Creep der nur baut, und sich Energie liefern lässt.
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(creep.memory.building == undefined){
            creep.memory.building = true;
        }
        if(targets.length) {
        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        // schon bei 1/3 Energie anfragen
        if(creep.carry.energy < creep.carryCapacity/3){
          creep.memory.need_Energy = true;
        }

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.memory.need_Energy = true;
            creep.say('🔄 need Energy');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.memory.need_Energy = false;
            creep.say('🚧 build');
        }
    }
};
module.exports = roleBuilder;
