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
    "PLATFORMS":
    {
        "WINXP":
        {
            "VERSIONS":
            [
                {"NUMBER": "0.4.4", "upgrade_url": "http://www.cornify.com/" }
            ]
        },
        
        "WIN7":
        {
            "VERSIONS":
            [
                {"NUMBER": "0.4.3", "upgrade_url": "http://www.cornify.com/" }
            ]
        },
        
        "WIN8":
        {
            "VERSIONS":
            [
                {"NUMBER": "0.4.2", "upgrade_url": "http://www.cornify.com/" }
            ]
        },
        
        "OSX":
        {
            "VERSIONS":
            [
                {"NUMBER": "0.4.1", "upgrade_url": "http://www.cornify.com/" }
            ]
        }
    }
};

var CONF = sjl("/etc/versioncheck.json", defaults);


function isNumber(num)
{
    return (!isNaN(parseFloat(num)) && isFinite(num));
}

exports.check = function(version, platform)
{
    var result = {"status": "NOT_OK", "error": "No version provided"};
    
    
    if (version && platform)
    {
        platform = platform.trim().toUpperCase();
        
        console.log("Looking for platform '%s'...", platform);
        
        var resultingPlatform = CONF.PLATFORMS[platform];
        
        if (resultingPlatform)
        {
            var versionsCount    = resultingPlatform.VERSIONS.length;
            var currentVersion   = resultingPlatform.VERSIONS[versionsCount -1];
            var currVersionParts = currentVersion.NUMBER.split('.');
            var currMajor        = parseInt(currVersionParts[0]);
            var currMinor        = parseInt(currVersionParts[1]);
            var currPatch        = parseInt(currVersionParts[2]);
        
            console.log("Found platform '%s' with last version '%s'", platform, currentVersion.NUMBER);


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
                        result.must_upgrade   = true;
                        result.should_upgrade = true;
                    }
                    else if (currMajor === major && currMinor > minor)
                    {
                        result.must_upgrade   = false;
                        result.should_upgrade = true;
                    }
                    else if (currMajor === major && currMinor === minor && currPatch > patch)
                    {
                        result.must_upgrade   = false;
                        result.should_upgrade = true;
                    }
                    else
                    {
                        result.must_upgrade   = false;
                        result.should_upgrade = false;
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
        else
        {
            return {"status": "NOT_OK", "error": "Platform not found"};
        }
    }
    
    
    return result;
};
