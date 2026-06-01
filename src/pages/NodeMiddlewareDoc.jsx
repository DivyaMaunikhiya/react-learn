// src/pages/NodeMiddlewareDoc.jsx
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

export default function NodeMiddlewareDoc() {
  const [pipelineLogs, setPipelineLogs] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulated Middleware Pipeline
  const runPipeline = (hasToken) => {
    setIsProcessing(true);
    setPipelineLogs([]);

    // Step 1: Client Request
    setTimeout(() => {
      setPipelineLogs(prev => [...prev, { step: 'Client', msg: `Sending GET /api/dashboard (Token: ${hasToken ? '✅' : '❌'})`, color: '#f6f7f9' }]);
      
      // Step 2: Global Logger Middleware
      setTimeout(() => {
        setPipelineLogs(prev => [...prev, { step: 'Logger Middleware', msg: `[LOG] Request received at ${new Date().toLocaleTimeString()}`, color: '#3b82f6' }]);
        setPipelineLogs(prev => [...prev, { step: 'Logger Middleware', msg: 'Calling next()...', color: '#9ca3af' }]);
        
        // Step 3: Auth Middleware
        setTimeout(() => {
          setPipelineLogs(prev => [...prev, { step: 'Auth Middleware', msg: 'Checking Headers for Token...', color: '#eab308' }]);
          
          if (!hasToken) {
            // Blocks the request!
            setTimeout(() => {
              setPipelineLogs(prev => [...prev, { step: 'Auth Middleware', msg: '❌ NO TOKEN! Blocking request. Sending 401 response.', color: '#dc2626' }]);
              setIsProcessing(false);
            }, 600);
          } else {
            // Allows the request!
            setTimeout(() => {
              setPipelineLogs(prev => [...prev, { step: 'Auth Middleware', msg: '✅ Token Valid! Calling next()...', color: '#10b981' }]);
              
              // Step 4: Final Controller
              setTimeout(() => {
                setPipelineLogs(prev => [...prev, { step: 'Controller', msg: 'Generating Dashboard Data...', color: '#a855f7' }]);
                
                setTimeout(() => {
                  setPipelineLogs(prev => [...prev, { step: 'Controller', msg: 'Response Sent: 200 OK 🎉', color: '#10b981' }]);
                  setIsProcessing(false);
                }, 600);

              }, 600);
            }, 600);
          }

        }, 600);
      }, 600);
    }, 600);
  };

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        8. Middleware Deep Dive
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        Middleware ek aasa function hai jiske paas <code>req</code> (Request), <code>res</code> (Response), aur ek special function <code>next()</code> ka access hota hai. Ye request ko modify kar sakta hai, raste me rok sakta hai (reject), ya sab theek hone par <code>next()</code> call karke request ko aage badha sakta hai.
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: LIVE DEMO ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. Live Demo: The Middleware Pipeline
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Neeche do buttons hain. Dekho kaise Auth Middleware bina token wali request ko Controller tak pahunchne hi nahi deta aur raste se "Bounce" kar deta hai.
      </p>

      <div style={boxStyle('#343a46')}>
        <button 
          onClick={() => runPipeline(false)} 
          disabled={isProcessing}
          style={btnStyle(isProcessing ? '#343a46' : '#dc2626', 'white')}
        >
          Send Request (NO Token)
        </button>
        <button 
          onClick={() => runPipeline(true)} 
          disabled={isProcessing}
          style={btnStyle(isProcessing ? '#343a46' : '#10b981', 'white')}
        >
          Send Request (WITH Token)
        </button>

        <div style={{ marginTop: '20px', minHeight: '200px', background: '#111827', padding: '15px', borderRadius: '8px', border: '1px solid #343a46', fontFamily: 'monospace' }}>
          {pipelineLogs.length === 0 && <span style={{ color: '#9ca3af' }}>Waiting for request...</span>}
          {pipelineLogs.map((log, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <span style={{ color: log.color, fontWeight: 'bold', width: '180px', display: 'inline-block' }}>[{log.step}]</span> 
              <span style={{ color: '#e2e8f0' }}>{log.msg}</span>
            </div>
          ))}
        </div>
      </div>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: THE CODE PATTERN ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. How to Write a Middleware
      </h2>
      
      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`// Ek simple Custom Middleware (Logger)
const myLogger = (req, res, next) => {
  console.log(\`A request came at \${req.url} with method \${req.method}\`);
  
  // 🔥 SABSE IMPORTANT LINE
  // Agar next() nahi likhoge, toh request yahin atak jayegi (Timeout)
  next(); 
};

// Middleware ko puri app par apply karna
app.use(myLogger);

// Auth Middleware (Route specific)
const checkAuth = (req, res, next) => {
  if (req.headers.authorization) {
    next(); // Pass hone diya
  } else {
    res.status(401).json({ error: "Access Denied!" }); // Rok diya!
  }
};

// Ise sirf ek specific route par lagana
app.get('/api/dashboard', checkAuth, dashboardController);`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 3: CHEAT SHEET ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        3. The 3 Types of Middleware (Interview Question)
      </h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#191c20', borderRadius: '8px', overflow: 'hidden' }}>
          <thead style={{ background: '#343a46', color: '#f6f7f9' }}>
            <tr>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f' }}>Type</th>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f' }}>Example Code</th>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f' }}>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#3b82f6', fontWeight: 'bold' }}>Built-in</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#e2e8f0', fontFamily: 'monospace' }}>app.use(express.json())</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>Express ke andar pehle se aate hain. JSON parse karne ya static files (HTML/CSS) serve karne ke liye.</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#10b981', fontWeight: 'bold' }}>Third-Party</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#e2e8f0', fontFamily: 'monospace' }}>app.use(cors())</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>NPM se download hote hain. Example: <code>cors</code> (cross-origin handle karne ke liye) ya <code>morgan</code> (logging ke liye).</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#eab308', fontWeight: 'bold' }}>Custom</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#e2e8f0', fontFamily: 'monospace' }}>app.use(checkToken)</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>Aap khud banate ho. Example: Authentication, Role checking, ya custom logic ke liye.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}