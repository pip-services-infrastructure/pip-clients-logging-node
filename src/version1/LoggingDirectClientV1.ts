import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams} from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { DirectClient } from 'pip-services-net-node';

import { ILoggingClientV1 } from './ILoggingClientV1';
import { ILoggingBusinessLogic } from 'pip-services-logging-node';
import { LogMessageV1 } from './LogMessageV1';

export class LoggingDirectClientV1 extends DirectClient<ILoggingBusinessLogic> implements ILoggingClientV1 {
            
    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor("pip-services-logging", "controller", "*", "*", "*"))
    }

    public readMessages(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<LogMessageV1>) => void): void {
        let timing = this.instrument(correlationId, 'logging.read_messages');
        this._controller.readMessages(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }

    public readErrors(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<LogMessageV1>) => void): void {
        let timing = this.instrument(correlationId, 'logging.read_errors');
        this._controller.readErrors(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }

    public writeMessage(correlationId: string, message: LogMessageV1, 
        callback?: (err: any, message: LogMessageV1) => void): void {
        let timing = this.instrument(correlationId, 'logging.write_message');
        this._controller.writeMessage(correlationId, message, (err, message) => {
            timing.endTiming();
            if (callback) callback(err, message);
        });
    }

    public writeMessages(correlationId: string, messages: LogMessageV1[], 
        callback?: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'logging.write_messages');
        this._controller.writeMessages(correlationId, messages, (err) => {
            timing.endTiming();
            if (callback) callback(err);
        });
    }

    public clear(correlationId: string, callback?: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'logging.clear');
        this._controller.clear(correlationId, (err) => {
            timing.endTiming();
            if (callback) callback(err);
        });
    }

}