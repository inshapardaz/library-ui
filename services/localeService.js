const languages = {
    'en'  : { key:"en", locale:'en_GB', name: 'English', dir : 'ltr', flag: 'gb' },
    'ur'  : { key:"ur", locale:'uk_PK', name: 'اردو', dir : 'rtl', flag: 'pk' },
    //'pn'  : { key:"pn", locale:'pa_Arab', name: 'پنجابی - شاہ مکھی', dir : 'rtl', flag: 'pk' },
    //'png' : { key:"png", locale:'pa_Guru', name: 'ਪੰਜਾਬੀ - ਗੁਰਮੁਖੀ', dir : 'ltr', flag: 'in' },
}


const getLanguage = (locale) => 
{
    return languages[locale] ?? languages['en'];
}

const getSupportedLanguages = ()  =>{
    return languages;
}

const localeService = { getLanguage, getSupportedLanguages };
export default localeService;