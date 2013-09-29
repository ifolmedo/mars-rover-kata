beforeEach(function() {
  this.addMatchers({
    toBePosition: function(expectedPosition) {
      var position = this.actual;
      return position.x === expectedPosition.x &&
             position.y === expectedPosition.y;
    }
  });
});

describe("Rover", function() {
  var grid;

  beforeEach(function() {
    grid = createGrid(10, 10);
  });
  it("should give starting position when not moved", function() {
    var startingPoint = {x: 0, y: 0};
    var facingDirection = "N";

    var rover = createRover(startingPoint, facingDirection, grid);

    expect(rover.position()).toBePosition(startingPoint);
  });

  it("should give another starting position when not moved an another starting position provided", function() {
    var startingPoint = {x: 1, y: 1};
    var facingDirection = "N";

    var rover = createRover(startingPoint, facingDirection, grid);

    expect(rover.position()).toBePosition(startingPoint);
  });

  it("should move to adjacent north space", function() {
    var startingPoint = {x: 0, y: 0};
    var facingDirection = "N";
    var rover = createRover(startingPoint, facingDirection, grid);

    rover.move("f");

    expect(rover.position()).toBePosition({x: 0, y: 1});
  });

  it("should move to adjacent east space", function() {
    var startingPoint = {x: 0, y: 0};
    var facingDirection = "E";
    var rover = createRover(startingPoint, facingDirection, grid);

    rover.move("f");

    expect(rover.position()).toBePosition({x: 1, y: 0});
  });

  it("should move to adjacent north space from another starting point", function() {
    var startingPoint = {x: 1, y: 1};
    var facingDirection = "N";
    var rover = createRover(startingPoint, facingDirection, grid);

    rover.move("f");

    expect(rover.position()).toBePosition({x: 1, y: 2});
  });

  it("should move two positions to the north", function() {
    var startingPoint = {x: 0, y: 0};
    var facingDirection = "N";
    var rover = createRover(startingPoint, facingDirection, grid);

    rover.move("ff");

    expect(rover.position()).toBePosition({x: 0, y: 2});
  });

  it("should move to adjacent west space", function() {
    var startingPoint = {x: 1, y: 1};
    var facingDirection = "W";
    var rover = createRover(startingPoint, facingDirection, grid);

    rover.move("f");

    expect(rover.position()).toBePosition({x: 0, y: 1});
  });

  it("should move to adjacent south space", function() {
    var startingPoint = {x: 1, y: 1};
    var facingDirection = "S";
    var rover = createRover(startingPoint, facingDirection, grid);

    rover.move("f");

    expect(rover.position()).toBePosition({x: 1, y: 0});
  });

  it("should move to adjacent north space backward", function() {
    var startingPoint = {x: 1, y: 1};
    var facingDirection = "S";
    var rover = createRover(startingPoint, facingDirection, grid);

    rover.move("b");

    expect(rover.position()).toBePosition({x: 1, y: 2});
  });

  it("should move to adjacent east space backward", function() {
    var startingPoint = {x: 1, y: 1};
    var facingDirection = "W";
    var rover = createRover(startingPoint, facingDirection, grid);

    rover.move("b");

    expect(rover.position()).toBePosition({x: 2, y: 1});
  });

  it("should move to adjacent west space backward", function() {
    var startingPoint = {x: 1, y: 1};
    var facingDirection = "E";
    var rover = createRover(startingPoint, facingDirection, grid);

    rover.move("b");

    expect(rover.position()).toBePosition({x: 0, y: 1});
  });

  it("should move to adjacent south space backward", function() {
    var startingPoint = {x: 1, y: 1};
    var facingDirection = "N";
    var rover = createRover(startingPoint, facingDirection, grid);

    rover.move("b");

    expect(rover.position()).toBePosition({x: 1, y: 0});
  });

  describe("rover wrapping", function() {
    var grid;

    beforeEach(function() {
      grid = createGrid(2,2);
    });
    it("should wrap when right edge reached in forward movement", function() {
      var startingPoint = {x: 1, y: 1};
      var facingDirection = "E";
      var rover = createRover(startingPoint, facingDirection, grid);

      rover.move("f");

      expect(rover.position()).toBePosition({x: 0, y: 1});
    });

    it("should wrap when left edge reached in forward movement", function() {
      var startingPoint = {x: 0, y: 0};
      var facingDirection = "W";
      var rover = createRover(startingPoint, facingDirection, grid);

      rover.move("f");

      expect(rover.position()).toBePosition({x: 1, y: 0});
    });

    it("should wrap when top edge reached in forward movement", function() {
      var startingPoint = {x: 1, y: 1};
      var facingDirection = "N";
      var rover = createRover(startingPoint, facingDirection, grid);

      rover.move("f");

      expect(rover.position()).toBePosition({x: 1, y: 0});
    });

    it("should wraps when bottom edge reached in forward movement", function() {
      var startingPoint = {x: 0, y: 0};
      var facingDirection = "S";
      var rover = createRover(startingPoint, facingDirection, grid);

      rover.move("f");

      expect(rover.position()).toBePosition({x: 0, y: 1});
    });
  });
});

describe("Command parser", function() {

  it("should invoke callback when command provided", function() {
    var func = jasmine.createSpy();
    var parser = createCommandParser({"f": func});

    parser.parse("f");

    expect(func).toHaveBeenCalled();
  });

  it("should invoke callback two times when two commands provided", function() {
    var func = jasmine.createSpy();
    var parser = createCommandParser({"f": func});

    parser.parse("ff");

    expect(func.callCount).toBe(2);
  });

  it("should invoke two different callbacks when two different commands provided", function() {
    var funcA = jasmine.createSpy();
    var funcB = jasmine.createSpy();
    var parser = createCommandParser({"f": funcA, "b": funcB});

    parser.parse("fb");

    expect(funcA).toHaveBeenCalled();
    expect(funcB).toHaveBeenCalled();
  });


});
