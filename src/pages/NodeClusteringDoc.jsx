// src/pages/NodeClusteringDoc.jsx
import React, { useState } from 'react';

// ==========================================
// HELPER STYLES
// ==========================================
const btnStyle = (bg, color) => ({
  padding: '10px 18px', backgroundColor: bg, color: color, border: 'none', 
  borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: 'opacity 0.2s', marginRight: '10px'
});

const boxStyle = (borderColor) => ({
  padding: '20px', border: `1px solid ${borderColor}`, borderRadius: '8px', 
  marginTop: '15px', backgroundColor: '#191c20'
});

const coreStyle = (isActive, color) => ({
  flex: 1, padding: '15px', borderRadius: '8px', border: `2px solid ${color}`,
  backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : '#111827',
  textAlign: 'center', transition: 'all 0.3s ease'
});

export default function NodeClusteringDoc() {
  const [activeTest, setActiveTest] = useState(null); // 'single' or 'cluster'
  const [tasks, setTasks] = useState([]);
  const [cores, setCores] = useState([
    { id: 1, activeTask: null },
    { id: 2, activeTask: null },
    { id: 3, activeTask: null },
    { id: 4, activeTask: null }
  ]);
  const [timeTaken, setTimeTaken] = useState(0);

  // CPU Simulator Logic
  const runSimulation = (mode) => {
    setActiveTest(mode);
    setTasks([1, 2, 3, 4]); // 4 Heavy requests came in simultaneously
    setTimeTaken(0);
    
    let time = 0;
    
    if (mode === 'single') {
      // Single Thread: Processes one by one
      setCores([{ id: 1, activeTask: 1 }, { id: 2, activeTask: null }, { id: 3, activeTask: null }, { id: 4, activeTask: null }]);
      
      let currentTask = 1;
      const interval = setInterval(() => {
        time++;
        currentTask++;
        if (currentTask <= 4) {
          setCores([{ id: 1, activeTask: currentTask }, { id: 2, activeTask: null }, { id: 3, activeTask: null }, { id: 4, activeTask: null }]);
          setTasks(prev => prev.slice(1));
        } else {
          clearInterval(interval);
          setCores([{ id: 1, activeTask: null }, { id: 2, activeTask: null }, { id: 3, activeTask: null }, { id: 4, activeTask: null }]);
          setTasks([]);
          setTimeTaken(time);
          setActiveTest(null);
        }
      }, 1000); // 1 sec per task
    } 
    else if (mode === 'cluster') {
      // Cluster: Divides across 4 cores simultaneously
      setCores([
        { id: 1, activeTask: 1 }, { id: 2, activeTask: 2 }, 
        { id: 3, activeTask: 3 }, { id: 4, activeTask: 4 }
      ]);
      
      const interval = setInterval(() => {
        time++;
        clearInterval(interval);
        setCores([{ id: 1, activeTask: null }, { id: 2, activeTask: null }, { id: 3, activeTask: null }, { id: 4, activeTask: null }]);
        setTasks([]);
        setTimeTaken(time);
        setActiveTest(null);
      }, 1000); // All 4 done in 1 sec
    }
  };

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        11. Clustering & Worker Threads
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        Agar aapke server computer mein 8-Core CPU hai, toh default Node.js usme se sirf 1 Core use karta hai (7 cores bekaar baithe rehte hain). Is hardware ko fully utilize karne ke liye hum Node.js mein CPU scaling tools ka use karte hain.
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: LIVE DEMO ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. Live Demo: CPU Load Balancer
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Maan lo 4 users ne ek sath heavy calculation request ki. Dekho Single-Thread vs Multi-Core Cluster kaise behave karte hain.
      </p>

      <div style={boxStyle('#343a46')}>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <button onClick={() => runSimulation('single')} disabled={activeTest !== null} style={btnStyle('#dc2626', 'white')}>
            Start Single Thread (Default Node)
          </button>
          <button onClick={() => runSimulation('cluster')} disabled={activeTest !== null} style={btnStyle('#10b981', 'white')}>
            Start Cluster (Multi-Core)
          </button>
        </div>

        {/* CPU Cores Visualization */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          {cores.map(core => (
            <div key={core.id} style={coreStyle(core.activeTask, core.activeTask ? '#10b981' : '#343a46')}>
              <h4 style={{ margin: '0 0 10px 0', color: core.activeTask ? '#10b981' : '#9ca3af' }}>Core {core.id}</h4>
              <div style={{ fontSize: '1.5rem' }}>
                {core.activeTask ? '⚙️ Processing...' : '💤 Idle'}
              </div>
            </div>
          ))}
        </div>

        {/* Results */}
        <div style={{ background: '#111827', padding: '15px', borderRadius: '8px', border: '1px solid #343a46' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#eab308' }}>Status Logs:</h4>
          <p style={{ margin: 0, color: '#e2e8f0' }}>Pending Tasks in Queue: <strong>{tasks.length}</strong></p>
          {timeTaken > 0 && (
            <p style={{ margin: '10px 0 0 0', color: '#58c4dc', fontWeight: 'bold' }}>
              ⏱️ Total Time Taken: {timeTaken} Seconds
            </p>
          )}
        </div>
      </div>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: CLUSTERING CODE ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. How to use the `cluster` module
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Cluster module ek "Master" process banata hai jo aapke OS ke har CPU core ke liye ek chota "Worker" server fork (copy) kar deta hai. Saare workers ek hi port (e.g., 3000) share karte hain.
      </p>

      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`const cluster = require('cluster');
const os = require('os');
const express = require('express');

const numCPUs = os.cpus().length; // Check how many cores computer has

if (cluster.isMaster) {
  console.log(\`Master \${process.pid} is running\`);

  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // If a worker crashes, start a new one automatically
  cluster.on('exit', (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} died. Restarting...\`);
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection (Like Express Server)
  const app = express();
  app.get('/', (req, res) => res.send(\`Hello from Worker \${process.pid}\`));
  app.listen(3000, () => console.log(\`Worker \${process.pid} started\`));
}`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 3: CLUSTER VS WORKER THREADS ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        3. Cluster vs Worker Threads (Interview Cheat Sheet)
      </h2>
      <p style={{ color: '#d1d5db', marginBottom: '20px' }}>
        Interview mein puchenge: "Agar Cluster se sab scale ho jata hai, toh Worker Threads ki kya zaroorat aayi?"
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#191c20', borderRadius: '8px', overflow: 'hidden' }}>
          <thead style={{ background: '#343a46', color: '#f6f7f9' }}>
            <tr>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f' }}>Feature</th>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f', color: '#3b82f6' }}>Clustering (`cluster`)</th>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f', color: '#10b981' }}>Worker Threads (`worker_threads`)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}><strong>Architecture</strong></td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>Poore Node.js server ki <strong>naya Process</strong> (copy) banata hai.</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>Ek hi server process ke andar <strong>naya Thread</strong> banata hai.</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}><strong>Memory / RAM</strong></td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#dc2626' }}>Heavy. Har copy apna alag V8 engine aur alag RAM use karti hai. (Memory * Cores)</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#10b981' }}>Lightweight. Ek hi RAM/Memory ko share kar sakte hain (via ArrayBuffers).</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}><strong>Best Use Case</strong></td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>API throughput badhane ke liye (Zyada users ko handle karna).</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>Background mein heavy math, crypto, ya image processing karne ke liye.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', padding: '15px', borderRadius: '0 8px 8px 0', marginTop: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#3b82f6' }}>💡 Modern Tip: PM2</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          Real world companies mein developers manually <code>cluster</code> module ka code nahi likhte. Hum <strong>PM2</strong> naam ka package use karte hain jo server deployment aur clustering automatically handle karta hai command line se: <br/>
          <code style={{ background: '#191c20', padding: '5px', borderRadius: '4px', color: '#10b981', display: 'inline-block', marginTop: '10px' }}>pm2 start app.js -i max</code>
        </p>
      </div>

    </div>
  );
}