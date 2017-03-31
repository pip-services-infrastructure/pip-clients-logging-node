import { AbstractLogger } from './AbstractLogger';
import { LoggingSenecaClientV1 } from '../version1/LoggingSenecaClientV1';

export class SenecaLogger extends AbstractLogger {
    public constructor() {
        super(new LoggingSenecaClientV1());
    }
}