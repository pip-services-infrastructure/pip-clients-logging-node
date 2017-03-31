let _ = require('lodash');
let os = require('os');

import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReconfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';
import { ErrorDescription } from 'pip-services-commons-node';
import { ErrorDescriptionFactory } from 'pip-services-commons-node';
import { LogLevel } from 'pip-services-commons-node';
import { Logger } from 'pip-services-commons-node';

import { LogMessageV1 } from '../version1/LogMessageV1';
import { ILoggingClientV1 } from '../version1/ILoggingClientV1';

export abstract class AbstractLogger extends Logger implements IReconfigurable, IReferenceable, IOpenable {
	private static readonly _defaultInterval: number = 1000;
	
    protected _client: ILoggingClientV1;
    protected _cache: LogMessageV1[] = [];
    protected _interval: number = AbstractLogger._defaultInterval;
    protected _dumpCurl: any;

    public constructor(client: ILoggingClientV1) {
        super();
        this._client = client;
        this._dumpCurl = _.debounce(() => { this.dump() }, this._interval);
    }

    public configure(config: ConfigParams): void {
        (this._client as any).configure(config);
    	this._interval = config.getAsLongWithDefault("interval", this._interval);
        this._dumpCurl = _.debounce(() => { this.dump() }, this._interval);
    }
	
    public setReferences(references: IReferences): void {
        (this._client as any).setReferences(references);
    }

    public isOpened(): boolean {
        return (this._client as any).isOpened();
    }

    public open(correlationId: string, callback?: (err: any) => void): void {
        (this._client as any).open(correlationId, callback);
    }

    public close(correlationId: string, callback?: (err: any) => void): void {
        (this._client as any).close(correlationId, callback);
    }

	protected write(level: LogLevel, correlationId: string, ex: Error, message: string): void {
		let error: ErrorDescription = ex != null ? ErrorDescriptionFactory.create(ex) : null;
        let source: string = os.hostname(); // Todo: add current module name name
		let logMessage: LogMessageV1 = new LogMessageV1(level, source, correlationId, error, message);
		
        this._cache.push(logMessage);
		
        this._dumpCurl();
	}
    
    public clear(): void {
        this._cache = [];
    }

    public dump(): void {
        if (this._cache.length == 0) return;

        this._client.writeMessages('logger', this._cache, (err) => {});

        this._cache = [];
    }

}