async function notifyFinalizedTizada(event, result, data){
    const axios = require('axios');
    const config = require('config');

    const url = config.smartfactoryApiUrl;

    const parts = event.parts.map(part => part.uuid);

    const payload = {
        tizadaUUID: event.tizadaUUID,
        url: data.location,
        userUUID: event.user,
        configuration: {
            id: 1
        },
        bin: {
            uuid: event.bin.uuid,
            name: "Mesa de corte",
            height: 10,
            width: 10,
            area: 100.0
        },
        parts: parts,
        materialUtilization: result.efficiency,
        iterations: result.iterations,
        timeoutReached: false
    };

    try {
        const response = await axios.post(url + '/api/tizada/notification', payload);
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed after retries:', error.message);
    }
}

module.exports.notifyFinalizedTizada = notifyFinalizedTizada
