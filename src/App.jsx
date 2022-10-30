import {useEffect, useState} from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import './App.css'

function App() {
  const [visitorId, setVisitorId] = useState(null);
  const [ram, setRam] = useState(null);
  const [browser, setbrowser] = useState(null);
  const [timezone, settimezone] = useState(null);
  const [screenh, setscreenh] = useState(null);
  const [screenw, setscreenw] = useState(null);
  const [os, setos] = useState(null);
    
    useEffect(() => {
        (async () => {
            const agent = await FingerprintJS.load();
            const fingerprint = await agent.get();
            setVisitorId(fingerprint.visitorId);
            setRam(fingerprint.components.deviceMemory.value);
            setbrowser(fingerprint.components.vendorFlavors.value[0]);
            settimezone(fingerprint.components.timezone.value);
            setscreenh(fingerprint.components.screenResolution.value[0]);
            setscreenw(fingerprint.components.screenResolution.value[1]);
            setos(fingerprint.components.platform.value);
            console.log(fingerprint);
        })();
    }, []);

  return (
    <div className="App">
            <h1>💕 Technical Abhi 💕</h1>
            {visitorId ? (
              <>
                <p>Your device 💻:{ os }</p>
                <p>Visitor ID 📇:{ visitorId }</p>
                <p>Browser 🐇:{ browser }</p>
                <p>Timezone ⏲️:{ timezone }</p>
                <p>Screen Width:{ screenw }</p>
                <p>Screen Height:{ screenh }</p>
                <p>RAM: {ram}GB</p>
              </>
            ) : (
                <p>Technical Abhi detecting your browser's fingerprint.</p>
            )
          }
        </div>
  )
}

export default App
