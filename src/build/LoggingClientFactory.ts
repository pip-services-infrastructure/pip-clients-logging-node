import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-components-node';

import { DirectLogger } from '../log/DirectLogger';
import { HttpLogger } from '../log/HttpLogger';
import { SenecaLogger } from '../log/SenecaLogger';

import { LoggingNullClientV1 } from '../version1/LoggingNullClientV1';
import { LoggingDirectClientV1 } from '../version1/LoggingDirectClientV1';
import { LoggingHttpClientV1 } from '../version1/LoggingHttpClientV1';
import { LoggingSenecaClientV1 } from '../version1/LoggingSenecaClientV1';

export class LoggingClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-logging', 'factory', 'default', 'default', '1.0');
	public static DirectLoggerDescriptor = new Descriptor('pip-services-logging', 'logger', 'direct', 'default', '1.0');
	public static HttpLoggerDescriptor = new Descriptor('pip-services-logging', 'logger', 'http', 'default', '1.0');
	public static SenecaLoggerDescriptor = new Descriptor('pip-services-logging', 'logger', 'seneca', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('pip-services-logging', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-logging', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-logging', 'client', 'http', 'default', '1.0');
	public static SenecaClientV1Descriptor = new Descriptor('pip-services-logging', 'client', 'seneca', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(LoggingClientFactory.DirectLoggerDescriptor, DirectLogger);
		this.registerAsType(LoggingClientFactory.HttpLoggerDescriptor, HttpLogger);
		this.registerAsType(LoggingClientFactory.SenecaLoggerDescriptor, SenecaLogger);

		this.registerAsType(LoggingClientFactory.NullClientV1Descriptor, LoggingNullClientV1);
		this.registerAsType(LoggingClientFactory.DirectClientV1Descriptor, LoggingDirectClientV1);
		this.registerAsType(LoggingClientFactory.HttpClientV1Descriptor, LoggingHttpClientV1);
		this.registerAsType(LoggingClientFactory.SenecaClientV1Descriptor, LoggingSenecaClientV1);
	}
	
}
