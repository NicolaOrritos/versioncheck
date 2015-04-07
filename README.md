# versioncheck
Server-side version-check module for apps


## Getting started
Versioncheck should be installed globally, like this:

    sudo npm install -g versioncheck

Once installed it can be started like this:

    sudo versioncheck

It will *daemonize* itself and run in background, spawning a process for every CPU core available.


## Configuring
Place a file named *"versioncheck.json"* under */etc* and versioncheck will load it at startup.
The file is a simple JSON object containing all of the settings.
This is the default one, shipped with the default installation:

    {
        "ENVIRONMENT": "development",
        "HOST": "0.0.0.0",
        "PORT": 4554,
        "PLATFORMS":
        {
            "WINXP":
            {
                "VERSIONS":
                [
                    {"NUMBER": "0.4.0", "upgrade_url": "http://www.myawesomeservice.com/" }
                ]
            },

            "WIN7":
            {
                "VERSIONS":
                [
                    {"NUMBER": "0.4.0", "upgrade_url": "http://www.myawesomeservice.com/" }
                ]
            },

            "WIN8":
            {
                "VERSIONS":
                [
                    {"NUMBER": "0.4.0", "upgrade_url": "http://www.myawesomeservice.com/" }
                ]
            },

            "OSX":
            {
                "VERSIONS":
                [
                    {"NUMBER": "0.4.0", "upgrade_url": "http://www.myawesomeservice.com/" }
                ]
            }
        }
    }



## License
Copyright (c) 2015 Nicola Orritos. Licensed under the Apache v2 license.
