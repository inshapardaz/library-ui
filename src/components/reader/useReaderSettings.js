import { useCallback, useState } from "react";
//---------------------------------------------

const STORAGE_KEY = "library-ui:ebook-reader-settings";

const DEFAULT_SETTINGS = {
    theme: "light",
    fontFamily: "serif",
    fontSize: 16,
    justify: true,
    lineSpacing: 1.5,
    letterSpacing: 0,
    wordSpacing: 0,
    margin: 32,
    columns: 1,
    scroll: false,
    showPageDivider: false,
    invertImagesInDarkMode: true,
    pdfZoom: 100,
};

const loadSettings = () => {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
    } catch {
        return DEFAULT_SETTINGS;
    }
};

// qari's <Reader> is a fully controlled component for theme/font/layout: it never keeps
// its own state for these, it only reports changes via `onSettingsChange` and expects the
// host app to persist them and feed them back in as props (see @inshapardaz/qari's README,
// "Listening for Settings Changes"). Without a hook like this wiring both directions, every
// change made in the reader's own settings panel is silently discarded on next render.
const useReaderSettings = () => {
    const [settings, setSettings] = useState(loadSettings);

    const updateSettings = useCallback((changes) => {
        setSettings((prev) => {
            const next = { ...prev, ...changes };
            try {
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            } catch {
                // Ignore persistence failures (e.g. private browsing storage limits) - the
                // setting still applies for the rest of this session via component state.
            }
            return next;
        });
    }, []);

    return { settings, updateSettings };
};

export default useReaderSettings;
