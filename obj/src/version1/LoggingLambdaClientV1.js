"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let os = require('os');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
class LoggingLambdaClientV1 extends pip_services3_aws_node_1.CommandableLambdaClient {
    constructor(config) {
        super('logging');
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
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
        message.correlation_id = message.correlation_id || correlationId;
        message.source = message.source || os.hostname();
        this.callCommand('write_message', correlationId, {
            message: message
        }, callback);
    }
    writeMessages(correlationId, messages, callback) {
        _.each(messages, (message) => {
            message.time = message.time || new Date();
            message.correlation_id = message.correlation_id || correlationId;
            message.source = message.source || os.hostname();
        });
        this.callCommand('write_messages', correlationId, {
            messages: messages
        }, callback);
    }
    clear(correlationId, callback) {
        this.callCommand('clear', correlationId, null, callback);
    }
}
exports.LoggingLambdaClientV1 = LoggingLambdaClientV1;
//# sourceMappingURL=LoggingLambdaClientV1.js.map