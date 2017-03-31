let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { LoggingMemoryPersistence } from 'pip-services-logging-node';
import { LoggingController } from 'pip-services-logging-node';
import { ILoggingClientV1 } from '../../src/version1/ILoggingClientV1';
import { LoggingDirectClientV1 } from '../../src/version1/LoggingDirectClientV1';
import { LoggingClientFixtureV1 } from './LoggingClientFixtureV1';

suite('LoggingDirectClientV1', ()=> {
    let client: LoggingDirectClientV1;
    let fixture: LoggingClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new LoggingMemoryPersistence();
        let controller = new LoggingController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-logging', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-logging', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new LoggingDirectClientV1();
        client.setReferences(references);

        fixture = new LoggingClientFixtureV1(client);

        client.open(null, done);
    });
    
    suiteTeardown((done) => {
        client.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
