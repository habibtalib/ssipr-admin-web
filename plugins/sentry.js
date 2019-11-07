import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

Sentry.init({
  dsn: 'https://e8c169be199149e1b102c63216dffdb4@sentry.io/1766678',
  integrations: [new Integrations.Vue({ Vue, attachProps: true })]
})
