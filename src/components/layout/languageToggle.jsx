import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { Button } from '@mantine/core';

// Local Imports
import { languages, selectedLanguage, setLocale } from '@/store/slices/uiSlice';
//----------------------------------------------

// One button that switches to the other language and is labelled with that language's name
// ("English" while reading Urdu, "اردو" while reading English).
const LanguageToggle = () => {
    const dispatch = useDispatch();
    const { i18n, t } = useTranslation();
    const current = useSelector(selectedLanguage);
    const other = Object.values(languages).find((language) => language.key !== current?.key) ?? languages.en;

    const onClick = () => {
        i18n.changeLanguage(other.key);
        dispatch(setLocale(other.key));
    };

    return (
        <Button variant="light" onClick={onClick} aria-label={t('appearance.language')} lang={other.key}>
            {other.name}
        </Button>
    );
};

export default LanguageToggle;
