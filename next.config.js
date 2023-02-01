module.exports = {
    i18n: {
        locales: ['en', 'ur'],
        defaultLocale: 'en',
      },
      images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
          },
          {
            protocol: 'https',
            hostname: 's3.tebi.io',
          },
        ],
      },
}

