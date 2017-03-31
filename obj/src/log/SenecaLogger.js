"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractLogger_1 = require("./AbstractLogger");
const LoggingSenecaClientV1_1 = require("../version1/LoggingSenecaClientV1");
class SenecaLogger extends AbstractLogger_1.AbstractLogger {
    constructor() {
        super(new LoggingSenecaClientV1_1.LoggingSenecaClientV1());
    }
}
exports.SenecaLogger = SenecaLogger;
//# sourceMappingURL=SenecaLogger.js.map