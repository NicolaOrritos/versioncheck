'use strict';

var versioncheck = require('../lib/versioncheck.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.versioncheck =
{
    setUp: function(done)
    {
        // setup here
        done();
    },
    
    'no args': function(test)
    {
        test.expect(7);
        
        
        var checkResult = versioncheck.check('0.0.0');
        test.equal(checkResult.status, 'OK');
        test.equal(checkResult.should_upgrade, true);
        test.equal(checkResult.must_upgrade, true);
                   
        checkResult = versioncheck.check('1000.0.0');
        test.equal(checkResult.status, 'OK');
        test.equal(checkResult.should_upgrade, false);
        test.equal(checkResult.must_upgrade, false);
                   
        checkResult = versioncheck.check('a.0.0');
        test.equal(checkResult.status, 'NOT_OK');
        
        
        test.done();
    }
};
