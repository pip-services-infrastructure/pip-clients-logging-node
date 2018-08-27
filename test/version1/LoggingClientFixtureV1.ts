let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { LogLevel } from 'pip-services-components-node';
import { ErrorDescriptionFactory } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';

import { LogMessageV1 } from '../../src/version1/LogMessageV1';
import { ILoggingClientV1 } from '../../src/version1/ILoggingClientV1';

export class LoggingClientFixtureV1 {
    private _client: ILoggingClientV1;
    
    constructor(client: ILoggingClientV1) {
        this._client = client;
    }
        
    testCrudOperations(done) {
         async.series([
            (callback) => {
                this._client.writeMessage(
                    null, 
                    new LogMessageV1(LogLevel.Info, null, "123", null, "AAA"), 
                    (err, message) => {
                        assert.isNull(err);
                        assert.isObject(message);
                        callback(err);
                    }
                );
            },
            (callback) => {
                let message1 = new LogMessageV1(LogLevel.Debug, null, "123", null, "BBB");
                let message2 = new LogMessageV1(LogLevel.Error, null, "123", ErrorDescriptionFactory.create(new Error()), "AAB");
                message2.time = new Date(1975, 1, 1, 0, 0, 0, 0);

                this._client.writeMessages(
                    null,
                    [message1, message2],
                    (err) => {
                        assert.isNull(err);
                        callback(err);
                    }
                );
            },
            (callback) => {
                this._client.readMessages(
                    null, 
                    FilterParams.fromTuples("search", "AA"), 
                    null,
                    (err, page) => {
                        assert.lengthOf(page.data, 2);
                        callback(err);
                    }
                );
            },
            (callback) => {
                this._client.readErrors(
                    null, 
                    null, 
                    null,
                    (err, page) => {
                        assert.lengthOf(page.data, 1);
                        callback(err);
                    }
                );
            }
        ], done);
    }
}
