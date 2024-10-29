export const awsConfig = {
  Auth: {
    region: process.env.AWS_REGION || 'us-east-1',
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.COGNITO_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: 'LanguageLearningAPI',
        endpoint: process.env.API_GATEWAY_URL,
        region: process.env.AWS_REGION || 'us-east-1'
      }
    ]
  }
};