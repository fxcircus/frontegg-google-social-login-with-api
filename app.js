const express = require('express');
const axios = require('axios');
const queryString = require('querystring');
const fs = require('fs');

const app = express();
const port = 3000;

// replace with your 'Domain name' from Frontegg Portal ➜ [ENVIRONMENT] ➜ Env Settings ➜ Domains:
const vendorHost = 'YOUR_FRONTEGG_VENDOR_HOST'

// Replace with your Frontegg vendor token and client ID:
const fronteggBearerToken = 'YOUR_FRONTEGG_BEARER_TOKEN'; // https://docs.frontegg.com/reference/authenticate_vendor
const fronteggClientId = 'YOUR_FRONT_CLIENT_ID';

// Replace with your Google API credentials:
const googleClientId = 'YOUR_GOOGLE_CLIENT_ID';
const googleClientSecret = 'YOUR_GOOGLE_CLIENT_SECRET';
const googleRedirectUri = `http://localhost:${port}/auth/google/callback`;

const fronteggGoogleConfigEndpoint = 'https://api.frontegg.com/identity/resources/sso/v2'; // Frontegg endpoint for Google login config
const googleAuthEndpoint = 'https://accounts.google.com/o/oauth2/v2/auth'; // Google API endpoints

app.get('/', (req, res) => {
  res.send('Welcome to the social login example.\nVisit /auth/google to start Google authentication.');
});

// Step 1: Get the Google config from Frontegg
app.get('/auth/google', async (req, res) => {
  try {
    const fronteggConfigResponse = await axios.get(fronteggGoogleConfigEndpoint, {
      headers: {
        Authorization: `Bearer ${fronteggBearerToken}`,
        'Cookie': `fe_device_${fronteggClientId}=your-device-id`,
      },
    });

    const googleConfig = fronteggConfigResponse.data.find(config => config.type === 'google');

    // Step 2: Redirect to Google authentication using values from the response in step 1
    const state = encodeURIComponent(JSON.stringify({ provider: 'google', action: 'login' }));
    const scope = encodeURIComponent('https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email');
    const googleAuthUrl = `${googleAuthEndpoint}?response_type=code&scope=${scope}&redirect_uri=${googleRedirectUri}&client_id=${googleClientId}&include_granted_scopes=true&state=${state}`;
    res.redirect(googleAuthUrl);
  } catch (error) {
    console.error('Error getting Google config from Frontegg:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Step 3: Get Response from Google after login
app.get('/auth/google/callback', async (req, res) => {
    const { code, state } = req.query;
  
    try {
      // Step 4: Google postlogin
      const fronteggGooglePostLoginEndpoint = `https://${vendorHost}.frontegg.com/frontegg/identity/resources/auth/v1/user/sso/google/postlogin?code=${code}&state=${state}&redirectUri=${googleRedirectUri}`;
      const postLoginResponse = await axios.post(fronteggGooglePostLoginEndpoint, null, {
        headers: {
          Authorization: `Bearer ${fronteggBearerToken}`,
        },
      });
  
      // Log the response
      console.log('Response from Google postlogin:', postLoginResponse.data);
  
      res.send('Google login successful!');
    } catch (error) {
      console.error('Error during Google postlogin:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
