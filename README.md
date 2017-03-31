# Logging Microservice Client SDK for Node.js

This is a Node.js client SDK for [pip-services-logging](https://github.com/pip-services-infrastructure/pip-services-logging-node) microservice.
It provides an easy to use abstraction over communication protocols:

* HTTP/REST client
* Seneca client (see http://www.senecajs.org)
* Direct client for monolythic deployments
* Null client to be used in testing

This client SDK also contains Direct, REST and Seneca loggers that allow to directly log into the microservice.

<a name="links"></a> Quick Links:

* [Development Guide](doc/Development.md)
* [API Version 1](doc/NodeClientApiV1.md)

## Install

Add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-logging-node": "^1.0.*",
        ...
    }
}
```

Then install the dependency using **npm** tool
```bash
# Install new dependencies
npm install

# Update already installed dependencies
npm update
```

## Use

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-logging-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8003
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.LoggingRestClientV1(config);

// Connect to the microservice
client.open(null, function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Log system event
client.write(
    null,
    { 
        type: 'restart',
        source: 'server 1',
        message: 'Server restarted'
    },
    function (err, event) {
        ...
    }
);
```

```javascript
var now = new Date();

// Get the list system events
client.read(
    null,
    {
        from: new Date(now.getTime() - 24 * 3600 * 1000),
        to: now,
        source: 'server 1'
    },
    {
        total: true,
        skip: 0, 
        take: 100
    },
    function(err, activities) {
    ...    
    }
);
```    

## Acknowledgements

This client SDK was created and currently maintained by *Sergey Seroukhov*.

