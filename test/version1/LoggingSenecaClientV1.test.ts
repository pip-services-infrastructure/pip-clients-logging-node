let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { LoggingMessagesMemoryPersistence } from 'pip-services-logging-node';
import { LoggingErrorsMemoryPersistence } from 'pip-services-logging-node';
import { LoggingController } from 'pip-services-logging-node';
import { LoggingSenecaServiceV1 } from 'pip-services-logging-node';
import { ILoggingClientV1 } from '../../src/version1/ILoggingClientV1';
import { LoggingSenecaClientV1 } from '../../src/version1/LoggingSenecaClientV1';
import { LoggingClientFixtureV1 } from './LoggingClientFixtureV1';

let senecaConfig = ConfigParams.fromTuples(
    "connection.protocol", "none"
);

suite('LoggingSenecaClient', () => {
    let service: LoggingSenecaServiceV1;
    let client: LoggingSenecaClientV1;
    let fixture: LoggingClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let messagesPersistence = new LoggingMessagesMemoryPersistence();
        let errorsPersistence = new LoggingErrorsMemoryPersistence();
        let controller = new LoggingController();

        service = new LoggingSenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), seneca,
            new Descriptor('pip-services-logging', 'persistence-messages', 'memory', 'default', '1.0'), messagesPersistence,
            new Descriptor('pip-services-logging', 'persistence-errors', 'memory', 'default', '1.0'), errorsPersistence,
            new Descriptor('pip-services-logging', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-logging', 'service', 'seneca', 'default', '1.0'), service
        );
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        client = new LoggingSenecaClientV1();
        client.configure(senecaConfig);
        client.setReferences(references);

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
