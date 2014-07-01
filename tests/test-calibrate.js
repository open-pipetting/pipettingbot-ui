var GenMoveCode = require('./calibrate.js')
  , assert = require('assert');

describe('genMoveCode', function () {
  it('should be defined', function () {
    assert(!!GenMoveCode);
  });

  describe('with no initial pos', function  () {
    beforeEach(function () {
      genMoveCode = GenMoveCode();
    });

    afterEach(function () {
      genMoveCode = null;
    });

    it('one cmd', function () {
      var expected = 'G1 X1';
      var actual = genMoveCode('+x');

      assert.equal(actual, expected);
    });

    it('sequence of +', function () {
      var expected = 'G1 X2';
      var actual = genMoveCode('+x');
      actual = genMoveCode('+x');

      assert.equal(actual, expected);
    });


    it('sequence with + and -', function () {
      var expected = 'G1 X1';
      var actual = genMoveCode('+x');
      actual = genMoveCode('+x');
      actual = genMoveCode('-x');
      actual = genMoveCode('-x');
      actual = genMoveCode('+x');

      assert.equal(actual, expected);
    });
  });


  describe('with start pos', function () {
    beforeEach(function () {
      genMoveCode = GenMoveCode({x: 10, y:10});
    });

    afterEach(function () {
      genMoveCode = null;
    });

    it('one cmd with start pos', function () {
      var expected = 'G1 X12';
      var actual = genMoveCode('+x');
      actual = genMoveCode('+x');

      assert.equal(actual, expected);
    });
  });
});
