let _ = require('lodash');
let os = require('os');

import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableHttpClient } from 'pip-services-net-node';

import { LogMessageV1 } from './LogMessageV1';
import { ILoggingClientV1 } from './ILoggingClientV1';

export class LoggingHttpClientV1 extends CommandableHttpClient implements ILoggingClientV1 {

    constructor(config?: any) {
        super('v1/logging');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
        
    public readMessages(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<LogMessageV1>) => void) {
        this.callCommand(
            'read_messages',
            correlationId,
            {
                filter: filter,
                paging: paging
            },
            callback
        );
    }

    public readErrors(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<LogMessageV1>) => void) {
        this.callCommand(
            'read_errors',
            correlationId,
            {
                filter: filter,
                paging: paging
            },
            callback
        );
    }

    public writeMessage(correlationId: string, message: LogMessageV1,
        callback?: (err: any, message: LogMessageV1) => void) {

        message.time = message.time || new Date();
        message.source = message.source || os.hostname(); 
        message.correlation_id = message.correlation_id || correlationId;

        this.callCommand(
            'write_message',
            correlationId,
            {
                message: message
            }, 
            callback
        );
    }

    public writeMessages(correlationId: string, messages: LogMessageV1[],
        callback?: (err: any) => void) {

        _.each(messages, (message) => {
            message.time = message.time || new Date();
            message.source = message.source || os.hostname(); 
            message.correlation_id = message.correlation_id || correlationId;
        });

        this.callCommand(
            'write_messages',
            correlationId,
            {
                messages: messages
            }, 
            callback
        );
    }

    public clear(correlationId: string, callback?: (err: any) => void) {

        this.callCommand(
            'clear',
            correlationId,
            null, 
            callback
        );
    }
}
