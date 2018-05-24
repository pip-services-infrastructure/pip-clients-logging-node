"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let os = require('os');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class LoggingHttpClientV1 extends pip_services_net_node_1.CommandableHttpClient {
    constructor(config) {
        super('v1/logging');
        if (config != null)
            this.configure(pip_services_commons_node_1.ConfigParams.fromValue(config));
    }
    readMessages(correlationId, filter, paging, callback) {
        this.callCommand('read_messages', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    readErrors(correlationId, filter, paging, callback) {
        this.callCommand('read_errors', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    writeMessage(correlationId, message, callback) {
        message.time = message.time || new Date();
        message.source = message.source || os.hostname();
        message.correlation_id = message.correlation_id || correlationId;
        this.callCommand('write_message', correlationId, {
            message: message
        }, callback);
    }
    writeMessages(correlationId, messages, callback) {
        _.each(messages, (message) => {
            message.time = message.time || new Date();
            message.source = message.source || os.hostname();
            message.correlation_id = message.correlation_id || correlationId;
        });
        this.callCommand('write_messages', correlationId, {
            messages: messages
        }, callback);
    }
    clear(correlationId, callback) {
        this.callCommand('clear', correlationId, null, callback);
    }
}
exports.LoggingHttpClientV1 = LoggingHttpClientV1;
//# sourceMappingURL=LoggingHttpClientV1.js.map