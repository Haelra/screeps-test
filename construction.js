/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('construction');
 * mod.thing == 'a thing'; // true
 */


//plant gebäude

//Level1: Roads, 5 Containers, 1 Spawn
//Level2: Roads, 5 Containers, 1 Spawn, 5 Extensions (50 capacity), Ramparts (300K max hits), Walls

//baut extensions unterhalb des spawners. 
//TODO: farm fuer extensions suchen. mit game.check oder so, ob bebaubar. in der naehe der energy spots
var construction = {
    run: function() {
        if(Game.spawns['Spawn1'].room.controller.level == 1){
            
        } else if(Game.spawns['Spawn1'].room.controller.level ==2){
        var spawnX = Game.spawns['Spawn1'].pos.x
        var spawnY = Game.spawns['Spawn1'].pos.y
        var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        //extensions
        var extensions = _.filter(Game.structures, (s) => s.structureType == STRUCTURE_EXTENSION);
        var baustellenExtension = _.filter(Game.constructionSites, (s) => s.structureType == STRUCTURE_EXTENSION);
        var baustellenAll = _.filter(Game.constructionSites);
        if(baustellenAll.length ==0){
            //build something
            
            if(extensions.length < 10){
                var newPosY = spawnY +1 +extensions.length;
                var newPosX = spawnX +1 +extensions.length;
                console.log("trying to position a extension at ", newPosX, newPosY);
                console.log(Game.spawns['Spawn1'].room.createConstructionSite(newPosX, newPosY, STRUCTURE_EXTENSION));
            }
        }
    }
    }
}

module.exports = construction;