// Environment config is resolved at runtime so one built image can be deployed anywhere.
// Precedence: window.__ENV__ (written into /env-config.js by the container at startup, see
// config/docker/40-env-config.sh) -> VITE_* vars from .env files (local dev) -> localhost defaults.
const runtimeEnv = window.__ENV__ ?? {};
const buildEnv = import.meta.env ?? {};

const pick = (runtimeValue, buildValue, fallback) => runtimeValue || buildValue || fallback;

const NODE_ENV = pick(runtimeEnv.NODE_ENV, buildEnv.VITE_NODE_ENV, 'local');
const API_URL = pick(runtimeEnv.API_URL, buildEnv.VITE_API_URL, 'http://localhost:4000');
const MAIN_SITE = pick(runtimeEnv.MAIN_SITE, buildEnv.VITE_MAIN_SITE, 'http://localhost:4200');

export {
    NODE_ENV,
    API_URL,
    MAIN_SITE
}
