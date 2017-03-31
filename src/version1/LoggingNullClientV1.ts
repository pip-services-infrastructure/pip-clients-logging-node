import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { LogMessageV1 } from './LogMessageV1';
import { ILoggingClientV1 } from './ILoggingClientV1';

export class LoggingNullClientV1 implements ILoggingClientV1 {
    constructor(config?: any) {}
        
    public readMessages(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<LogMessageV1>) => void): void {
        callback(null, new DataPage<LogMessageV1>([], 0));
    }

    public readErrors(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<LogMessageV1>) => void): void {
        callback(null, new DataPage<LogMessageV1>([], 0));
    }

    public writeMessage(correlationId: string, message: LogMessageV1, 
        callback?: (err: any, message: LogMessageV1) => void): void {
        if (callback) callback(null, message);
    }

    public writeMessages(correlationId: string, messages: LogMessageV1[], 
        callback?: (err: any) => void): void {
        if (callback) callback(null);
    }

    public clear(correlationId: string, callback?: (err: any) => void): void {
        if (callback) callback(null);
    }
}
