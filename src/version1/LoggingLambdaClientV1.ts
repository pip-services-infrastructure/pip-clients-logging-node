let _ = require('lodash');
let os = require('os');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { CommandableLambdaClient } from 'pip-services3-aws-node';

import { LogMessageV1 } from './LogMessageV1';
import { ILoggingClientV1 } from './ILoggingClientV1';

export class LoggingLambdaClientV1 extends CommandableLambdaClient implements ILoggingClientV1 {

    constructor(config?: any) {
        super('logging');

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
        message.correlation_id = message.correlation_id || correlationId;
        message.source = message.source || os.hostname(); 

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
            message.correlation_id = message.correlation_id || correlationId;
            message.source = message.source || os.hostname(); 
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
