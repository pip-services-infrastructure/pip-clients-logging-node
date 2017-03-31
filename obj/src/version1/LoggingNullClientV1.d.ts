import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { LogMessageV1 } from './LogMessageV1';
import { ILoggingClientV1 } from './ILoggingClientV1';
export declare class LoggingNullClientV1 implements ILoggingClientV1 {
    constructor(config?: any);
    readMessages(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<LogMessageV1>) => void): void;
    readErrors(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<LogMessageV1>) => void): void;
    writeMessage(correlationId: string, message: LogMessageV1, callback?: (err: any, message: LogMessageV1) => void): void;
    writeMessages(correlationId: string, messages: LogMessageV1[], callback?: (err: any) => void): void;
    clear(correlationId: string, callback?: (err: any) => void): void;
}
