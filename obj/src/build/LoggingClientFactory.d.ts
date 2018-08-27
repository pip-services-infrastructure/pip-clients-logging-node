import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-components-node';
export declare class LoggingClientFactory extends Factory {
    static Descriptor: Descriptor;
    static DirectLoggerDescriptor: Descriptor;
    static HttpLoggerDescriptor: Descriptor;
    static SenecaLoggerDescriptor: Descriptor;
    static NullClientV1Descriptor: Descriptor;
    static DirectClientV1Descriptor: Descriptor;
    static HttpClientV1Descriptor: Descriptor;
    static SenecaClientV1Descriptor: Descriptor;
    constructor();
}
