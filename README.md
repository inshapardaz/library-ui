# Nawishta Library app

This is the UI for the nawishta library app. It works with the inshapardaz apis

[![Build & Deploy](https://github.com/inshapardaz/library-ui/actions/workflows/docker-image.yml/badge.svg)](https://github.com/inshapardaz/library-ui/actions/workflows/docker-image.yml)

Build, image push, and production deploy (gated behind manual approval) all run as part of this workflow.


## Environment configuration

API and main-site URLs are read at runtime, so one Docker image works in every environment.

- **Docker**: the image defaults to production (`API_URL=https://api.nawishta.co.uk`,
  `MAIN_SITE=https://www.nawishta.co.uk`, `NODE_ENV=production`). Override them on the container
  for any other environment, e.g. in the dev `docker-compose`. At startup
  `config/docker/40-env-config.sh` writes them into `/env-config.js`; the container exits if
  `API_URL` or `MAIN_SITE` is explicitly set to an empty value.
- **Links to the other apps** (the logo goes to the main site; the header's app switcher lists the
  rest): `MAIN_SITE`, `LIBRARIES_URL`, `LIBRARY_EDITOR_URL` and `DICTIONARY_URL`. They default to the
  production sites (`https://libraries.nawishta.co.uk`, `https://editor.nawishta.co.uk`,
  `https://dictionary.nawishta.co.uk`) and can be overridden per environment like the values above.
- **Local dev** (`npm start`): defaults to `http://localhost:4000` / `http://localhost:4200`. To
  override, copy `.env.example` to `.env.local` and set `VITE_API_URL` / `VITE_MAIN_SITE` (and `VITE_LIBRARIES_URL` / `VITE_LIBRARY_EDITOR_URL` /
  `VITE_DICTIONARY_URL` for the app links).
