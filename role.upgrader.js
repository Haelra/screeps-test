/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can
 import it from another modules like this: * var mod = require('role.Upgrader');
 * mod.thing == 'a thing'; // true
 */

//upgraded room controller. braucht immer einen.
var roleUpgrader = {




  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.memory.upgrading == undefined) {
      creep.memory.upgrading = true;
    }

    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, {
        visualizePathStyle: {
          stroke: '#ffffff'
        }
      });
    }
    // schon bei 1/3 Energie anfragen
    if (creep.carry.energy < creep.carryCapacity / 3) {
      creep.memory.need_Energy = true;
    }
    if (creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
      creep.memory.need_Energy = true;
      creep.say('🔄need Energy');
    }
    if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.memory.need_Energy = false;
      creep.say('🚧upgrade');
    }
  }


  /*
      run: function(creep) {

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
          else {
              var sources = creep.room.find(FIND_SOURCES);
              if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
              }
          }
      }
      */
};

module.exports = roleUpgrader;
