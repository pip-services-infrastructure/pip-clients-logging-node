import { ConfigParams } from 'pip-services3-commons-node';
import { IReconfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { IOpenable } from 'pip-services3-commons-node';
import { LogLevel } from 'pip-services3-components-node';
import { Logger } from 'pip-services3-components-node';
import { LogMessageV1 } from '../version1/LogMessageV1';
import { ILoggingClientV1 } from '../version1/ILoggingClientV1';
export declare abstract class AbstractLogger extends Logger implements IReconfigurable, IReferenceable, IOpenable {
    private static readonly _defaultInterval;
    protected _client: ILoggingClientV1;
    protected _cache: LogMessageV1[];
    protected _interval: number;
    protected _dumpCurl: any;
    protected _source: string;
    constructor(client: ILoggingClientV1);
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    isOpen(): boolean;
    open(correlationId: string, callback?: (err: any) => void): void;
    close(correlationId: string, callback?: (err: any) => void): void;
    protected write(level: LogLevel, correlationId: string, ex: Error, message: string): void;
    clear(): void;
    dump(): void;
}
