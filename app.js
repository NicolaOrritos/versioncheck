
var http = require('http');
var versioncheck = require('./lib/versioncheck.js')
var sjl = require("sjl");

var defaults =
{
    "ENVIRONMENT": "development",
    "HOST": "0.0.0.0",
    "PORT": 4554,
    "VERSIONS":
    {
        // TODO
    }
};

var CONF = sjl("/etc/versioncheck.json", defaults);


http.createServer(versioncheck.check).listen(CONF.PORT, CONF.HOST);


console.log('Server running at %s:%d ...', CONF.HOST, CONF.PORT);
