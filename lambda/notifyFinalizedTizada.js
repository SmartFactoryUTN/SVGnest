async function notifyFinalizedTizada(event, result, data, config){
    const axios = require('axios');

    const url = config.smartfactoryApiUrl;

    const parts = event.parts.map(part => part.uuid);
    let payload;

    if (result){
        payload = {
            tizadaUUID: event.tizadaUUID,
            url: data.Location,
            userUUID: event.user,
            parts: parts,
            materialUtilization: result.efficiency,
            iterations: result.iterations,
            timeoutReached: false,
            status: "success"
        };
    }else{
        payload = {
            tizadaUUID: event.tizadaUUID,
            userUUID: event.user,
            status: "error"
        }
    }

    try {

        // Auth0 token endpoint and credentials
        const tokenEndpoint = `https://${config.auth0Domain}/oauth/token`;
        const clientId = config.auth0ClientId;
        const clientSecret = config.auth0ClientSecret;
        const audience = config.auth0ApiAudience;

        // Generate an access token
        const tokenResponse = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                audience: audience,
                grant_type: 'client_credentials',
            }),
        });

        if (!tokenResponse.ok) {
            throw new Error(`Failed to obtain access token: ${tokenResponse.statusText}`);
        }

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        const config = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };


        console.log('Trying with this body:', payload)
        const response = await axios.post(url + '/api/tizada/notification', payload, config);
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed after retries:', error.message);
    }
}

module.exports.notifyFinalizedTizada = notifyFinalizedTizada
