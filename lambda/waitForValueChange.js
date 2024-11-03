// observe for changes in selector, resolve if value reach targetValue, resolve with current data if timeout
async function waitForValueChange(page, selectors, iterationCount, timeout, efficiency) {

    const startTime = Date.now();

    return (await page.evaluate((selectors, targetValue, timeout, startTime) => {
        return (new Promise((resolve) => {
            const info_iterations = document.querySelector(selectors.info_iterations);
            const info_efficiency = document.querySelector(selectors.info_efficiency);
            const info_placed = document.querySelector(selectors.info_placed);

            // Ensure elements are available
            if (!info_iterations || !info_efficiency || !info_placed) {
                console.error('Required elements not found in the DOM');
                return resolve({
                    iterations: null,
                    efficiency: null,
                    partsPlaced: null,
                    timeTranscurred: Date.now() - startTime,
                    message: 'DOM elements not found'
                });
            }

            console.log(`Parts placed: ${JSON.stringify(info_placed.textContent)}`);

            const observer = new MutationObserver(() => {
                const currentIterations = parseFloat(info_iterations.textContent);
                const currentEfficiency = parseFloat(info_efficiency.textContent);
                const partsPlaced = JSON.stringify(info_placed.textContent);
                if (currentIterations === parseFloat(targetValue)) {
                    console.log('Max iterations reached!');
                    observer.disconnect();
                    resolve({
                        iterations: currentIterations,
                        efficiency: currentEfficiency,
                        partsPlaced: partsPlaced,
                        timeTranscurred: Date.now() - startTime
                    });
                }

                if (parseFloat(efficiency) >= currentEfficiency) {
                    console.log('Efficiency threshold reached!');
                    console.log(`Efficiency limit: ${efficiency}`);
                    console.log(`Efficiency reached: ${currentEfficiency}`);
                    observer.disconnect();
                    resolve({
                        iterations: currentIterations,
                        efficiency: currentEfficiency,
                        partsPlaced: partsPlaced,
                        timeTranscurred: Date.now() - startTime
                    });
                }
            });
            observer.observe(info_iterations, {childList: true});
            observer.observe(info_efficiency, {childList: true});

            if (timeout) {
                setTimeout(() => {
                    const currentIterations = parseFloat(info_iterations.textContent);
                    const currentEfficiency = parseFloat(info_efficiency.textContent);
                    const partsPlaced = JSON.stringify(info_placed.textContent);
                    console.log('Timeout reached. Resolving with current data.');
                    observer.disconnect();
                    resolve({
                        iterations: currentIterations,
                        efficiency: currentEfficiency,
                        partsPlaced: partsPlaced,
                        timeTranscurred: Date.now() - startTime,
                        message: 'Timeout reached'
                    });
                }, timeout);
            }
        }));
    }, selectors, iterationCount, timeout, efficiency));
}

module.exports.waitForValueChange = waitForValueChange;
