/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawner');
 * mod.thing == 'a thing'; // true
 */

//TODO: minimum festelegen und dynamisch aufgaben wechseln, wenn nix zu bauen, keine Builder, wenn spawn voll + extensions + tower keine harvester
//TODO: groesere creeps spawnen mit max energie/3 und nur wenn max energie vorhanden.
//TODO: harvester transportieren nicht mehr und Transporter erstellen.

/*bodyparts:
move = 50
work = 100
carry = 50
Attack = 80
Ranged_attack = 150
Heal = 250
Claim = 600
Tough = 10

tier 1 creeps:
    dürfen max 300 Energie kosten, da dies der Spawn hat.
        Harvester für den ganz Anfang
            MOVE,MOVE,WORK,CARRY,CARRY = 300
        Collector = MOVE,WORK,WORK,CARRY = 300
        Carrier = MOVE,MOVE,MOVE,CARRY,CARRY,CARRY = 300
        builder = MOVE,WORK,WORK,CARRY = 300
        upgrader = MOVE,WORK,WORK,CARRY = 300
Tier 2 Creeps:
    bei controller level 1 sind maximal 5 extension knoten möglich, die je 50 Energie geben.
    somit 550 max energie
    Harvester = nicht mehr nötig.
    Collector = MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY = 550
    Carrier = MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, = 550
    builder = MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY = 550
    upgrader = MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY = 550

*/

//spawnt Einheiten
//controller level 1 kann ich 550 Energie max haben. somit typ big spawnen.

var maxHarvester = 1
var maxUpgrader = 1
var maxBuilder = 1
var maxMelee = 0
var maxCollector = 2
var maxCarrier = 3


var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMelee = require('role.melee');
var roleCollector = require('role.collector');
var roleCarrier = require('role.carrier');

var spawner = {
  run: function() {
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader')
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var melee = _.filter(Game.creeps, (creep) => creep.memory.role == 'melee');
    var collector = _.filter(Game.creeps, (creep) => creep.memory.role == 'collector');
    var carrier = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');


    /*  TIER 1   */
    if (Game.spawns['Spawn1'].room.energyAvailable >= 300 && Game.spawns['Spawn1'].room.energyCapacityAvailable < 500) {

      if (harvesters.length < maxHarvester) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, WORK, CARRY, CARRY], newName, {
          memory: {
            role: 'harvester'
          }
        });
      } else if (collector.length < maxCollector) { //notfall harvester
        var newName = 'Collector' + Game.time;
        console.log('Spawning new Collector: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([MOVE, WORK, WORK, CARRY], newName, {
          memory: {
            role: 'collector'
          }
        });
      } else if (upgrader.length < maxUpgrader) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([MOVE, WORK, WORK, CARRY], newName, {
          memory: {
            role: 'upgrader'
          }
        });
      } else if (builder.length < maxBuilder) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {
          memory: {
            role: 'builder'
          }
        });
      } else if (melee.length < maxMelee) {
        var newName = 'Melee' + Game.time;
        console.log('Spawning new melee: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK], newName, {
          memory: {
            role: 'melee'
          }
        });
      } else if (carrier.length < maxCarrier) {
        var newName = 'Carrier' + Game.time;
        console.log('Spawning new carrier: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,CARRY,CARRY,CARRY], newName, {
          memory: {
            role: 'carrier'
          }
        });
      }
    }

    /* TIER 2
    Collector = MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY = 550
    Carrier = MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, = 550
    builder = MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY = 550
    upgrader = MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY = 550
    */
    if (Game.spawns['Spawn1'].room.energyAvailable >= 550) {
      //Tier 2 einheiten:
      if (harvesters.length < maxHarvester) {
        var newName = 'BigHarvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, {
          memory: {
            role: 'harvester',
            style: 'big'
          }
        });
      } else if (collector.length < maxCollector) {
        var newName = 'BigCollector' + Game.time;
        console.log('Spawning new collector: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY], newName, {
          memory: {
            role: 'collector',
            style: 'big'
          }
        });
      } else if (carrier.length < maxCarrier) {
        var newName = 'BigCarrier' + Game.time;
        console.log('Spawning new carrier: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], newName, {
          memory: {
            role: 'carrier',
            style: 'big'
          }
        });
      } else if (builder.length < maxBuilder) {
        var newName = 'BigBuilder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY], newName, {
          memory: {
            role: 'builder',
            style: 'big'
          }
        });
      } else if (upgrader.length < maxUpgrader) {
        var newName = 'BigUpgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY], newName, {
          memory: {
            role: 'upgrader',
            style: 'big'
          }
        });
      }
    }
  }
}

module.exports = spawner;
