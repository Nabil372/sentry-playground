// doing --import instrument.mjs as this picks up more events
// https://docs.sentry.io/platforms/javascript/guides/express/install/esm/
import * as Sentry from "@sentry/node";

if (!process.env.SENTRY_DSN) {
    throw new Error("'SENTRY_DSN' env var not set");
}

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
});
