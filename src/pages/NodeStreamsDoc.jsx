// src/pages/NodeStreamsDoc.jsx
import React, { useState, useEffect } from 'react';

// ==========================================
// HELPER STYLES
// ==========================================
const btnStyle = (bg, color) => ({
  padding: '10px 18px', backgroundColor: bg, color: color, border: 'none', 
  borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: 'opacity 0.2s', marginRight: '10px', marginBottom: '10px'
});

const boxStyle = (borderColor) => ({
  padding: '20px', border: `1px solid ${borderColor}`, borderRadius: '8px', 
  marginTop: '15px', backgroundColor: '#191c20'
});

export default function NodeStreamsDoc() {
  const [activeTest, setActiveTest] = useState(null); // 'fs' or 'stream'
  const [progress, setProgress] = useState(0);
  const [memory, setMemory] = useState(25); // Baseline Node.js RAM (MB)
  const [status, setStatus] = useState('Idle');

  useEffect(() => {
    let interval;
    if (activeTest === 'fs') {
      setStatus('Reading 2GB File into RAM...');
      setMemory(25);
      setProgress(0);
      
      // Simulating fs.readFile (Blocks until 100%, then spikes memory)
      setTimeout(() => {
        setMemory(2048); // Boom!
        setProgress(100);
        setStatus('💥 FATAL ERROR: JavaScript heap out of memory');
      }, 2000);

    } else if (activeTest === 'stream') {
      setStatus('Streaming chunks of data...');
      setMemory(25);
      setProgress(0);
      
      // Simulating fs.createReadStream (Processes chunk by chunk)
      let currProgress = 0;
      interval = setInterval(() => {
        currProgress += 10;
        setProgress(currProgress);
        // Memory stays low! (e.g., 64MB buffer limit)
        setMemory(Math.floor(Math.random() * (64 - 30 + 1) + 30)); 

        if (currProgress >= 100) {
          clearInterval(interval);
          setStatus('✅ File processed successfully! (Max RAM used: 64MB)');
          setMemory(25); // GC cleans up
        }
      }, 300);
    }

    return () => clearInterval(interval);
  }, [activeTest]);

  const resetSim = () => {
    setActiveTest(null);
    setProgress(0);
    setMemory(25);
    setStatus('Idle');
  };

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        10. Streams & Buffers
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        <strong>Buffer:</strong> Ek temporary memory (waiting room) jahan raw binary data thodi der ke liye rakha jata hai.<br/>
        <strong>Stream:</strong> Data ko chote-chote tukdo (chunks) me divide karke ek jagah se dusri jagah bhejne ka continuous flow. Bilkul YouTube ki tarah, jahan puri movie download hone ka wait nahi karna padta, video stream hoti rehti hai!
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: LIVE DEMO ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. Live Demo: Reading a 2GB File
      </h2>
      
      <div style={boxStyle('#343a46')}>
        <div style={{ marginBottom: '20px' }}>
          <button onClick={() => setActiveTest('fs')} disabled={activeTest !== null} style={btnStyle('#dc2626', 'white')}>
            Use fs.readFile (Bad Practice)
          </button>
          <button onClick={() => setActiveTest('stream')} disabled={activeTest !== null} style={btnStyle('#10b981', 'white')}>
            Use Streams (Pro Practice)
          </button>
          <button onClick={resetSim} style={btnStyle('transparent', '#9ca3af')}>Reset</button>
        </div>

        <div style={{ background: '#111827', padding: '20px', borderRadius: '8px', border: '1px solid #343a46' }}>
          <h3 style={{ margin: '0 0 15px 0', color: status.includes('FATAL') ? '#dc2626' : status.includes('✅') ? '#10b981' : '#eab308' }}>
            Status: {status}
          </h3>
          
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>File Progress:</span>
              <span>{progress}%</span>
            </div>
            <div style={{ width: '100%', background: '#23272f', borderRadius: '4px', height: '20px', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, background: '#3b82f6', height: '100%', transition: 'width 0.3s' }}></div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>Server RAM Usage:</span>
              <span style={{ color: memory > 512 ? '#dc2626' : '#10b981', fontWeight: 'bold' }}>{memory} MB</span>
            </div>
            <div style={{ width: '100%', background: '#23272f', borderRadius: '4px', height: '20px', overflow: 'hidden' }}>
              <div style={{ width: `${(memory / 2048) * 100}%`, background: memory > 512 ? '#dc2626' : '#10b981', height: '100%', transition: 'width 0.3s' }}></div>
            </div>
          </div>
        </div>
      </div>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: THE CODE ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. How to implement it? (The `pipe` method)
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Streams mein humein manual data copy karne ki zaroorat nahi padti. Hum ek source (Readable) ko destination (Writable) se ek pipe <code>.pipe()</code> ke through jod dete hain. Jaise paani ki tanki se nal (tap) tak pipe lagana!
      </p>

      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
  // Client ko pata chalna chahiye ki video aa rahi hai
  res.writeHead(200, { 'Content-Type': 'video/mp4' });

  // 1. Ek Readable stream banao (Tanki)
  const readStream = fs.createReadStream('./movie-2GB.mp4');

  // 2. Data ko direct response object me Pipe kar do (Nal)
  // Express me 'res' object automatically ek Writable Stream hota hai!
  readStream.pipe(res);

  // Error handling
  readStream.on('error', (err) => {
    res.end('File not found');
  });
});`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 3: INTERVIEW CHEAT SHEET ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        3. The 4 Types of Streams (Interview Question)
      </h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#191c20', borderRadius: '8px', overflow: 'hidden' }}>
          <thead style={{ background: '#343a46', color: '#f6f7f9' }}>
            <tr>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f' }}>Type</th>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f' }}>Meaning</th>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f' }}>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#3b82f6', fontWeight: 'bold' }}>Readable</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>Jahan se data sirf read kiya ja sake.</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af', fontFamily: 'monospace' }}>fs.createReadStream(), HTTP req</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#10b981', fontWeight: 'bold' }}>Writable</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>Jahan par data sirf write kiya ja sake.</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af', fontFamily: 'monospace' }}>fs.createWriteStream(), HTTP res</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#eab308', fontWeight: 'bold' }}>Duplex</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>Dono Read aur Write ek sath ho sake.</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af', fontFamily: 'monospace' }}>TCP Sockets (net module)</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#a855f7', fontWeight: 'bold' }}>Transform</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>Duplex jaisa, par raste me data ko modify kar de.</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af', fontFamily: 'monospace' }}>zlib (Data ko zip/compress karna)</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}