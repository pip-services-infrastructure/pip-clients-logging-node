let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { LogLevel } from 'pip-services-commons-node';
import { ILoggingController } from 'pip-services-logging-node';
import { AbstractLogger } from '../../src/log/AbstractLogger';

export class LoggerFixture {
    private _logger: AbstractLogger;
    private _controller: ILoggingController;

    public constructor(logger: AbstractLogger, controller: ILoggingController) {
        this._logger = logger;
        this._controller = controller;
    }

    public testSimpleLogging(done) {
        this._logger.configure(
            ConfigParams.fromTuples('interval', 100)
        );

        this._logger.setLevel(LogLevel.Trace);

        this._logger.fatal(null, null, "Fatal error message");
        this._logger.error(null, null, "Error message");
        this._logger.warn(null, "Warning message");
        this._logger.info(null, "Information message");
        this._logger.debug(null, "Debug message");
        this._logger.trace(null, "Trace message");
        
        setTimeout(() => {
            this._controller.readMessages(null, null, null, (err, page) => {
                assert.isNull(err);
                assert.lengthOf(page.data, 6);
                done();
            })
        }, 200);
    }
}