module.exports = Object.freeze({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID || "dummy_key",
    secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET || "dummy_secret",
    region: process.env.AWS_S3_BUCKET_REGION || "us-east-2",
    bucketName: process.env.AWS_S3_BUCKET_NAME || "servicio-de-tizada",
    nestingServiceHost: process.env.NESTING_SERVICE_HOST || "https://svg-nest.netlify.app/",
    notifyFinalizerTizada: process.env.NOTIFY_TIZADA_FINALIZED || "false",
    smartfactoryApiUrl: process.env.SMARTFACTORY_API_URL || "http://localhost:8080",
    auth0ClientId: process.env.AUTH0_CLIENT_ID || "dummy",
    auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET || "dummy",
    auth0ApiAudience: process.env.AUTH0_API_AUDIENCE || "dummy",
    auth0Domain: process.env.AUTH0_DOMAIN || "dummy"
});
