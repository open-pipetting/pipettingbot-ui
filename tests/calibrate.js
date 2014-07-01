function GenMoveCode (start) {
  var counter = start || {x: 0, y: 0};

  return function (dir) {
    var moveCode = 'G1 ';

    switch (dir) {
      case '+x':
      return moveCode += 'X' + ++counter.x;

      case '-x':
      return moveCode += 'X' + --counter.x;

      case '+y':
      return moveCode += 'Y1' + ++counter.y;

      case '-y':
      return moveCode += 'Y' + --counter.y;

      default:
      return;
    }
  };
}

module.exports = GenMoveCode;
