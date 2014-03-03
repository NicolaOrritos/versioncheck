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


var url = require('url');
var sjl = require("sjl");

var defaults =
{
    "ENVIRONMENT": "development",
    "HOST": "0.0.0.0",
    "PORT": 4554,
    "VERSIONS":
    [
        {"NUMBER": "1.0.0", "upgrade_url": "http://www.cornify.com/" },
        {"NUMBER": "1.1.0", "upgrade_url": "http://www.megadeth.com/"}
    ]
};

var CONF = sjl("/etc/versioncheck.json", defaults);



exports.check = function(req, res)
{
    var versionsCount    = CONF.VERSIONS.length;
    var currentVersion   = CONF.VERSIONS[versionsCount -1];
    var currVersionParts = currentVersion.NUMBER.split('.');
    var currMajor        = parseInt(currVersionParts[0]);
    var currMinor        = parseInt(currVersionParts[1]);
    var currPatch        = parseInt(currVersionParts[2]);
    
    
    var urlParts = url.parse(req.url, true);
    
    if (urlParts && urlParts.query)
    {
        var query = urlParts.query;
        
        if (query.version)
        {
            var versions = query.version.split('.');
            
            if (versions.length > 2)
            {
                var major = parseInt(versions[0]);
                var minor = parseInt(versions[1]);
                var patch = parseInt(versions[2]);
                
                if (major !== NaN && minor !== NaN && patch != NaN)
                {
                    var result = {"status": "OK", "must_upgrade": false, "should_upgrade": false};
                    
                    if (currMajor > major)
                    {
                        result.must_upgrade = true;
                        result.should_upgrade = true;
                    }
                    else if (currMajor === major && (currMinor > minor || currPatch > patch))
                    {
                        result.should_upgrade = true;
                        result.upgrade_url = currentVersion.upgrade_url;
                    }
                    else
                    {
                        // Nothing to report, sir!
                    }
                    
                    res.writeHead(200, {'Content-Type': 'application/json'});

                    res.end(JSON.stringify(result));
                }
                else
                {
                    res.writeHead(400, {'Content-Type': 'application/json'});

                    res.end('{"status": "NOT_OK", "error": "Malformed version"}');
                }
            }
            else
            {
                res.writeHead(400, {'Content-Type': 'application/json'});

                res.end('{"status": "NOT_OK", "error": "Malformed version"}');
            }
        }
        else
        {
            res.writeHead(400, {'Content-Type': 'application/json'});

            res.end('{"status": "NOT_OK", "error": "No version provided"}');
        }
    }
    else
    {
        res.writeHead(500, {'Content-Type': 'application/json'});
    
        res.end('{"status": "NOT_OK", "error": "Could not parse request"}');
    }
};
