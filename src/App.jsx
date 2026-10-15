import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// UI libraries
import { DirectionProvider, Loader, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

// Local imports
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/carousel/styles.css';

import Router from "./router";
import { createAppTheme, FORCED_COLOR_SCHEME } from '@/theme';
import { selectedLanguage, selectedTheme, selectedUrduFont } from "@/store/slices/uiSlice";
import { init } from '@/store/slices/authSlice';
import If from '@/components/if';
// ------------------------------------------------------------------

function App() {
    const { t } = useTranslation();
    const lang = useSelector(selectedLanguage);
    const urduFont = useSelector(selectedUrduFont);
    const themeName = useSelector(selectedTheme);
    const theme = useMemo(() => createAppTheme(themeName), [themeName]);
    const userLoadStatus = useSelector((state) => state?.auth?.loadUserStatus)
    const dispatch = useDispatch();


    // The palette (see styles/appearance.css)
    useEffect(() => {
        document.documentElement.setAttribute('data-nw-theme', themeName);
    }, [themeName]);

    // Picks the Urdu typeface (see styles/appearance.css); only has an effect while Urdu is active
    useEffect(() => {
        document.documentElement.setAttribute('data-urdu-font', urduFont);
    }, [urduFont]);

    useEffect(() => {
        if (userLoadStatus === 'idle')
            dispatch(init());
    }, [dispatch, userLoadStatus]);

    return (
        <HelmetProvider>
            <Helmet htmlAttributes={{ lang: lang ? lang.locale : 'en' }}>
                <title>{t('app')}</title>
            </Helmet>
            <DirectionProvider >
                <MantineProvider theme={theme} defaultColorScheme="auto" forceColorScheme={FORCED_COLOR_SCHEME[themeName]}>
                    <Notifications limit={5} position="bottom-right" />
                    <ModalsProvider labels={{ confirm: t('actions.yes'), cancel: t('actions.no') }}>
                        <If condition={userLoadStatus === 'loading'}
                            elseChildren={<Router />}>
                            <div style={{ position: 'fixed', top: '50%', left: '50%' }}><Loader /></div>
                        </If>
                    </ModalsProvider>
                </MantineProvider>
            </DirectionProvider>
        </HelmetProvider>
    )
}

export default App
