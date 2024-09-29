// observe for changes in selector, resolve if value reach targetValue, reject if timeout
async function waitForValueChange(page, selectors, iterationCount, timeout, efficiency) {

    const startTime = Date.now();

    return (await page.evaluate((selectors, targetValue, timeout, startTime) => {
        return (new Promise((resolve, reject) => {
            const info_iterations = document.querySelector(selectors.info_iterations);
            const info_efficiency = document.querySelector(selectors.info_efficiency);
            const info_placed = document.querySelector(selectors.info_placed);

            // Ensure elements are available
            if (!info_iterations || !info_efficiency || !info_placed) {
                console.error('Required elements not found in the DOM');
                return reject(new Error('DOM elements not found'));
            }

            console.log(`Parts placed: ${JSON.stringify(info_placed.textContent)}`);

            const observer = new MutationObserver(() => {
                const currentIterations = parseFloat(info_iterations.textContent);
                const currentEfficiency = parseFloat(info_efficiency.textContent);
                const partsPlaced = JSON.stringify(info_placed.textContent);
                if (currentIterations === parseFloat(targetValue)) {
                    console.log('Max iterations reached!')
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
                    observer.disconnect();
                    reject(new Error(`Timeout waiting for value change in ${selectors.info_iterations}: ${info_iterations.textContent} or ${selectors.info_efficiency}: ${info_efficiency.textContent}`));
                }, timeout)
            }
        }))
    }, selectors, iterationCount, timeout, efficiency))
}

module.exports.waitForValueChange = waitForValueChange
