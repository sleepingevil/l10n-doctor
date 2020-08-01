import React from 'react';
import './styles.css';
import { ContentBundle } from 'l10n-doctor';

const App: React.FC<{ contentBundle: ContentBundle }> = ({ contentBundle }) => {
  return (
    <div className="App">
      <header className="App-header">
        {contentBundle.getText('Whatever', { cId: 'title' })}
      </header>
    </div>
  );
}

export default App;
