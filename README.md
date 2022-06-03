# Nuxt 3 Minimal Starter

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setting Up HTTPS on localhost

Storyblok v2 requires to be served via HTTPS. [Learn more](https://www.storyblok.com/faq/.setting-up-https-on-localhost-in-nuxt-3).

1\. Create certificate with [mkcert](https://github.com/FiloSottile/mkcert):

```bash
mkcert localhost
```

2\. Run in HTTPS:

```bash
npm run dev:https
```

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
