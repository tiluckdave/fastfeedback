import pino from 'pino';
import { logflarePinoVercel } from 'pino-logflare';

const { stream, send } = logflarePinoVercel({
    apiKey: process.env.NEXT_PUBLIC_LOGFLARE_API_KEY,
    sourceToken: process.env.NEXT_PUBLIC_LOGFLARE_SOURCE,
});

const logger = pino(
    {
        browser: {
            transmit: {
                send: send
            }
        },
        level: 'debug',
        base: {
            env: process.env.ENV || 'ENV not set',
            revision: process.env.VERCEL_GITHUB_COMMIT_SHA
        }
    },
    stream
);

const formatObjectKeys = (headers) => {
    const keyValues = {};

    Object.keys(headers).map((key) => {
        const newKey = key.replace(/-/g, '_');
        keyValues[ newKey ] = headers[ key ];
    });

    return keyValues;
};

export { logger, formatObjectKeys };