"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
class LoggingNullClientV1 {
    constructor(config) { }
    readMessages(correlationId, filter, paging, callback) {
        callback(null, new pip_services_commons_node_1.DataPage([], 0));
    }
    readErrors(correlationId, filter, paging, callback) {
        callback(null, new pip_services_commons_node_1.DataPage([], 0));
    }
    writeMessage(correlationId, message, callback) {
        if (callback)
            callback(null, message);
    }
    writeMessages(correlationId, messages, callback) {
        if (callback)
            callback(null);
    }
    clear(correlationId, callback) {
        if (callback)
            callback(null);
    }
}
exports.LoggingNullClientV1 = LoggingNullClientV1;
//# sourceMappingURL=LoggingNullClientV1.js.map