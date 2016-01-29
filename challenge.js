'use strict';
window.onload = function () {
    var command =
        '5 3 \n 1 1 e\n rfrfrfrf\n 3 2 N \n frrffllffrrfll\n 0 3 w\n LLFFFLFLFL';
    // this function parses the input string so that we have useful names/parameters
    // to define the playfield and the robots for subsequent steps
    var parseInput = function (input) {
        // task #1
        // replace the 'parsed' var below to be the string 'command' parsed into an object we can pass to genworld();
        // genworld expects an input object in the form { 'bounds': [3, 8], 'robos': [{x: 2, y: 1, o: 'W', command: 'rlrlff'}]}
        // where bounds represents the top right corner of the plane and each robos object represents the
        // x,y coordinates of a robot and o is a string representing their orientation. a sample object is provided below
        // var parsed = {
        //     bounds: [20, 20],
        //     robos: [{
        //         x: 2,
        //         y: 1,
        //         o: 'W',
        //         command: 'rlrlrff'
        //     }, {
        //         x: 12,
        //         y: 10,
        //         o: 'E',
        //         command: 'fffffffffff'
        //     }, {
        //         x: 18,
        //         y: 8,
        //         o: 'N',
        //         command: 'frlrlrlr'
        //     }]
        // };

        /****** Jon's Code Start *****/
        var parsed = {};

        // makes string in to numbers
        function stringToNumber(s) {
            return s.split(' ').map(function(e) {
                return Number(e);
            });
        }

        // formats bounds data
        parsed.bounds = command.split('\n').filter(function(e,i) {
            if (i === 0) return e;
        }).map(function(line, i) {
            line = line.trim();
            return stringToNumber(line);
        }).reduce(function(obj, line) {
            return obj;
        });

        // foramts robos data
        function formattedRobos() {
            function buildRobosObj(l) {
                var parts = l.split(' ');
                return {
                    x: Number(parts[0]),
                    y: Number(parts[1]),
                    o: parts[2].toUpperCase(),
                    command: parts[3].toLowerCase()
                };
            }

            var rawRobos = command.split('\n').filter(function(e,i) {
                if (i > 0) return e;
            }).map(function(line, i, a) {
                if (i % 2 === 0) {
                     line = line.trim()+' '+a[i+1].trim();
                     return line;
                }
                return null;
            });

            var editedRobos = rawRobos.filter(function(e) {
                if (e != null) return e.trim();
            }).map(function(e) {
                return buildRobosObj(e);
            });

            // add obj to global to get bounds in tickRobos function
            window.parsed = parsed;

            return editedRobos;
        }

        parsed.robos = formattedRobos();

        return parsed;
        /****** Jon's Code End *****/
    };
    // this function replaces teh robos after they complete one instruction
    // from their commandset
    var tickRobos = function (robos) {
        // task #2
        // in this function, write business logic to move robots around the playfield
        // the 'robos' input is an array of objects; each object has 4 parameters.
        // This function needs to edit each robot in the array so that its x/y coordinates
        // and orientation parameters match the robot state after 1 command has been completed.
        // Also, you need to remove the command the robot just completed from the command list.
        // example input:
        // robos[0] = {x: 2, y: 2, o: 'N', command: 'frlrlrl'}
        //                   |- becomes -|
        // robos[0] = {x: 2, y: 1, o: 'N', command: 'rlrlrl'}
        // if a robot leaves the bounds of the playfield, it should be removed from the robos
        // array. It should leave a 'scent' in it's place. If another robot–for the duration
        // of its commandset–encounters this 'scent', it should refuse any commands that would
        // cause it to leave the playfield.

        // !== write robot logic here ==!

        // X = left/right
        // Y = up/down

        //console.log(parsed.bounds[0]);
        var maxX = parsed.bounds[0],
            maxY = parsed.bounds[1],
            scent = [
                // [100,1],
                // [100,100],
                // [0,100],
                // [3,2]
            ],
            direction = ['N', 'E', 'S', 'W'];

        // update orientation
        function updateOrientation(command, curOrient, x, y) {

            // moving forward
            if (command[0] === 'f') {
                // going forward
                // check orientation, move + 1 that way

                console.log(maxX);
                console.log(maxY);

                console.log(x);
                console.log(y);

                //return updated info
                return {
                    x: x,
                    y: y,
                    o: newOrientation,
                    command: command.substr(1)
                };
            }

            // if moving right or left
            if (command[0] === 'r' || command[0] === 'l') {
                if (command[0] === 'r') var move = +1;
                if (command[0] === 'l') var move = -1;

                // update orientation direction
                function getNewOrientation(move, curOrient) {
                    var dirVal = direction.indexOf(curOrient) + (move);

                    // adjust for facing north
                    if (dirVal === 4) dirVal = 0;
                    // adjust for facing west
                    if (dirVal === -1) dirVal = 3;

                    return direction[dirVal];
                };

                var newOrientation = getNewOrientation(move, curOrient);

                //return updated info
                return {
                    x: x,
                    y: y,
                    o: newOrientation,
                    command: command.substr(1)
                };
            }
        }

        // adds position to scent array
        function leaveScent() {

        }

        // checks the scent
        function checkScent(x,y) {
            var isTrue = scent.find(function(elem) {
                if (elem.toString() === [x,y].toString()) return true;
                return null;
            });

            if (isTrue) return false;
            return true;
        }

        function oneMove(e) {
            // check scent = DONE

            // get first command
            // update orientation or move
            // check if off the grid, is so, update secent array
            // return obj

            var okToMove = checkScent(e.x, e.y);

            if (okToMove) {
                // get command
                // adjust orientation
                // get new cords

                if (e.command[0]) {
                    //console.log(e);
                    e = updateOrientation(e.command, e.o, e.x, e.y);
                    //console.log(e);
                    // return all updated arguments
                } else {
                    console.log('DONE');
                }
                //console.log(e.command[110]);
            } else {
                // check the direction this is going, if off the grid remove 1st command
                return e;
            }
            //console.log(e);
            return e;
        }

        robos = robos.map(function(robo) {
            // returns udpate obj
            //console.log(robo);
            return oneMove(robo);
        });

        console.log(robos);

        //leave the below line in place
        placeRobos(robos);
    };
    // mission summary function
    var missionSummary = function (robos) {
        // task #3
        // summarize the mission and inject the results into the DOM elements referenced in readme.md
    };
    // ~~~~~~!!!! please do not edit any code below this comment !!!!!!~~~~~~~;
    var canvas = document.getElementById('playfield')
        .getContext('2d'),
        width = document.getElementById('playfield')
        .width * 2,
        height = document.getElementById('playfield')
        .height * 2,
        fontSize = 18,
        gridText = [],
        gameWorld = [],
        gridText = [],
        gameWorld = [];
    canvas.font = 'bold ' + fontSize + 'px monospace';
    canvas.fillStyle = 'black';
    canvas.textAlign = 'center';
    var genworld = function (parsedCommand) {
        //build init world array
        gameWorld = [];
        var bounds = parsedCommand.bounds,
            robos = parsedCommand.robos;
        var row = [];
        for (var i = 0; i < bounds[0]; i++) {
            row.push('.');
        }
        for (var i = 0; i < bounds[1]; i++) {
            var test = [].concat(row);
            gameWorld.push(test);
        }
        placeRobos(parsedCommand.robos);
        render(gameWorld, parsedCommand.robos);
        tickRobos(robos);
        window.setTimeout(function () {
            genworld(parsedCommand);
        }, 10000000000000);
    };
    var placeRobos = function (robos) {
        for (var i in robos) {
            var robo = robos[i];
            var activeRow = gameWorld[robo.y];
            if (activeRow) {
                activeRow[robo.x] = robo.o;
            }
        }
    };
    //render block
    var render = function (gameWorld, robos) {
        canvas.clearRect(0, 0, width, height);
        for (var i = 0; i < gameWorld.length; i++) {
            var blob = gameWorld[i].join('');
            canvas.fillText(blob, 250, i * fontSize + fontSize);
        }
    };
    // wireup init functions for display
    genworld(parseInput(command));
};
