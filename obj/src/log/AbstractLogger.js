"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let os = require('os');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const LogMessageV1_1 = require("../version1/LogMessageV1");
class AbstractLogger extends pip_services_commons_node_2.Logger {
    constructor(client) {
        super();
        this._cache = [];
        this._interval = AbstractLogger._defaultInterval;
        this._client = client;
        this._dumpCurl = _.debounce(() => { this.dump(); }, this._interval);
    }
    configure(config) {
        this._client.configure(config);
        this._interval = config.getAsLongWithDefault("interval", this._interval);
        this._dumpCurl = _.debounce(() => { this.dump(); }, this._interval);
    }
    setReferences(references) {
        this._client.setReferences(references);
    }
    isOpened() {
        return this._client.isOpened();
    }
    open(correlationId, callback) {
        this._client.open(correlationId, callback);
    }
    close(correlationId, callback) {
        this._client.close(correlationId, callback);
    }
    write(level, correlationId, ex, message) {
        let error = ex != null ? pip_services_commons_node_1.ErrorDescriptionFactory.create(ex) : null;
        let source = os.hostname(); // Todo: add current module name name
        let logMessage = new LogMessageV1_1.LogMessageV1(level, source, correlationId, error, message);
        this._cache.push(logMessage);
        this._dumpCurl();
    }
    clear() {
        this._cache = [];
    }
    dump() {
        if (this._cache.length == 0)
            return;
        this._client.writeMessages('logger', this._cache, (err) => { });
        this._cache = [];
    }
}
AbstractLogger._defaultInterval = 1000;
exports.AbstractLogger = AbstractLogger;
//# sourceMappingURL=AbstractLogger.js.map