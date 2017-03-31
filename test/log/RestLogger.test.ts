let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { LoggingMemoryPersistence } from 'pip-services-logging-node';
import { LoggingController } from 'pip-services-logging-node';
import { LoggingRestServiceV1 } from 'pip-services-logging-node';
import { RestLogger } from '../../src/log/RestLogger';
import { LoggerFixture } from './LoggerFixture';

var restConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('LoggingRestClientV1', ()=> {
    let service: LoggingRestServiceV1;
    let logger: RestLogger;
    let fixture: LoggerFixture;

    suiteSetup((done) => {
        let consoleLogger = new ConsoleLogger();
        let persistence = new LoggingMemoryPersistence();
        let controller = new LoggingController();

        service = new LoggingRestServiceV1();
        service.configure(restConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), consoleLogger,
            new Descriptor('pip-services-logging', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-logging', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-logging', 'service', 'rest', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        logger = new RestLogger();
        logger.configure(restConfig);

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
