# Google Social Login with Frontegg APIs
Implementation of [Google social Login](https://docs.frontegg.com/docs/google-login) with Frontegg APIs

## How to run

1. Open your Frontegg account and follow the instructions on our [Google social Login](https://docs.frontegg.com/docs/google-login) doc

2. Open `App.js`, add your env params

```
// replace with your 'Domain name' from Frontegg Portal ➜ [ENVIRONMENT] ➜ Env Settings ➜ Domains:
const vendorHost = 'YOUR_FRONTEGG_VENDOR_HOST'

// Replace with your Frontegg vendor token and client ID:
const fronteggBearerToken = 'YOUR_FRONTEGG_BEARER_TOKEN'; // https://docs.frontegg.com/reference/authenticate_vendor
const fronteggClientId = 'YOUR_FRONT_CLIENT_ID';

// Replace with your Google API credentials:
const googleClientId = 'YOUR_GOOGLE_CLIENT_ID';
const googleClientSecret = 'YOUR_GOOGLE_CLIENT_SECRET';
```

3. Run `npm install` and then `npm start`
4. Open your browser and navigate to `http://localhost:3000`. Authenticate with your Google account.

### Sample response after successful exectution
```
Response from Google postlogin: {
  email: '[YOUR_EMAIL]',
  isNewUser: false,
  mfaRequired: false,
  accessToken: '[BEARER_TOKEN]',
  tokenType: 'bearer',
  refreshToken: '[REFRESH_TOKEN_VALUE]',
  expiresIn: 86400,
  expires: 'Fri, 08 Mar 2024 14:43:02 GMT',
  userId: '[USER_ID]',
  name: '[USER_NAME]',
  tenantId: '[TENANT_ID}'
}
```
