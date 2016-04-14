const {
  NODE_ENV,
} = process.env;

let constants = {
  AWS_CRED: {
    accessKeyId: "AKIAJPD7SKR4YNP5YPEA",
    secretAccessKey: "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",
  },
  AMAZON_GATEWAY_URL: 'https://q0gcwefgd1.execute-api.us-east-1.amazonaws.com',
  SERVERLESS_STAGE: 'staging',
};

if (NODE_ENV === 'production') {
  constants = {
    ...constants,
    SERVERLESS_STAGE: 'production',
  };
}

console.log(constants);
export default constants;
