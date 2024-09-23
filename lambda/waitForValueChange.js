// observe for changes in selector, resolve if value reach targetValue, reject if timeout
async function waitForValueChange(page, selectors, iterationCount, timeout, efficiency) {
    return (await page.evaluate((selectors, targetValue, timeout) => {
        return (new Promise((resolve, reject) => {
            const info_iterations = document.querySelector(selectors.info_iterations);
            const info_efficiency = document.querySelector(selectors.info_efficiency);
            const info_placed = document.querySelector(selectors.info_placed);

            // Ensure elements are available
            if (!info_iterations || !info_efficiency || !info_placed) {
                console.error('Required elements not found in the DOM');
                return reject(new Error('DOM elements not found'));
            }

            console.log(`Parts placed: ${info_placed.textContent}`);

            const observer = new MutationObserver(() => {

                if (parseFloat(info_iterations.textContent) === parseFloat(targetValue)) {
                    console.log('Max iterations reached!')
                    observer.disconnect();
                    resolve();
                }

                if (parseFloat(efficiency) >= parseFloat(info_efficiency.textContent)) {
                    console.log('Efficiency threshold reached!');
                    console.log(`Efficiency limit: ${efficiency}`);
                    console.log(`Efficiency reached: ${info_efficiency.textContent}`);
                    observer.disconnect();
                    resolve();
                }
            });
            observer.observe(info_iterations, {childList: true});
            observer.observe(info_efficiency, {childList: true});
            if (timeout) {
                setTimeout(() => {
                    observer.disconnect();
                    reject(new Error(`Timeout waiting for value change in ${selectors.info_iterations}: ${info_iterations} ${info_iterations.textContent} or ${selectors.info_efficiency}: ${info_efficiency} ${info_efficiency.textContent}`));
                    reject(new Error(`Timeout waiting for value change in ${selectors.info_iterations}: ${info_iterations} ${parseFloat(info_iterations.textContent)} or ${selectors.info_efficiency}: ${info_efficiency} ${parseFloat(info_efficiency.textContent)}`));
                }, timeout)
            }
        }))
    }, selectors, iterationCount, timeout, efficiency))
}

module.exports.waitForValueChange = waitForValueChange
