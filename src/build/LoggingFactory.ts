import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-commons-node';

import { DirectLogger } from '../log/DirectLogger';
import { RestLogger } from '../log/RestLogger';
import { SenecaLogger } from '../log/SenecaLogger';

import { LoggingNullClientV1 } from '../version1/LoggingNullClientV1';
import { LoggingDirectClientV1 } from '../version1/LoggingDirectClientV1';
import { LoggingRestClientV1 } from '../version1/LoggingRestClientV1';
import { LoggingSenecaClientV1 } from '../version1/LoggingSenecaClientV1';

export class LoggingFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-logging', 'factory', 'default', 'default', '1.0');
	public static DirectLoggerDescriptor = new Descriptor('pip-services-logging', 'logger', 'direct', 'default', '1.0');
	public static RestLoggerDescriptor = new Descriptor('pip-services-logging', 'logger', 'rest', 'default', '1.0');
	public static SenecaLoggerDescriptor = new Descriptor('pip-services-logging', 'logger', 'seneca', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('pip-services-logging', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-logging', 'client', 'direct', 'default', '1.0');
	public static RestClientV1Descriptor = new Descriptor('pip-services-logging', 'client', 'rest', 'default', '1.0');
	public static SenecaClientV1Descriptor = new Descriptor('pip-services-logging', 'client', 'seneca', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(LoggingFactory.DirectLoggerDescriptor, DirectLogger);
		this.registerAsType(LoggingFactory.RestLoggerDescriptor, RestLogger);
		this.registerAsType(LoggingFactory.SenecaLoggerDescriptor, SenecaLogger);

		this.registerAsType(LoggingFactory.NullClientV1Descriptor, LoggingNullClientV1);
		this.registerAsType(LoggingFactory.DirectClientV1Descriptor, LoggingDirectClientV1);
		this.registerAsType(LoggingFactory.RestClientV1Descriptor, LoggingRestClientV1);
		this.registerAsType(LoggingFactory.SenecaClientV1Descriptor, LoggingSenecaClientV1);
	}
	
}
