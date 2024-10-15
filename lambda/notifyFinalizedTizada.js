async function notifyFinalizedTizada(event, result, data){
    const axios = require('axios');
    const config = require('config');

    const url = config.smartfactoryApiUrl;

    const parts = event.parts.map(part => part.uuid);

    const payload = {
        tizadaUUID: event.tizadaUUID,
        url: data.Location,
        userUUID: event.user,
        parts: parts,
        materialUtilization: result.efficiency,
        iterations: result.iterations,
        timeoutReached: false
    };

    try {
        console.log('Trying with this body:', payload)
        const response = await axios.post(url + '/api/tizada/notification', payload);
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed after retries:', error.message);
    }
}

module.exports.notifyFinalizedTizada = notifyFinalizedTizada
