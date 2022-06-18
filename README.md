> ⚠️ In Bearbeitung

![Titelbild](./public/images/thesis-title.jpg)

# Bachelorarbeit

Bachelorarbeit zum Thema: **Contentmanagement im Jamstack: redaktionelle Pflege von Websites in der Headless Architektur mit Nuxt 3 und Storyblok.**

Die Bachelorarbeit beschäftigt sich mit der Ausarbeitung praktischer Lösungsszenarien für die redaktionelle Pflege von Websites im Jamstack. Die erarbeiteten Lösungsszenarien sollen darstellen, wie sich die redaktionellen Aufgaben, die Entwickler aus der monolithischen Architektur gewohnt sind, im Jamstack zu lösen sind.

## Techstack

| Bereich            | Technologie                              | Notizen                                                                      |
| :----------------- | :--------------------------------------- | :--------------------------------------------------------------------------- |
| Frontend Framework | [Nuxt.js](https://v3.nuxtjs.org/)        | [Nuxt 3 (Beta) Release Candidate](https://nuxtjs.org/announcements/nuxt3-rc) |
| CSS Framework      | [Tailwind CSS](https://tailwindcss.com/) | Tailwind v3                                                                  |
| Headless CMS       | [Storyblok](https://www.storyblok.com/)  |                                                                              |
| Hosting            | [Netlify](https://netlify.com/)          | [Live Demo](https://bachelorarbeit.thenextbit.de/)                           |

---

## Setup Storyblok (optional)

### 1. Add private API key

> 💡 This step is completely optional, as a public key for API requests is integrated.

Setup `STORYBLOK_PRIVATE_KEY` environment variable inside `.env`. Get the key from the Storyblok Settings → API-Keys. This step is optional because a public key is already used.

### 2. Storyblok v2 visual editor for local development

> 💡 This step is completely optional if you have no access to Storyblok dashboard or are using Storyblok v1.

Storyblok v2 requires to be served via HTTPS. [Learn more](https://www.storyblok.com/faq/.setting-up-https-on-localhost-in-nuxt-3).

1\. Create certificate with [mkcert](https://github.com/FiloSottile/mkcert):

```bash
mkcert localhost
```

2\. Run in HTTPS:

```bash
npm run dev:https
```

---

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

Generate the website for production:

```bash
npm run generate
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
