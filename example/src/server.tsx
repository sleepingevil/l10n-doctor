import path from 'path';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import App from './App';
import { getContentBundle } from './contentRepository';

const app = express();
app.get('/', (req, res) => {
  console.log(req.url);
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', async (err, htmlData) => {
    if (err) {
      console.error('err', err);
      return res.status(404).end()
    }

    const html = renderToString(<App contentBundle={await getContentBundle('en_gb')} />);

    // inject the rendered app into our html and send it
    return res.send(
      htmlData.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      )
    );
  });
});
app.use(express.static(
  path.resolve(__dirname, '..', 'build'),
  { maxAge: '30d' },
));
app.listen(3000, () => console.log('App is listening on port 3000'));
