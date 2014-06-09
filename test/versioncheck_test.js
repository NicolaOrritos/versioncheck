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
    
    'Simple': function(test)
    {
        test.expect(14);
        
        
        var checkResult = versioncheck.check('0.0.0', 'winxp');
        test.equal(checkResult.status, 'OK');
        test.equal(checkResult.should_upgrade, true);
        test.equal(checkResult.must_upgrade, false);
                   
        checkResult = versioncheck.check('1000.0.0', 'osx');
        test.equal(checkResult.status, 'OK');
        test.equal(checkResult.should_upgrade, false);
        test.equal(checkResult.must_upgrade, false);
                   
        checkResult = versioncheck.check('0.4.0', 'win8');
        test.equal(checkResult.status, 'OK');
        test.equal(checkResult.should_upgrade, true);
        test.equal(checkResult.must_upgrade, false);
                   
        checkResult = versioncheck.check('0.5.0', 'win8');
        test.equal(checkResult.status, 'OK');
        test.equal(checkResult.should_upgrade, false);
        test.equal(checkResult.must_upgrade, false);
                   
        checkResult = versioncheck.check('1.0.0', 'nonexistentOS');
        test.equal(checkResult.status, 'NOT_OK');
                   
        checkResult = versioncheck.check('a.0.0', 'win7');
        test.equal(checkResult.status, 'NOT_OK');
        
        
        test.done();
    }
};
