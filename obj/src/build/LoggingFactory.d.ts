import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-commons-node';
export declare class LoggingFactory extends Factory {
    static Descriptor: Descriptor;
    static DirectLoggerDescriptor: Descriptor;
    static RestLoggerDescriptor: Descriptor;
    static SenecaLoggerDescriptor: Descriptor;
    static NullClientV1Descriptor: Descriptor;
    static DirectClientV1Descriptor: Descriptor;
    static RestClientV1Descriptor: Descriptor;
    static SenecaClientV1Descriptor: Descriptor;
    constructor();
}
