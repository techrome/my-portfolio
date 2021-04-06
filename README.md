# Introduction

This project was built with Next.js and Storyblok CMS.

I wanted it to be as much decoupled from an actual data as possible. That's why I used an external CMS. You can even build your own portfolio if you follow the same content structure as used in this application. More about that in "Configure application for yourself" section.

## Important: you must read `next-translate` docs if you want to develop this application!

## Getting Started

Setup process:

- Install Node version 10 | 12 | >=14
- run `yarn`
- for development, run `yarn dev`
- for production, run `yarn prod`
- to analyze bundle size, run `yarn analyze`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages_WORK/index.js`. The page auto-updates as you edit the file.

## Environment file config

You have `.env` file which is an example file (all environments). You can also create `.env.development` (development environment) and `.env.production` (production environment), but currently I don't use those.

When configuring, you should create an `.env.local` file where all your secrets will be. This will override all others `.env`, `.env.development` and `.env.production` files.

Also, when you want to expose your variable to the browser, you have to prepend it with `NEXT_PUBLIC_` prefix, i.e `NEXT_PUBLIC_API_URL=https://blabla.com`

More info at: [https://nextjs.org/docs/basic-features/environment-variables](https://nextjs.org/docs/basic-features/environment-variables)

# Configure application for yourself

## General information

There will be some issues for fully configuring for yourself:

- Because the application uses multi-language routing (by default supports EN, RU and KA), you should accommodate for the languages you want to support.
  1.  Inside `i18n.json` change `locales` array to language set you want
  2.  Remove the locales you don't use from `locales` folder
  3.  Inside `components/WithLayout/navbar.js` you should remove unused language objects from `languages` array add for the languages you gonna use
  4.  Inside `components/CommonHead/index.js` you should remove `link rel="alternate"` tags for languages you don't use and add for the languages you gonna use
  5.  Inside `components/ErrorBoundaryFallback/index.js` you should remove language objects from `locales` for languages you don't use and add for the languages you gonna use
  6.  By default there are 2 fonts (Noto Sans and Noto Sans Georgian) which, combined, support Latin, Cyrillic and Georgian alphabets. You should change these fonts to accommodate for your language needs. To change font files, go to `public/fonts` and remove/add necessary font files. Then, change their locations inside `styles/globals.css` (also, their names inside `font-family`) and names in `config/theme.js` inside `typography -> fontFamily`
- It's better to keep the default language as `en` because I literally hardcoded it a few times throughout the code and am too lazy to change it to a separate variable
- To change favicon of the website, go to `public` folder and change `apple-touch-icon.png`, `favicon-16x16.png`, `favicon-32x32.png` files to your pictures (but keep the same file names)

## Making sense of `.env` file

| Field name                         | Description                                                                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| NEXT_PUBLIC_API_URL                | The Storyblok api main url. You mostly don't need to change it                                                                 |
| NEXT_PUBLIC_API_TOKEN              | Your Storyblok public token of the space. There's no way it should be secret because it's used in the client side all the time |
| NEXT_PUBLIC_API_INFO_PART          | The name of you main info blok                                                                                                 |
| NEXT_PUBLIC_API_PROJECTS_LIST_PART | The name of you projects folder                                                                                                |
| NEXT_PUBLIC_WEBSITE_URL            | Url of your website                                                                                                            |
| NEXT_PUBLIC_WEBSITE_NAME           | Name of your website                                                                                                           |

## Data structure of Storyblok

#### Main info (Name, Profession, Skills, Contacts, etc.)

| Field name       | Type                                             | Required | Translatable | Description                                                                                                                                            |
| ---------------- | ------------------------------------------------ | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| avatar           | Asset - Images                                   | yes      | -            | Image used when sharing the page on social media                                                                                                       |
| full_name        | Text                                             | yes      | yes          | Full name of the person                                                                                                                                |
| profession       | Text                                             | yes      | yes          | Profession                                                                                                                                             |
| skills           | Text                                             | yes      | -            | The skills. You should separate each skill with value provided inside `skills_separator`. E.g `Next.js--React.js` where the separator is `--`          |
| skills_separator | Text                                             | yes      | -            | Text by which `skills` will be split                                                                                                                   |
| contacts         | Blocks - Only `contact` component to be inserted | yes      | -            | Array of `contact` Blocks (more about that in Contact section)                                                                                         |
| about_me         | Plugin - wysiwyg-tinymce                         | yes      | yes          | Info about the person. Is an HTML editor                                                                                                               |
| description      | Text                                             | yes      | yes          | Description used when sharing the page on social media or in search results. Goes to `property="description"` and `property="og:description"` meta tag |

#### Contact

| Field name | Type           | Required | Translatable | Description                                                  |
| ---------- | -------------- | -------- | ------------ | ------------------------------------------------------------ |
| url        | Text           | yes      | -            | Link                                                         |
| title      | Text           | yes      | -            | Title                                                        |
| icon       | Asset - Images | yes      | -            | Icon (should be `.svg` type and support `fill` CSS property) |

#### Project

| Field name | Type                     | Required | Translatable | Description                                      |
| ---------- | ------------------------ | -------- | ------------ | ------------------------------------------------ |
| image      | Asset - Images           | yes      | -            | Image (must be square to be displayed properly)  |
| title      | Text                     | yes      | yes          | Title                                            |
| url        | Link                     | -        | -            | Link to the website                              |
| code_url   | Link                     | -        | -            | Link to the source code                          |
| details    | Plugin - wysiwyg-tinymce | -        | yes          | Detail info about the project. Is an HTML editor |

# Annoying issues

### Flash of light mode

I tried using CSS variables for this and while it worked to some degree, it was completely incompatible with Material UI components, because many of them depended on calculating colors dynamically with JavaScript so I had to leave it to determine the color theme only after hydration. Sad :(

### Using `index: 1` with `makeStyles` function

I don't really know why, but in production, some of your custom styles go **before** MUI styles, and they get overridden. As far as I know, it has something to do with the import order of components, but I still can't figure out what causes this, so as an escape hatch, whenever you directly add a `className` to a MUI component, always append to its `makeStyles` function an argument `{ index: 1 }` so your custom styles will go **after** any MUI default styles
