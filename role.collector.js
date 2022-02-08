/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.collect');
 * mod.thing == 'a thing'; // true
 */

//sammelt ressourcen um an Einheiten zu transferieren vom typ carrier.
var roleCollector = {
    /* TODO: droppen, wenn voll.
        wenn nicht voll schauen ob was auf dem Boden/einem Container liegt und aufheben.

    */
    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        // schon bei halbvoll sagen, er ist voll, damit carrier schon da sind, wenn er voll läuft, sofern Mangel ist.
        if(creep.carry.energy *2 > creep.carryCapacity) {
            creep.memory.full = true;
        } else {
          creep.memory.full = false;
        }
        if(creep.carry.energy > 0){
            var creeps_near = creep.pos.findClosestByRange(_.filter(Game.creeps, (creep) => creep.memory.role != 'collector'));
            creep.transfer(creeps_near, RESOURCE_ENERGY);
        }
    }
};

module.exports = roleCollector;
