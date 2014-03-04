/*
 * versioncheck
 *
 * Copyright (c) 2014 Nicola Orritos
 * Licensed under the Apache v2 license.
 * 
 * Versions format is based on "semantic-versioning".
 * Read more at http://semver.org/
 * 
 */

'use strict';


var sjl = require("sjl");

var defaults =
{
    "VERSIONS":
    [
        {"NUMBER": "1.0.0", "upgrade_url": "http://www.cornify.com/",  "message": "Upgrade because... Unicorns!"},
        {"NUMBER": "1.1.0", "upgrade_url": "http://www.megadeth.com/", "message": "Lots of rocking here. Hell yeah!"}
    ]
};

var CONF = sjl("/etc/versioncheck.json", defaults);


function isNumber(num)
{
    return (!isNaN(parseFloat(num)) && isFinite(num));
}

exports.check = function(version)
{
    var result = {"status": "NOT_OK", "error": "No version provided"};
    
    
    if (version)
    {
        var versionsCount    = CONF.VERSIONS.length;
        var currentVersion   = CONF.VERSIONS[versionsCount -1];
        var currVersionParts = currentVersion.NUMBER.split('.');
        var currMajor        = parseInt(currVersionParts[0]);
        var currMinor        = parseInt(currVersionParts[1]);
        var currPatch        = parseInt(currVersionParts[2]);
        
        
        var versions = version.split('.');

        if (versions.length > 2)
        {
            var major = parseInt(versions[0]);
            var minor = parseInt(versions[1]);
            var patch = parseInt(versions[2]);

            if (isNumber(major) && isNumber(minor) && isNumber(patch))
            {
                result = {"status": "OK", "must_upgrade": false, "should_upgrade": false};

                if (currMajor > major)
                {
                    result.must_upgrade = true;
                    result.should_upgrade = true;
                }
                else if (currMajor === major && (currMinor > minor || currPatch > patch))
                {
                    result.should_upgrade = true;
                }
                else
                {
                    // Nothing to report, sir!
                }


                if (result.should_upgrade || result.must_upgrade)
                {
                    result.to          = currentVersion.NUMBER;
                    result.upgrade_url = currentVersion.upgrade_url;
                    result.message     = currentVersion.message;
                }
            }
            else
            {
                return {"status": "NOT_OK", "error": "Malformed version"};
            }
        }
        else
        {
            return {"status": "NOT_OK", "error": "Malformed version"};
        }
    }
    
    
    return result;
};
