const supportedLngs = ['en', 'ur']

export const ni18nConfig = {
    supportedLngs,
    fallbackLng: supportedLngs,
    ns: ['common', 'header', 'library'],
    react: {
        useSuspense: false,
    },
}