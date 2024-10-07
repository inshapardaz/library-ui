import { createSlice } from "@reduxjs/toolkit";

// 3rd party imports
//----------------------------------------

const detectedLanguage = window.localStorage.i18nextLng ?? "ur";

export const languages = {
    en: {
        key: "en",
        locale: "en_GB",
        name: "English",
        dir: "ltr",
        isRtl: false,
    },
    ur: {
        key: "ur",
        locale: "ur_PK",
        name: "اردو",
        dir: "rtl",
        isRtl: true
    },
};

const lang = languages[detectedLanguage];
if (lang){
    document.querySelector("html").setAttribute("dir", lang.dir);
    document.querySelector("html").setAttribute("lang", lang.locale);
    document.querySelector("body").setAttribute("dir", lang.dir);
}

export const uiSlice = createSlice({
    name: "ui",
    initialState: {
        mode: window.localStorage.uiMode ?? "light",
        locale: detectedLanguage,
    },
    reducers: {
        toggleUiMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
            window.localStorage.setItem("uiMode", state.mode);
        },
        setUiMode: (state, action) => {
            window.localStorage.setItem("uiMode", action.payload);
        },
        setLocale: (state, action) => {
            state.locale = action.payload;
            window.localStorage.i18nextLng = action.payload;
            const lang = languages[action.payload];
            if (lang){
                document.querySelector("html").setAttribute("dir", lang.dir);
                document.querySelector("html").setAttribute("lang", lang.locale);
                document.querySelector("body").setAttribute("dir", lang.dir);
            }
        },
    },
});

export const selectedLanguage = (state) => languages[state.ui.locale];
export const { toggleUiMode, setLocale, setUiMode } = uiSlice.actions;
