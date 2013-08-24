var lustyEndpoint = process.env.API_LUSTY_ENDPOINT || "http://localhost:4321";

module.exports = {
  // web server config
  http: process.env.HTTP || "spdy",
  apiVersion: 0,

  port: process.env.PORT || 4444,
  sessionSecret: process.env.SESSION_SECRET || "colonies",
  environment: process.env.NODE_ENV || "development",

  sslKey: process.env.SSL_KEY_PATH ||  __dirname + "/keys/spdy-key.key",
  sslCert: process.env.SSL_CERT_PATH || __dirname + "/keys/spdy-key.crt",

  googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
  googleAnalyticsDomain: process.env.GOOGLE_ANALYTICS_DOMAIN,

  // api config
  dataAdapter: process.env.DATA_ADAPTER || "memory",

  apiEndpoints: {
    tokens: "#{oauthEndpoint}/tokens:"
  },

  // exoplay config
  applicationID: process.env.APPLICATION_ID ||  "123",
  applicationToken: process.env.APPLICATION_TOKEN || "abc123"
};
