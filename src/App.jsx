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


    const isUrdu = lang?.key === 'ur';

    const theme = createTheme({
        scale: 0.9,
        fontFamily: isUrdu
            ? "'Noto Nastaliq Urdu', serif"
            : "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        headings: {
            fontFamily: isUrdu
                ? "'Noto Nastaliq Urdu', serif"
                : "Fraunces, Georgia, serif",
        },
        defaultRadius: 'sm',
        primaryColor: 'spine',
        colors: {
            spine: ['#eaf1ee', '#cfe0d9', '#a9c9bd', '#7fb09d', '#5a9882', '#3d7f69', '#2a6654', '#1f4a40', '#163831', '#0f2621'],
            gold: ['#fbf3e3', '#f5e4bf', '#eecf95', '#e4c990', '#d8ad5e', '#c6983f', '#b8863a', '#9c6f2f', '#7e5825', '#5f421b'],
            oxblood: ['#f6e8e7', '#e9c6c4', '#d99f9b', '#c67873', '#b4544e', '#7c2c29', '#6e2522', '#5c1f1c', '#4a1917', '#3a1312'],
        },
        components: {
            Card: {
                defaultProps: { withBorder: true, shadow: 'sm', radius: 'sm' },
                styles: { root: { backgroundColor: 'var(--paper-card)', borderColor: 'var(--nw-line)' } },
            },
            Button: {
                defaultProps: { radius: 'sm' },
            },
            Badge: {
                defaultProps: { radius: 'sm' },
            },
            Menu: {
                styles: { dropdown: { backgroundColor: 'var(--paper-card)', borderColor: 'var(--nw-line)' } },
            },
            Popover: {
                styles: { dropdown: { backgroundColor: 'var(--paper-card)', borderColor: 'var(--nw-line)' } },
            },
            Drawer: {
                styles: { content: { backgroundColor: 'var(--paper)' }, header: { backgroundColor: 'var(--paper)' } },
            },
            Modal: {
                styles: { content: { backgroundColor: 'var(--paper)' }, header: { backgroundColor: 'var(--paper)' } },
            },
            Divider: {
                styles: { root: { borderColor: 'var(--nw-line)' } },
            },
            Skeleton: {
                styles: { root: { '--skeleton-color': 'var(--paper-deep)' } },
            },
            SegmentedControl: {
                styles: {
                    root: { backgroundColor: 'var(--paper-deep)' },
                    indicator: { backgroundColor: 'var(--spine)' },
                    label: { '&[data-active]': { color: 'var(--paper)' } },
                },
            },
        },
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
            <DirectionProvider initialDirection={lang?.dir ?? 'rtl'}>
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
