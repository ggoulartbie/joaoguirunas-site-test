import * as Sentry from '@sentry/nextjs';

const PII_KEYS = /email|token|key|secret|password|authorization|cookie/i;

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,

  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  beforeSend(event) {
    if (event.request?.headers) {
      for (const key of Object.keys(event.request.headers)) {
        if (PII_KEYS.test(key)) delete event.request.headers[key];
      }
    }
    if (event.request?.cookies) event.request.cookies = {};
    return event;
  },

  debug: false,
});
