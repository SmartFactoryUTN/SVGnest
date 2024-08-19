const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');
const path = require('path');
const fs = require('fs');
const {initialSetup, printStatistics, waitForValueChange} = require('utils');
const winston = require('winston');

exports.handler = async (event, context, callback) => {

    const logger = winston.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.Console(),
        ],
    });
    logger.defaultMeta = {requestId: context.awsRequestId};
    logger.info("Dummy message");

    let browser = null;
    let output = null;

    try {

        logger.info("Before setup");
        const {
            initialCpuUsage,
            initialMemoryUsage,
            startTime,
            iterationCount,
            efficiency,
            selectors,
            tmpPath
        } = initialSetup();
        logger.info("After setup");

        logger.info("Before browser");
        browser = await puppeteer.launch({
            args: [
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-setuid-sandbox',
                '--no-first-run',
                '--no-sandbox',
                '--no-zygote',
                '--deterministic-fetch',
                '--disable-features=IsolateOrigins',
                '--disable-site-isolation-trials',
            ],
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: true,
            ignoreHTTPSErrors: true,
            protocolTimeout: 12000000,
            timeout: 20000000
        });
        logger.info("After browser");

        const page = await browser.newPage();

        await page.goto('https://svg-nest.netlify.app/', {timeout: 0});

        page.on('console', msg => logger.info('PAGE LOG', {data: msg.text()}));
        page.setDefaultNavigationTimeout(12000000);

        const partsPath = path.join(tmpPath, 'parts.svg');
        const partsInput = await page.waitForSelector('#fileinput');
        await partsInput.uploadFile(partsPath);
        const binPath = path.join(tmpPath, 'bin.svg');
        const binInput = await page.waitForSelector('#bininput');
        await binInput.uploadFile(binPath);
        fs.rmSync(tmpPath, {recursive: true, force: true});
        const startButton = await page.waitForSelector('#start');
        await startButton.click();

        let defaultIterationCount = 10;
        logger.info("Before waitForValueChange");
        await waitForValueChange(page, selectors, iterationCount || defaultIterationCount, 0, efficiency, logger);
        logger.info("After waitForValueChange");
        logger.info("Before sendButton");
        const sendButton = await page.waitForSelector('#sendresult');
        await sendButton.click();
        logger.info("After sendButton click");

        output = await page.evaluate(() => {
            return localStorage.getItem('svgOutput');
        });
        logger.info("After output");

        await printStatistics(initialCpuUsage, initialMemoryUsage, startTime, logger);
        logger.info("After printStatistics");

        logger.info("Chromium:", await browser.version());
        logger.info("Page Title:", await page.title());
        logger.info("SVG Output:", output);

        await page.close();
        await browser.close();
    } catch (error) {
        logger.info("Error message");
        throw new Error(error.message);
    } finally {
        logger.info("Finally message");
        if (browser !== null) {
            await browser.close();
        }
    }
    logger.info("Before callback");
    return callback(null, output);
}
