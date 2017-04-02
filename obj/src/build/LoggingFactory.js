"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const DirectLogger_1 = require("../log/DirectLogger");
const HttpLogger_1 = require("../log/HttpLogger");
const SenecaLogger_1 = require("../log/SenecaLogger");
const LoggingNullClientV1_1 = require("../version1/LoggingNullClientV1");
const LoggingDirectClientV1_1 = require("../version1/LoggingDirectClientV1");
const LoggingHttpClientV1_1 = require("../version1/LoggingHttpClientV1");
const LoggingSenecaClientV1_1 = require("../version1/LoggingSenecaClientV1");
class LoggingFactory extends pip_services_commons_node_2.Factory {
    constructor() {
        super();
        this.registerAsType(LoggingFactory.DirectLoggerDescriptor, DirectLogger_1.DirectLogger);
        this.registerAsType(LoggingFactory.HttpLoggerDescriptor, HttpLogger_1.HttpLogger);
        this.registerAsType(LoggingFactory.SenecaLoggerDescriptor, SenecaLogger_1.SenecaLogger);
        this.registerAsType(LoggingFactory.NullClientV1Descriptor, LoggingNullClientV1_1.LoggingNullClientV1);
        this.registerAsType(LoggingFactory.DirectClientV1Descriptor, LoggingDirectClientV1_1.LoggingDirectClientV1);
        this.registerAsType(LoggingFactory.HttpClientV1Descriptor, LoggingHttpClientV1_1.LoggingHttpClientV1);
        this.registerAsType(LoggingFactory.SenecaClientV1Descriptor, LoggingSenecaClientV1_1.LoggingSenecaClientV1);
    }
}
LoggingFactory.Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-logging', 'factory', 'default', 'default', '1.0');
LoggingFactory.DirectLoggerDescriptor = new pip_services_commons_node_1.Descriptor('pip-services-logging', 'logger', 'direct', 'default', '1.0');
LoggingFactory.HttpLoggerDescriptor = new pip_services_commons_node_1.Descriptor('pip-services-logging', 'logger', 'http', 'default', '1.0');
LoggingFactory.SenecaLoggerDescriptor = new pip_services_commons_node_1.Descriptor('pip-services-logging', 'logger', 'seneca', 'default', '1.0');
LoggingFactory.NullClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-logging', 'client', 'null', 'default', '1.0');
LoggingFactory.DirectClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-logging', 'client', 'direct', 'default', '1.0');
LoggingFactory.HttpClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-logging', 'client', 'http', 'default', '1.0');
LoggingFactory.SenecaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-logging', 'client', 'seneca', 'default', '1.0');
exports.LoggingFactory = LoggingFactory;
//# sourceMappingURL=LoggingFactory.js.map