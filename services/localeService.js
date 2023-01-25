const LANGUAGE_KEY = 'locale';

const languages = {
    'en'  : { key:"en", locale:'en_GB', name: 'english', dir : 'ltr', flag: 'gb' },
    'ur'  : { key:"ur", locale:'uk_PK', name: 'اردو', dir : 'rtl', flag: 'pk' },
    //'pn'  : { key:"pn", locale:'pa_Arab', name: 'پنجابی - شاہ مکھی', dir : 'rtl', flag: 'pk' },
    //'png' : { key:"png", locale:'pa_Guru', name: 'ਪੰਜਾਬੀ - ਗੁਰਮੁਖੀ', dir : 'ltr', flag: 'in' },
}

const setLanguage = (i18n, newLanguage)  =>
{
    window.localStorage.setItem(LANGUAGE_KEY, newLanguage)
    i18n.changeLanguage(newLanguage)
}

const getLanguage = () => 
{
    if (typeof window !== 'undefined')
    {
        return languages[window.localStorage.getItem(LANGUAGE_KEY) ?? 'en']
    }
    
    return languages['en'];
}

const getSupportedLanguages = ()  =>{
    return languages;
}

function isRtl(language) {
    return this.getDirection(language) === 'rtl';
    }

    function getDirection(language) {
    const lang = language != null ? languages[language] : getLanguage();
    return lang.dir;
}

const localeService = { setLanguage, getLanguage, getSupportedLanguages };
export default localeService;