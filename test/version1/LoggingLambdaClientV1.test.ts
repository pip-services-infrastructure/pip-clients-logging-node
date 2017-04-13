import { YamlConfigReader } from 'pip-services-commons-node';
import { LoggingClientFixtureV1 } from './LoggingClientFixtureV1';
import { LoggingLambdaClientV1 } from '../../src/version1/LoggingLambdaClientV1';

suite('LoggingLambdaClient', ()=> {
    let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
    let lambdaConfig = config.getSection('lambda');

    // Skip if connection is not configured
    if (lambdaConfig.getAsNullableString("connection.protocol") != "aws")
        return;

    let client: LoggingLambdaClientV1;
    let fixture: LoggingClientFixtureV1;

    setup((done) => {
        client = new LoggingLambdaClientV1();
        client.configure(lambdaConfig);

        fixture = new LoggingClientFixtureV1(client);

        client.open(null, done);
    });

    teardown((done) => {
        client.close(null, done);
    });

    test('Crud Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});