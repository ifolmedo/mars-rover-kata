function createRover (startingPosition, facingDirection, grid) {
  var rover = {};
  var position =  startingPosition;

  rover.position = function() {
    return position;
  };

  rover.move = function(commands) {
    var conf = {
      'f': moveForward,
      'b': moveBackward
    };
    var parser = createCommandParser(conf);
    parser.parse(commands);
    return;

    function moveForward() {
      moveByDirection(1);
    }
    function moveBackward() {
      moveByDirection(-1);
    }

    function moveByDirection(sense) {
      var movements = {
        'N': function() {
          return {x: position.x, y: position.y + sense};
        },
        'S': function() {
          return {x: position.x, y: position.y - sense};
         },
        'E': function() {
          return {x: position.x + sense, y: position.y};
        },
        'W': function() {
          return {x: position.x - sense, y: position.y};
         }
      };
      position = movements[facingDirection]();
      position = grid.wrap(position);
    }
  }

  return rover;
}

function createGrid (width, height) {
  var grid  = {};

  grid.width = function() {return width;};
  grid.height = function() {return height;};

  grid.wrap = function (position) {
    if (position.x === width)
      return {x: 0, y: position.y};
    if (position.x < 0)
      return {x: width - 1, y: position.y};
    if (position.y === height)
      return {x: position.x, y: 0};
    if (position.y < 0)
      return {x: position.x, y: height - 1};
    return position;
  }

  return grid;
}

function createCommandParser (commandCallbacks) {
  var parser = {};

  parser.parse = function(commands) {
    var array = commands.split('');
    array.forEach(function(singleCommand) {
      commandCallbacks[singleCommand]();
    });
  };

  return parser;
}
