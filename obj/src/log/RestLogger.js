"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractLogger_1 = require("./AbstractLogger");
const LoggingRestClientV1_1 = require("../version1/LoggingRestClientV1");
class RestLogger extends AbstractLogger_1.AbstractLogger {
    constructor() {
        super(new LoggingRestClientV1_1.LoggingRestClientV1());
    }
}
exports.RestLogger = RestLogger;
//# sourceMappingURL=RestLogger.js.map