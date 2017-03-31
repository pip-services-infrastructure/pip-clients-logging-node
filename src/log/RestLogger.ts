import { AbstractLogger } from './AbstractLogger';
import { LoggingRestClientV1 } from '../version1/LoggingRestClientV1';

export class RestLogger extends AbstractLogger {
    public constructor() {
        super(new LoggingRestClientV1());
    }
}