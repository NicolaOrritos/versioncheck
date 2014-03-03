/*
 * versioncheck
 *
 * Copyright (c) 2014 Nicola Orritos
 * Licensed under the Apache v2 license.
 */

'use strict';

exports.check = function(req, res)
{
    res.writeHead(200, {'Content-Type': 'application/json'});
    
    res.end('{"is_still_under_construction": true}');
};
