async function notifyFinalizedTizada(event, result){
    const axios = require('axios');
    const axiosRetry = require('axios-retry');
    const config = require('config');

    // Enable retry functionality with axios-retry
    axiosRetry(axios, {
        retries: 3, // Number of retry attempts
        retryDelay: (retryCount) => {
            console.log(`Retry attempt: ${retryCount}`);
            return retryCount * 2000; // Delay between retries (2 seconds)
        },
        retryCondition: (error) => {
            // Retry on network errors or if there is no response (e.g., timeout)
            return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === 'ECONNABORTED';
        }
    });

    const url = config.smartfactoryApiUrl;

    const parts = event.parts.map(part => part.uuid);

    const payload = {
        tizadaUUID: event.tizadaUUID,
        url: event.url,
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
        const response = await axios.post(url, payload);
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed after retries:', error.message);
    }
}

module.exports.notifyFinalizedTizada = notifyFinalizedTizada
