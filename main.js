var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleCollector = require('role.collector');
var roleCarrier = require('role.carrier');
var roleMelee = require('role.melee');
var spawner = require('spawner');
var construction = require('construction');

//Test comment githup push. 09.02.2022
//test commit
//TODOs nach Priorität:
//renew creep bauen
  //  in Methode einbauen, wenn lifetime unter 300, dann ab zum spwawn
  //  Methode die creeps in range 1? vom spawn versucht zu erneuern, wenn unter 600
// done - Carrier schreiben
//Methode erstellen, die mir die Energiequellen und die Anzahl der freien Plätze pro energiequelle anzeigt (und evtl. Gefährdung). Damit ich weiß wie viele collectoren ich im Raum haben kann.
//done - nur noch einen harvester.
// done -  need energy schon setzen, wenn 1/3 noch drin.

//TODO: renew creeps einführen.
//position des Spawns: Game.spawns['Spawn1'].pos

/*
ideen fuer optimierung
collector der nur harvested und stehen bleibt.
    wie collecotren auf karte verteilen?
    einen collector pro Ressource einplanen.
carrier der von harvester holt. wie machen?
carrier sucht nach allen creeps die typ harvesting sind und voll sind.
    carrier kümmert sich um Energie auffüllen von spawn, extensions, tuerme,
        beliefert upgrader / builder
        dadurch braucht er kein work und nur move und carry
Upgrader_only der nur sich hinstellt und upgraded und auf ressourcen wartet durch carrier.
Builder_only der nur sich hinstellt und upgraded und auf ressourcen wartet durch carrier.
für start dann nur einen Harvester und dann collector, dann carrier, dann upgrader, dann builder
    wenn builder da erstes gebäude aufbauen, sofern controller level 2
*/
//Container einführen:
//  in construction etc...
// https://wiki.screepspl.us/index.php/Static_Harvesting
// in builder um von dort Energie zu holen.

module.exports.loop = function() {

  for (var i in Memory.creeps) {
    if (!Game.creeps[i]) {
      delete Memory.creeps[i];
    }
  }
  //spawn und constructor nicht im gleichen tick durchlaufen.
  if (Game.time % 10 == 0) {
    spawner.run();
  }
  if (Game.time % 9 == 0) {
    construction.run();
  }

  //kill old to small harvesters
  if (Game.time % 33 == 0) {
    console.log("E avail: ", Game.spawns['Spawn1'].room.energyAvailable, "E-total: ", Game.spawns['Spawn1'].room.energyCapacityAvailable);
    if (Game.spawns['Spawn1'].room.energyAvailable >= 500) {
      for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester' && creep.memory.style != 'big') {
          creep.suicide();
          console.log("killed a harvester");
        }
      }
    }
  }

  //Game.spawns['Spawn1'].room.controller

  //wenn im spawn prozess, anzeigen:
  if (Game.spawns['Spawn1'].spawning) {
    var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text(
      '🛠️' + spawningCreep.memory.role,
      Game.spawns['Spawn1'].pos.x + 1,
      Game.spawns['Spawn1'].pos.y, {
        align: 'left',
        opacity: 0.8
      });
  }

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    //TODO: if creep time to live <200 gehe zu spawn und lass verlängern.
    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
    if (creep.memory.role == 'collector') {
      roleCollector.run(creep);
    }
    if (creep.memory.role == 'carrier') {
      roleCarrier.run(creep);
    }

  }
}
