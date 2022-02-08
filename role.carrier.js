var roleCarrier = {
    /** @param {Creep} creep **/
    run: function(creep) {
      /* Pseudocode
      wenn creep.carry.energy == 0
          tanken = true;
          finde nächsten vollen collector.
          gehe zu ihm.

      wenn creep.carry.energy == creep.carryCapacity
          tanken = false


      wenn creep.carry.energy > 0 && tanken == false
          finde nächsten creep mit need_Energy = true
          transferiere energie, wenn not in range gehe hin.

      //TODO: Strukturen die Energie brauchen beliefern, aus harvestern nehmen.


      bodyparts: nur move und carry.

      */
      if (creep.carry.energy == 0) {
        creep.memory.tanken = true;
      }
      if (creep.carry.energy == creep.carryCapacity) {
        creep.memory.tanken = false;
      }
      if (creep.memory.tanken == false && creep.carry.energy > 0) {
        //var targets = creep.room.find(FIND_MY_CREEPS).filter({memory: {need_Energy: true}}).value();
        // finde gebäude das Energie braucht, weil Gebäude vorher aufgefüllt werden müssen
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
              return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
          });
          //finde nächsten creep der Energie braucht.
          var creeps_needing = creep.room.find(FIND_MY_CREEPS, {
            filter: (creeps_needing) => {
              return (creeps_needing.memory.need_Energy == true);
            }
          });
          //console.log(creeps_needing[0]);

          if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(targets[0], {
                visualizePathStyle: {
                  stroke: '#ffffff'
                }
              });
            }
          } else if (creep.transfer(creeps_needing[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creeps_needing[0], {
              visualizePathStyle: {
                stroke: '#ffffff'
              }
            });
          }
        }
        if (creep.memory.tanken == true) {
          var collectors = creep.room.find(FIND_MY_CREEPS, {
            filter: (collectors) => {
              return (collectors.memory.full == true);
            }
          });


          //console.log(collectors[0]);
          if (collectors.length > 0) {
            creep.moveTo(collectors[0], {
              visualizePathStyle: {
                stroke: '#ffffff'
              }
            });
          }
        }

      }
    };
    module.exports = roleCarrier;
