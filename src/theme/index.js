import { Badge, Card, Chip, Pagination, Tabs, createTheme } from '@mantine/core';
import { makeAccentPalette, DEFAULT_ACCENT } from './accent';

// The app's look, taken from the Nawishta paper/spine redesign: a warm paper surface, a dark
// spine-green for navigation/branding and gold as the fixed accent (buttons, links, active
// states - generated from DEFAULT_ACCENT via the same palette utility the old colour picker
// used). There is no runtime accent choice any more; the theme is static.

const FONT_FALLBACK = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

// The spine green used for the header/footer/nav chrome (see styles/appearance.css for the
// --spine/--paper/--gold custom properties those components are built from).
const SPINE = ['#eaf1ee', '#cfe0d9', '#a9c9bd', '#7fb09d', '#5a9882', '#3d7f69', '#2a6654', '#1f4a40', '#163831', '#0f2621'];

export const createAppTheme = () => createTheme({
    scale: 0.94,
    primaryColor: 'accent',
    primaryShade: { light: 6, dark: 5 },
    colors: { accent: makeAccentPalette(DEFAULT_ACCENT), spine: SPINE },
    fontFamily: `"Open Sans Variable", "Open Sans", ${FONT_FALLBACK}`,
    headings: {
        fontFamily: `"Open Sans Variable", "Open Sans", ${FONT_FALLBACK}`,
        fontWeight: '700',
        sizes: {
            h1: { fontSize: '2.125rem', lineHeight: '1.25' },
            h2: { fontSize: '1.625rem', lineHeight: '1.3' },
            h3: { fontSize: '1.25rem', lineHeight: '1.3' },
            h4: { fontSize: '1.125rem', lineHeight: '1.35' },
            h5: { fontSize: '1rem', lineHeight: '1.4' },
            h6: { fontSize: '0.875rem', lineHeight: '1.4' },
        },
    },
    defaultRadius: 'sm',
    radius: { xs: '2px', sm: '4px', md: '8px', lg: '16px', xl: '32px' },
    components: {
        Card: Card.extend({ defaultProps: { radius: 'md', withBorder: true } }),
        Badge: Badge.extend({ defaultProps: { radius: 'xl' } }),
        Chip: Chip.extend({ defaultProps: { radius: 'xl' } }),
        Pagination: Pagination.extend({ defaultProps: { radius: 'xl' } }),
        Tabs: Tabs.extend({ defaultProps: { color: 'accent' } }),
    },
});
