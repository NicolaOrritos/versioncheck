
var http = require('http');
var url  = require('url');
var versioncheck = require('./lib/versioncheck.js');
var sjl  = require("sjl");

var defaults =
{
    "ENVIRONMENT": "development",
    "HOST": "0.0.0.0",
    "PORT": 4554
};

var CONF = sjl("/etc/versioncheck.json", defaults);


http.createServer(function(req, res)
{
    var result =
    {
        "head":
        {
            "status_code": 500,
            "headers":
            {
                "Content-Type": "application/json"
            }
        },
        
        "data":
        {
            "status": "NOT_OK",
            "error": "Could not parse request"
        }
    };
    
    
    var urlParts = url.parse(req.url, true);
    
    if (urlParts && urlParts.query)
    {
        var query = urlParts.query;
        
        if (query.version && query.platform)
        {
            var checkResult = versioncheck.check(query.version, query.platform);
            
            if (checkResult.status === 'NOT_OK')
            {
                result.head.status_code = 400;
            }
            else
            {
                result.head.status_code = 200;
            }
            
            result.data = checkResult;
        }
        else
        {
            result.head.status_code = 400;
            result.data = {"status": "NOT_OK", "error": "Not all required parameters have been provided"};
        }
    }
    
    
    res.writeHead(result.head.status_code, result.head.headers);
    res.end(JSON.stringify(result.data));
    
}).listen(CONF.PORT, CONF.HOST);


console.log('Server running at %s:%d ...', CONF.HOST, CONF.PORT);
