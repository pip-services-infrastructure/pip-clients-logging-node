import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { DirectClient } from 'pip-services-rpc-node';
import { ILoggingClientV1 } from './ILoggingClientV1';
import { LogMessageV1 } from './LogMessageV1';
export declare class LoggingDirectClientV1 extends DirectClient<any> implements ILoggingClientV1 {
    constructor();
    readMessages(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<LogMessageV1>) => void): void;
    readErrors(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<LogMessageV1>) => void): void;
    writeMessage(correlationId: string, message: LogMessageV1, callback?: (err: any, message: LogMessageV1) => void): void;
    writeMessages(correlationId: string, messages: LogMessageV1[], callback?: (err: any) => void): void;
    clear(correlationId: string, callback?: (err: any) => void): void;
}
