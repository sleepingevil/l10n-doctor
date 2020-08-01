import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { getContentBundle } from './contentRepository';

getContentBundle('en_gb').then(contentBundle => {
  ReactDOM.render(
    <React.StrictMode>
      <App contentBundle={contentBundle} />
    </React.StrictMode>,
    document.getElementById('root')
  );
});