# L10N Doctor

<img src="https://img.icons8.com/offices/30/000000/warning-shield.png"/> This library is still in PoC stage, and <strong>it's not ready for production</strong>. Feel free to share your ideas. If you want to contribute. Please keep your pull requests small, and understandable. <img src="https://img.icons8.com/offices/30/000000/warning-shield.png"/>

L10N Doctor is a simple localization library for your JavaScript application.

[![NPM](https://img.shields.io/npm/v/react-ssr-data-provider.svg)](https://www.npmjs.com/package/react-ssr-data-provider) ![Build and Deploy](https://github.com/sleepingevil/l10n-doctor/workflows/Build%20and%20Deploy/badge.svg)

## Install

```bash
yarn add l10n-doctor
```
or
```bash
npm install --save l10n-doctor
```

## Usage

#### Example usage in the browser:

browser.ts
```ts
import { ContentRepository } from 'l10n-doctor';

const contentRepository = new ContentRepository({ accessKey: L10N_DR_TOKEN });

contentRepository.getContentBundle('en_gb').then(contentBundle => {
  document.body.innerHTML = `<h1>${contentBundle.getText('Hello World!', { cId: 'hello_world' })}</h1>`;
});
```

index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Example App</title>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

#### Eample usage in an express app:

server.ts
```ts
import express from 'express';

const app = express();
import { ContentRepository } from 'l10n-doctor';

const contentRepository = new ContentRepository({ accessKey: L10N_DR_TOKEN });

contentRepository.getContentBundle('en_gb').then(contentBundle => {
  app.get('*', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Example App</title>
      </head>
      <body>
        <h1>${contentBundle.getText('Hello World!', { cId: 'hello_world' })}</h1>
      </body>
    </html>`)
  });

  app.listen(PORT, () => console.log(`App is listening on ${PORT} 3000`));
});
```

Server Response
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Example App</title>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

## Upcoming features

- `getText()` will automatically create ContentElements if they don't exist yet
- `getText()` to allow using parameters
- `getElement()` will return `<span data-cId="hello_world">Hello World!</span>` for convenient integration with in-context editor.

## License

MIT © [sleepingevil](https://github.com/sleepingevil)
