Dub is an open-source link management platform for tracking link clicks and conversions.

You can use the managed cloud version at [Dub.co](https://dub.co) or host it yourself.

## Set up Dub locally

Read [this guide](https://dub.co/docs/local-development) to set up Dub locally.

## Host Dub yourself

Read [this guide](https://dub.co/docs/self-hosting) to host it yourself.

## Customize the Tinybird project

If you are just interested in the Tinybird project, you can find it [here](https://github.com/dubinc/dub/tree/main/packages/tinybird)

Build locally like any other Tinybird project:

```bash
cd packages/tinybird
tb local start
tb login
tb dev
```

When you are ready deploy to cloud:

```bash
tb --cloud deploy
```

## Generate mock data

You can find sample mock data for local development in the [data-generator](https://github.com/tinybirdco/templates/tree/main/dub/data-generator) folder.

Alternatively, you can generate mock data by running the `generate.js` script in that folder:

```bash
npm install
node generate.js
```
