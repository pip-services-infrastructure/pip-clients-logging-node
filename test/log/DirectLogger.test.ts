let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { LoggingMemoryPersistence } from 'pip-services-logging-node';
import { LoggingController } from 'pip-services-logging-node';
import { DirectLogger } from '../../src/log/DirectLogger';
import { LoggerFixture } from './LoggerFixture';

suite('DirectLogger', ()=> {
    let logger: DirectLogger;
    let fixture: LoggerFixture;

    suiteSetup((done) => {
        let consoleLogger = new ConsoleLogger();
        let persistence = new LoggingMemoryPersistence();
        let controller = new LoggingController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), consoleLogger,
            new Descriptor('pip-services-logging', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-logging', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        logger = new DirectLogger();
        logger.setReferences(references);

        fixture = new LoggerFixture(logger, controller);

        logger.open(null, done);
    });
    
    suiteTeardown((done) => {
        logger.close(null, done);
    });

    test('Simple logging', (done) => {
        fixture.testSimpleLogging(done);
    });

});
