import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

function App() {
  useEffect(() => {
    WebApp.ready();
    WebApp.expand();

    return () => {
      WebApp.close();
    };
  }, []);

  return (
    <>
      <p>Hello world!</p>
    </>
  );
}

export default App;
