# Bachelorarbeit

Bachelorarbeit zum Thema: **Contentmanagement im Jamstack: redaktionelle Pflege von Websites in der Headless Architektur**

Die Bachelorarbeit beschäftigt sich mit der Ausarbeitung praktischer Lösungsszenarien für die redaktionelle Pflege von Websites im Jamstack. Die erarbeiteten Lösungsszenarien sollen darstellen, wie sich die redaktionellen Aufgaben, die Entwickler aus der monolithischen Architektur gewohnt sind, im Jamstack zu lösen sind.

## Techstack

| Bereich       | Technologie                              | Notizen                                                                      |
| :------------ | :--------------------------------------- | :--------------------------------------------------------------------------- |
| Frontend      | [Nuxt.js](https://v3.nuxtjs.org/)        | [Nuxt 3 (Beta) Release Candidate](https://nuxtjs.org/announcements/nuxt3-rc) |
| CSS Framework | [Tailwind CSS](https://tailwindcss.com/) | Tailwind v3                                                                  |
| Headless CMS  | [Storyblok](https://www.storyblok.com/)  |                                                                              |
| Hosting       | [Netlify](https://netlify.com/)          | [Live Demo](https://bachelor-thesis.netlify.app/)                            |

## Setup Storyblok

### 1. Connect API

Environment variable `STORYBLOK_ACCESS_TOKEN` needed.

### 2. Storyblok v2 visual editor

Storyblok v2 requires to be served via HTTPS. [Learn more](https://www.storyblok.com/faq/.setting-up-https-on-localhost-in-nuxt-3).

1\. Create certificate with [mkcert](https://github.com/FiloSottile/mkcert):

```bash
mkcert localhost
```

2\. Run in HTTPS:

```bash
npm run dev:https
```

## Setup Nuxt

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

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
