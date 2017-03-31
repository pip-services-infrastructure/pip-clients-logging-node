let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { LoggingMemoryPersistence } from 'pip-services-logging-node';
import { LoggingController } from 'pip-services-logging-node';
import { LoggingSenecaServiceV1 } from 'pip-services-logging-node';
import { SenecaLogger } from '../../src/log/SenecaLogger';
import { LoggerFixture } from './LoggerFixture';

let senecaConfig = ConfigParams.fromTuples(
    "connection.protocol", "none"
);

suite('LoggingSenecaClient', () => {
    let service: LoggingSenecaServiceV1;
    let logger: SenecaLogger;
    let fixture: LoggerFixture;

    suiteSetup((done) => {
        let consoleLogger = new ConsoleLogger();
        let persistence = new LoggingMemoryPersistence();
        let controller = new LoggingController();

        service = new LoggingSenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), consoleLogger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), seneca,
            new Descriptor('pip-services-logging', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-logging', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-logging', 'service', 'seneca', 'default', '1.0'), service
        );
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        logger = new SenecaLogger();
        logger.configure(senecaConfig);
        logger.setReferences(references);

        fixture = new LoggerFixture(logger, controller);

        service.open(null, (err) => {
            logger.open(null, done);
        });
    });

    suiteTeardown((done) => {
        logger.close(null);
        service.close(null, done);
    });

    test('Simple logging', (done) => {
        fixture.testSimpleLogging(done);
    });

});
