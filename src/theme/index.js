import { Badge, Card, Chip, Pagination, Tabs, createTheme } from '@mantine/core';
import { makeAccentPalette } from './accent';

// The app's look, taken from the Nawishta design: Mantine's own gray scale, Open Sans, a
// small radius scale and a user-chosen accent colour (see ./accent.js). The accent is the only
// part that changes at runtime, so the theme is rebuilt from it.

const FONT_FALLBACK = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export const createAppTheme = (accent) => createTheme({
    scale: 0.94,
    primaryColor: 'accent',
    primaryShade: { light: 6, dark: 5 },
    colors: { accent: makeAccentPalette(accent) },
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
