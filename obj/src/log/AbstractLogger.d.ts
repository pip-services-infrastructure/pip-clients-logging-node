import { ConfigParams } from 'pip-services-commons-node';
import { IReconfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';
import { LogLevel } from 'pip-services-commons-node';
import { Logger } from 'pip-services-commons-node';
import { LogMessageV1 } from '../version1/LogMessageV1';
import { ILoggingClientV1 } from '../version1/ILoggingClientV1';
export declare abstract class AbstractLogger extends Logger implements IReconfigurable, IReferenceable, IOpenable {
    private static readonly _defaultInterval;
    protected _client: ILoggingClientV1;
    protected _cache: LogMessageV1[];
    protected _interval: number;
    protected _dumpCurl: any;
    constructor(client: ILoggingClientV1);
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    isOpened(): boolean;
    open(correlationId: string, callback?: (err: any) => void): void;
    close(correlationId: string, callback?: (err: any) => void): void;
    protected write(level: LogLevel, correlationId: string, ex: Error, message: string): void;
    clear(): void;
    dump(): void;
}