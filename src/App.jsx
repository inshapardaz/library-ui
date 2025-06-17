import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// UI libraries
import { createTheme, DirectionProvider, Loader, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

// Local imports
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/carousel/styles.css';

import Router from "./router";
import { selectedLanguage } from "@/store/slices/uiSlice";
import { init } from '@/store/slices/authSlice';
import If from '@/components/if';
// ------------------------------------------------------------------

function App() {
    const { t } = useTranslation();
    const lang = useSelector(selectedLanguage);
    const userLoadStatus = useSelector((state) => state?.auth?.loadUserStatus)
    const dispatch = useDispatch();


    const theme = createTheme({
        // fontFamily: 'MehrNastaleeq, Segoe UI, sans-serif',
        scale: 0.9
    });

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
                <MantineProvider theme={theme}>
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
