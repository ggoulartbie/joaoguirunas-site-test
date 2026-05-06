import * as Sentry from '@sentry/nextjs';

const PII_KEYS = /email|token|key|secret|password|authorization|cookie/i;

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,

  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  beforeSend(event) {
    if (event.request?.headers) {
      for (const key of Object.keys(event.request.headers)) {
        if (PII_KEYS.test(key)) delete event.request.headers[key];
      }
    }
    if (event.request?.cookies) event.request.cookies = {};
    // Strip full webhook payload from extra context to avoid leaking PII
    if (event.extra?.payload) event.extra.payload = '[Filtered]';
    return event;
  },

  debug: false,
});
