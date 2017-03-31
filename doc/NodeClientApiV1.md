# Client API (version 1) <br/> Logging Microservices Client SDK for Node.js

Node.js client API for Logging microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [LogMessageV1 class](#class1)
* [DataPage<LogMessageV1> class](#class2)
* [ILoggingClientV1 interface](#interface)
    - [init()](#operation1)
    - [open()](#operation2)
    - [close()](#operation3)
    - [readMessages()](#operation4)
    - [readErrors()](#operation5)
    - [writeMessage()](#operation6)
    - [writeMessages()](#operation7)
    - [clear()](#operation8)
* [LoggingRestClientV1 class](#client_rest)
* [LoggingSenecaClientV1 class](#client_seneca)
* [LoggingDirectClientV1 class](#client_direct)
* [LoggingNullClientV1 class](#client_null)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-logging-node": "^1.0.0",
        ...
    }
}
```

Then download the dependency using **npm**:

```javascript
# Installing dependencies
npm install

# Updating dependencies
npm update
```

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
var sdk = new require('pip-clients-logging-node');

// Client configuration
var config = {
    connection: {
        type: 'http',
        host: 'localhost', 
        port: 8001
    }
};

// Create the client instance
var client = sdk.LoggingRestClientV1(config);

// Open client connection to the microservice
client.open(null, function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');
        
    // Log message
    client.writeMessage(
        null,
        {
            time: new Date(),
            level: 4,
            message: 'Server restarted'
        }, 
        function (err, message) {
            if (err) {
                console.error(err);
                return;
            }
            
            console.log('Logged message is');
            console.log(message);
            
            var now = new Date();
    
            // Read server events
            client.readMessages(
                {
                    search: 'server',
                    from_time: new Date(now.getTime() - 24 * 3600 * 1000),
                    to_time: now
                },
                {
                    total: true,
                    skip: 0, 
                    take: 100
                },
                function (err, page) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    
                    console.log('Messages containing "server" were');
                    console.log(page.data);
                    
                    // Close connection
                    client.close(); 
                }
            );
        }
    );
});
```

### <a name="class1"></a> LogMessageV1 class

Represents a record of a system activity performed in the past

**Properties:**
- correlation_id: string - unique id of transaction that caused the event
- time: Date - date and time in UTC when the event took place (default: current time)
- source: string - server name where event took place (default: current host)
- level: number - log level: 1 - fatal, 2 - error, 3 - warning, 4 - info, 5 - debug, 6 - trace.
- error: Object - error object
- message: string - descriptive message

### <a name="class2"></a> DataPage<LogMessageV1> class

Represents a paged result with subset of requested LogMessageV1 objects

**Properties:**
- data: [LogMessageV1] - array of retrieved LogMessageV1 page
- count: int - total number of objects in retrieved resultset

## <a name="interface"></a> ILoggingClientV1 interface

If you are using Typescript, you can use ILoggingClientV1 as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about ILoggingClientV1 interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface ILoggingClientV1 {
    setReferences(references);
    open(correlationId, callback);
    close(correlationIdm callback);
    readMessages(correlationId, filter, paging, callback);
    readErrors(correlationId, filter, paging, callback);
    writeMessage(correlationId, message, callback);
    writeMessages(correlationId, messages, callback);
    clear(correlationId, callback);
}
```

### <a name="operation1"></a> setReferences(references)

Initializes client references. This method is optional. It is used to set references 
to logger or performance counters.

**Arguments:**
- references: IReferences - references to other components

### <a name="operation2"></a> open(correlationId, callback)

Opens connection to the microservice

**Arguments:**
- correlationId: string - id that uniquely identifies transaction
- callback: (err) => void - callback function
  - err - Error or null is no error occured

### <a name="operation3"></a> close(correlationId, callback)

Closes connection to the microservice

**Arguments:**
- correlationId: string - id that uniquely identifies transaction
- callback: (err) => void - callback function
  - err - Error or null is no error occured

### <a name="operation4"></a> readMessages(correlationId, filter, paging, callback)

Retrieves logged messages by specified criteria

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- filter: object - filter parameters
  - search: string - (optional) search substring to find in source, type or message
  - level: number - (optional) log level
  - max_level: number - (optional) maximum log level
  - from_time: Date - (optional) start of the time range
  - to_time: Date - (optional) end of the time range
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0)
  - take: int - (optional) page length (default: 100)
  - total: boolean - (optional) include total counter into paged result (default: false)
- callback: (err, page) - callback function
  - err: Error - occured error or null for success
  - page: DataPage<LogMessageV1> - retrieved LogMessageV1 objects in paged format

### <a name="operation5"></a> readErrors(correlationId, filter, paging, callback)

Retrieves logged errors by specified criteria

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- filter: object - filter parameters
  - search: string - (optional) search substring to find in source, type or message
  - level: number - (optional) log level
  - max_level: number - (optional) maximum log level
  - from_time: Date - (optional) start of the time range
  - to_time: Date - (optional) end of the time range
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0)
  - take: int - (optional) page length (default: 100)
  - total: boolean - (optional) include total counter into paged result (default: false)
- callback: (err, page) - callback function
  - err: Error - occured error or null for success
  - page: DataPage<LogMessageV1> - retrieved LogMessageV1 objects in paged format

### <a name="operation6"></a> writeMessage(correlationId, message, callback)

Log message

**Activities:** 
- correlationId: string - id that uniquely identifies transaction
- message: LogMessageV1 - message to be logged
- callback: (err, event) => void - callback function
  - err: Error - occured error or null for success
  - event: LogMessageV1 - logged system event
 
### <a name="operation7"></a> writeMessages(correlationId, messages, callback)

Log multiple messages

**Activities:** 
- correlationId: string - id that uniquely identifies transaction
- messages: LogMessageV1[] - array of messages to be logged
- callback: (err, event) => void - callback function
  - err: Error - occured error or null for success

### <a name="operation8"></a> clear(correlationId, callback)

Clears all logged messages and errors

**Activities:** 
- correlationId: string - id that uniquely identifies transaction
- callback: (err, event) => void - callback function
  - err: Error - occured error or null for success

## <a name="client_rest"></a> LoggingRestClientV1 class

LoggingRestClientV1 is a client that implements HTTP/REST protocol

```javascript
class LoggingRestClientV1 extends CommandableRestClient implements ILoggingClientV1 {
    constructor(config?: any);
    setReferences(refs);
    open(correlationId, callback);
    close(correlationIdm callback);
    readMessages(correlationId, filter, paging, callback);
    writeMessage(correlationId, event, callback);
    writeMessages(correlationId, messages, callback);
    clear(correlationId, callback);
}
```

**Constructor config properties:** 
- connection: object - HTTP transport configuration options
  - type: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> LoggingSenecaClientV1 class

LoggingSenecaClientV1 is a client that implements Seneca protocol

```javascript
class LoggingSenecaClientV1 extends CommandableSenecaClient implements ILoggingClientV1 {
    constructor(config?: any);        
    setReferences(refs);
    open(correlationId, callback);
    close(correlationId, callback);
    readMessages(correlationId, filter, paging, callback);
    readErrors(correlationId, filter, paging, callback);
    writeMessage(correlationId, event, callback);
    writeMessages(correlationId, messages, callback);
    clear(correlationId, callback);
}
```

**Constructor config properties:** 
- connection: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - type: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_direct"></a> LoggingDirectClientV1 class

LoggingDirectClientV1 is a client that calls controller directly from the same container.
It can be used in monolythic deployments when multiple microservices run in the same process.

```javascript
class LoggingDirectClientV1 extends DirectClient implements ILoggingClientV1 {
    constructor();        
    setReferences(refs);
    open(correlationId, callback);
    close(correlationId, callback);
    readMessages(correlationId, filter, paging, callback);
    readErrors(correlationId, filter, paging, callback);
    writeMessage(correlationId, event, callback);
    writeMessages(correlationId, messages, callback);
    clear(correlationId, callback);
}
```

## <a name="client_null"></a> LoggingNullClientV1 class

LoggingNullClientV1 is a dummy client that mimics the real client but doesn't call a microservice. 
It can be useful in testing scenarios to cut dependencies on external microservices.

```javascript
class LoggingNullClientV1 implements ILoggingClientV1 {
    constructor();        
    setReferences(refs);
    open(correlationId, callback);
    close(correlationId, callback);
    readMessages(correlationId, filter, paging, callback);
    readErrors(correlationId, filter, paging, callback);
    writeMessage(correlationId, event, callback);
    writeMessages(correlationId, messages, callback);
    clear(correlationId, callback);
}
```
