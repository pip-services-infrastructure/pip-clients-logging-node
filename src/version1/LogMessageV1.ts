import { LogLevel } from 'pip-services-commons-node';
import { ErrorDescription } from 'pip-services-commons-node';

export class LogMessageV1 {	
    public constructor(level: LogLevel, source: 
        string, correlationId: string, 
        error: ErrorDescription, message: string) {
    	this.time = new Date();
        this.level = level;
        this.source = source;
        this.correlation_id = correlationId;
        this.error = error;
        this.message = message;
    }

	public time: Date;
	public source: string;
	public level: LogLevel;
	public correlation_id: string;
	public error: ErrorDescription;
	public message: string;
}