import getBabelRelayPlugin from 'babel-relay-plugin';
import request from 'sync-request';
import aws4 from 'aws4';

require('dotenv').load();

const {
  AWS_ACCESS_ID,
  AWS_ACCESS_SECRET,
  SERVERLESS_URL,
  AWS_REGION,
  AWS_SERVICE,
} = process.env;

const SCHEMA_URL = `${SERVERLESS_URL}/schema`;

const { headers } =
  aws4.sign(
    { service: AWS_SERVICE, region: AWS_REGION, path: '/schema' },
    { accessKeyId: AWS_ACCESS_ID, secretAccessKey: AWS_ACCESS_SECRET }
  );

console.log(`fetching GraphQL schema from: ${SCHEMA_URL}`);

const response = request('GET', SCHEMA_URL, {
  headers,
});
const schema = JSON.parse(response.getBody());

console.log('fetching GraphQL schema succcessful');

export default getBabelRelayPlugin(schema.data);
