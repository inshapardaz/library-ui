# Nawishta Library app

This is the UI for the nawishta library app. It works with the inshapardaz apis

[![Build & Deploy](https://github.com/inshapardaz/library-ui/actions/workflows/docker-image.yml/badge.svg)](https://github.com/inshapardaz/library-ui/actions/workflows/docker-image.yml)

Build, image push, and production deploy (gated behind manual approval) all run as part of this workflow.


## Environment configuration

API and main-site URLs are read at runtime, so one Docker image works in every environment.

- **Docker**: set `API_URL` and `MAIN_SITE` (required) and optionally `NODE_ENV` on the container,
  e.g. in `docker-compose`. At startup `config/docker/40-env-config.sh` writes them into
  `/env-config.js`; the container exits if a required value is missing.
- **Local dev** (`npm start`): defaults to `http://localhost:4000` / `http://localhost:4200`. To
  override, copy `.env.example` to `.env.local` and set `VITE_API_URL` / `VITE_MAIN_SITE`.
