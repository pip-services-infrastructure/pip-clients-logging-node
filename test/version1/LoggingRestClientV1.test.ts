let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { LoggingMemoryPersistence } from 'pip-services-logging-node';
import { LoggingController } from 'pip-services-logging-node';
import { LoggingRestServiceV1 } from 'pip-services-logging-node';
import { ILoggingClientV1 } from '../../src/version1/ILoggingClientV1';
import { LoggingRestClientV1 } from '../../src/version1/LoggingRestClientV1';
import { LoggingClientFixtureV1 } from './LoggingClientFixtureV1';

var restConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('LoggingRestClientV1', ()=> {
    let service: LoggingRestServiceV1;
    let client: LoggingRestClientV1;
    let fixture: LoggingClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new LoggingMemoryPersistence();
        let controller = new LoggingController();

        service = new LoggingRestServiceV1();
        service.configure(restConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-logging', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-logging', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-logging', 'service', 'rest', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new LoggingRestClientV1();
        client.setReferences(references);
        client.configure(restConfig);

        fixture = new LoggingClientFixtureV1(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });
    
    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
