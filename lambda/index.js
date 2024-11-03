const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');
const path = require('path');
const fs = require('fs');
const winston = require('winston');
const AWS = require('aws-sdk');
const {notifyFinalizedTizada} = require("./notifyFinalizedTizada");

exports.handler = async (event, context, callback) => {

    console.log(`Lambda triggered\n`);
    console.log("EVENT: \n" + JSON.stringify(event, null, 2));

    const config = require('./config');

    let { waitForValueChange } = require('./waitForValueChange');

    // Configure AWS SDK
    AWS.config.update({
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
        region: config.region,
    });

    let {uploadSVGToS3} = require('./uploadSVGToS3');
    let {initialSetup} = require('./initialSetup');

    const logger = winston.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.Console(),
        ],
    });
    logger.defaultMeta = {requestId: context.awsRequestId};

    let browser = null;
    let output = null;

    try {

        const {
            iterationCount,
            efficiency,
            selectors,
            tmpPath,
            timeout
        } = await initialSetup(event, path, fs);

        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
            timeout: 0
        });

        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(12000000);

        await page.goto(config.nestingServiceHost);

        page.on('console', msg => logger.info('PAGE LOG', {data: msg.text()}));

        const partsPath = path.join(tmpPath, 'parts.svg');
        const partsInput = await page.waitForSelector('#fileinput');
        await partsInput.uploadFile(partsPath);
        const binPath = path.join(tmpPath, 'bin.svg');
        const binInput = await page.waitForSelector('#bininput');
        await binInput.uploadFile(binPath);
        fs.rmSync(tmpPath, {recursive: true, force: true});
        const startButton = await page.waitForSelector('#start');
        await startButton.click();

        console.log("Timeout enviado:", timeout)
        console.log("IterationCount enviado:", iterationCount)
        console.log("Efficiency enviado:", efficiency)
        console.log("Context:", context)
        console.log("Event:", event)

        const result = await waitForValueChange(page, selectors, iterationCount, timeout, efficiency);
        console.log("Execution results: ", JSON.stringify(result));

        const sendButton = await page.waitForSelector('#sendresult');
        await sendButton.click();

        output = await page.evaluate(() => {
            return localStorage.getItem('svgOutput');
        });

        const data = await uploadSVGToS3(config.bucketName, output, path, fs, AWS, event.user);
        console.log(`Execution completed, sending notification to user...`);

        if (config.notifyFinalizerTizada === "true"){
            await notifyFinalizedTizada(event, result, data, config);
            console.log("Notified tizada finalizada");
        }else{
            console.log("Notification disabled", JSON.stringify(config.notifyFinalizerTizada));
        }

    } catch (error) {
        logger.info("Error occurred");
        logger.info(error.message);

        if (config.notifyFinalizerTizada === "true"){
            await notifyFinalizedTizada(event, null, null, config);
            console.log("Notified tizada finalizada with error");
        }else{
            console.log("Notification disabled", JSON.stringify(config.notifyFinalizerTizada));
        }

        return error;
    } finally {
        if (browser){
            for (const page of await browser.pages()) {
                await page.close();
            }
            await browser.close();
            logger.info("Execution ended");
        }
    }

    return output;
}
