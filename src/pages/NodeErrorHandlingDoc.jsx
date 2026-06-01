// src/pages/NodeErrorHandlingDoc.jsx
import React, { useState } from 'react';

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

export default function NodeErrorHandlingDoc() {
  const [logs, setLogs] = useState([]);
  const [serverStatus, setServerStatus] = useState('🟢 Online');

  const simulateBadError = () => {
    setLogs([]);
    setLogs(prev => [...prev, { type: 'info', msg: 'GET /api/data (No Error Handler)' }]);
    
    setTimeout(() => {
      setLogs(prev => [...prev, { type: 'error', msg: '💥 UnhandledException: Database connection failed!' }]);
      setServerStatus('🔴 Crashed (Offline)');
      setTimeout(() => {
        setLogs(prev => [...prev, { type: 'system', msg: 'Node process exited with code 1. All users disconnected.' }]);
      }, 500);
    }, 800);
  };

  const simulateGoodError = () => {
    // Reset server if crashed
    setServerStatus('🟢 Online');
    setLogs([]);
    setLogs(prev => [...prev, { type: 'info', msg: 'GET /api/data (With Global Handler)' }]);
    
    setTimeout(() => {
      setLogs(prev => [...prev, { type: 'warn', msg: '⚠️ Error thrown in controller: Database connection failed!' }]);
      setLogs(prev => [...prev, { type: 'info', msg: 'Passing to next(err)...' }]);
      
      setTimeout(() => {
        setLogs(prev => [...prev, { type: 'success', msg: '🛡️ Global Error Handler caught the error!' }]);
        setLogs(prev => [...prev, { type: 'response', msg: 'Sending JSON: { "success": false, "error": "Database connection failed!" }' }]);
      }, 800);
    }, 800);
  };

  const resetServer = () => {
    setServerStatus('🟢 Online');
    setLogs([]);
  };

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        9. Global Error Handling
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        Express mein agar kisi synchronous code mein error aata hai, toh Express use khud catch kar leta hai. Lekin database calls (Async/Await) mein agar error aaya aur aapne use <code>catch</code> nahi kiya, toh Node.js crash ho jata hai. Ise rokne ke liye hum ek Central Error Handler banate hain.
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: LIVE DEMO ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. Live Demo: The Crash vs The Catch
      </h2>
      
      <div style={boxStyle('#343a46')}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #343a46' }}>
          <h3 style={{ margin: 0, color: serverStatus.includes('Online') ? '#10b981' : '#dc2626' }}>
            Server Status: {serverStatus}
          </h3>
          <button onClick={resetServer} style={btnStyle('transparent', '#9ca3af')}>🔄 Restart Server</button>
        </div>

        <div>
          <button onClick={simulateBadError} disabled={serverStatus.includes('Crashed')} style={btnStyle('#dc2626', 'white')}>
            Trigger Bad Route (No Handler)
          </button>
          <button onClick={simulateGoodError} disabled={serverStatus.includes('Crashed')} style={btnStyle('#10b981', 'white')}>
            Trigger Safe Route (Global Handler)
          </button>
        </div>

        <div style={{ marginTop: '20px', minHeight: '150px', background: '#111827', padding: '15px', borderRadius: '8px', border: '1px solid #343a46', fontFamily: 'monospace' }}>
          {logs.length === 0 && <span style={{ color: '#9ca3af' }}>Waiting for requests...</span>}
          {logs.map((log, i) => {
            let color = '#e2e8f0';
            if (log.type === 'error') color = '#dc2626';
            if (log.type === 'warn') color = '#eab308';
            if (log.type === 'success') color = '#10b981';
            if (log.type === 'response') color = '#3b82f6';
            if (log.type === 'system') color = '#9ca3af';
            
            return <div key={i} style={{ color, marginBottom: '5px' }}>{log.msg}</div>;
          })}
        </div>
      </div>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: THE INTERVIEW SECRET ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. The Magic Middleware (Interview Focus)
      </h2>

      <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', borderLeft: '4px solid #eab308', padding: '15px', borderRadius: '0 8px 8px 0', marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#eab308' }}>Q: Normal Middleware aur Error Middleware me kya difference hai?</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          <strong>Your Answer:</strong> "Express parameters ke count (length) se pehchanta hai. Normal middleware mein 3 parameters hote hain <code>(req, res, next)</code>. Par Global Error Handler mein strictly <strong>4 parameters</strong> hote hain <code>(err, req, res, next)</code>. Agar aapne galti se bhi <code>next</code> hata diya, toh Express use normal middleware maan lega aur error handle nahi hoga!"
        </p>
      </div>

      <h3 style={{ marginTop: '30px', color: '#f6f7f9' }}>Implementation (app.js)</h3>
      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`const express = require('express');
const app = express();

// 1. Aapke saare Routes (Yahan error aaya toh aage girega)
app.use('/api/users', userRoutes);

// 2. 404 Route Not Found Handler (Sabse last normal route)
app.all('*', (req, res, next) => {
  const err = new Error(\`Route \${req.originalUrl} not found!\`);
  err.statusCode = 404;
  next(err); // Error ko aage pass kar diya
});

// 3. 🔥 THE GLOBAL ERROR HANDLER (File ke ekdum end me hoga)
// Dhyan de: Isme 4 arguments hain!
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Client ko clean JSON response bhej rahe hain, HTML stack trace nahi
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 3: THE ASYNC TRAP ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        3. The Async/Await Trap 🕸️
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Express 4.x (jo sabse zyada use hota hai) asynchronous errors ko automatically catch nahi kar pata. Agar <code>await database.save()</code> fail hua, toh server crash ho jayega. Ise theek karne ke do tareeqe hain:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
        <div style={{ border: '1px solid #dc2626', padding: '15px', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>The Boring Way (try/catch everywhere)</h4>
          <pre style={{ background: '#111827', padding: '10px', borderRadius: '6px', color: '#e2e8f0', fontSize: '0.85rem' }}>
{`exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    // Manually pass to Global Handler
    next(err); 
  }
};`}
          </pre>
        </div>

        <div style={{ border: '1px solid #10b981', padding: '15px', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#10b981' }}>The Pro Way (express-async-handler)</h4>
          <pre style={{ background: '#111827', padding: '10px', borderRadius: '6px', color: '#e2e8f0', fontSize: '0.85rem' }}>
{`const asyncHandler = require('express-async-handler');

// Ye package automatically try/catch laga deta hai
exports.getUser = asyncHandler(async (req, res, next) => {
  
  const user = await User.findById(req.params.id);
  res.json(user);

});`}
          </pre>
        </div>
      </div>

    </div>
  );
}