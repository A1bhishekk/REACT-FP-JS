import { useEffect, useState } from 'react';
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
  const [confidence, setconfidence] = useState(null);

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
      // setcpu(fingerprint.components);
      setconfidence(fingerprint.confidence.score);
      console.log(fingerprint);
      console.log(`confidence score: ${fingerprint.confidence.score}`)
    })();
  }, []);



  return (
    <div className="App">
      <div className='container'>
        <h2> Technical Abhi </h2>
        {visitorId ? (
          <div>
            <p>Visitor ID 📇:{visitorId}</p>
            <p>Your device 💻:{os}</p>
            <p>Browser 🐇:{browser}</p>
            <p>Timezone ⏲️:{timezone}</p>
            <p>Screen Width:{screenw}</p>
            <p>Screen Height:{screenh}</p>
            <p>RAM: {ram}GB</p>
            <p>Confidence Score:{confidence}</p>
          </div>
        ) : (
          <p>Technical Abhi detecting your browser's fingerprint.</p>
        )
        }
      </div>
    </div>
  )
}

export default App
