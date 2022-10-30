import {useEffect, useState} from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import './App.css'

function App() {
  const [visitorId, setVisitorId] = useState(null);
  const [ram, setRam] = useState(null);
    
    useEffect(() => {
        (async () => {
            const agent = await FingerprintJS.load();
            const fingerprint = await agent.get();
            setVisitorId(fingerprint.visitorId);
            setRam(fingerprint.components.deviceMemory.value);
            console.log(fingerprint);
        })();
    }, []);

  return (
    <div className="App">
            <h1>Welcome!</h1>
            {visitorId ? (
              <>
                <p>Your device RAM is:{ ram } GB</p>
                <p>Your visitor ID is:{ visitorId }</p>
              </>
            ) : (
                <p>Technical Abhi detecting your browser's fingerprint.</p>
            )}
        </div>
  )
}

export default App
