"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class LoggingDirectClientV1 extends pip_services_net_node_1.DirectClient {
    constructor() {
        super();
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor("pip-services-logging", "controller", "*", "*", "*"));
    }
    readMessages(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'logging.read_messages');
        this._controller.readMessages(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    readErrors(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'logging.read_errors');
        this._controller.readErrors(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    writeMessage(correlationId, message, callback) {
        let timing = this.instrument(correlationId, 'logging.write_message');
        this._controller.writeMessage(correlationId, message, (err, message) => {
            timing.endTiming();
            if (callback)
                callback(err, message);
        });
    }
    writeMessages(correlationId, messages, callback) {
        let timing = this.instrument(correlationId, 'logging.write_messages');
        this._controller.writeMessages(correlationId, messages, (err) => {
            timing.endTiming();
            if (callback)
                callback(err);
        });
    }
    clear(correlationId, callback) {
        let timing = this.instrument(correlationId, 'logging.clear');
        this._controller.clear(correlationId, (err) => {
            timing.endTiming();
            if (callback)
                callback(err);
        });
    }
}
exports.LoggingDirectClientV1 = LoggingDirectClientV1;
//# sourceMappingURL=LoggingDirectClientV1.js.map