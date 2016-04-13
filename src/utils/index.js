import { AMAZON_GATEWAY_URL, SERVERLESS_STAGE } from './../constants';

export const getServerlessEndpoint = () => `${AMAZON_GATEWAY_URL}/${SERVERLESS_STAGE}`;
