// src/pages/NodeEventEmittersDoc.jsx
import React, { useState } from 'react';

// ==========================================
// HELPER STYLES
// ==========================================
const btnStyle = (bg, color) => ({
  padding: '10px 18px', backgroundColor: bg, color: color, border: 'none', 
  borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: 'opacity 0.2s'
});

const boxStyle = (borderColor) => ({
  padding: '20px', border: `1px solid ${borderColor}`, borderRadius: '8px', 
  marginTop: '15px', backgroundColor: '#191c20'
});

export default function NodeEventEmittersDoc() {
  const [logs, setLogs] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulated Event Emitter Flow
  const simulateEvent = () => {
    setIsProcessing(true);
    setLogs([]);

    // 1. Action Happens (Trigger)
    setLogs(prev => [...prev, { source: 'User Controller', msg: 'User "Rahul" saved to Database.', color: '#3b82f6' }]);
    
    // 2. Emit Event (Broadcasting)
    setTimeout(() => {
      setLogs(prev => [...prev, { source: 'Event Emitter', msg: '📣 EMIT: "userRegistered" event fired!', color: '#eab308' }]);
      
      // 3. Listeners Reacting (Independent Services)
      setTimeout(() => {
        setLogs(prev => [...prev, { source: 'Email Service', msg: '📧 Listening... Sent welcome email to Rahul.', color: '#10b981' }]);
        
        setTimeout(() => {
          setLogs(prev => [...prev, { source: 'Analytics Service', msg: '📈 Listening... Incremented total active users count.', color: '#a855f7' }]);
          setIsProcessing(false);
        }, 600);
      }, 600);
    }, 600);
  };

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        5. Event Emitters
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        Node.js mein <code>events</code> naam ka ek in-built module hota hai. Iska kaam simple hai: Ek jagah se awaaz lagao (<strong>Emit</strong>), aur app mein kahin bhi us awaaz ko sun kar apna kaam karo (<strong>Listen / On</strong>). Ye backend architecture ko scalable aur clean banane ka sabse best tarika hai.
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: LIVE DEMO ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. Live Demo: Microservice Style Communication
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Neeche "Register User" button dabao. Dekho kaise ek event fire hone par alag-alag independent services apna apna kaam karna shuru kar deti hain.
      </p>

      <div style={boxStyle('#343a46')}>
        <button 
          onClick={simulateEvent} 
          disabled={isProcessing}
          style={btnStyle(isProcessing ? '#343a46' : '#3b82f6', 'white')}
        >
          {isProcessing ? 'Processing...' : 'Register New User'}
        </button>

        <div style={{ marginTop: '20px', minHeight: '180px', background: '#111827', padding: '15px', borderRadius: '8px', border: '1px solid #343a46', fontFamily: 'monospace' }}>
          {logs.length === 0 && <span style={{ color: '#9ca3af' }}>Waiting for events...</span>}
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <span style={{ color: log.color, fontWeight: 'bold', width: '150px', display: 'inline-block' }}>[{log.source}]</span> 
              <span style={{ color: '#e2e8f0' }}>{log.msg}</span>
            </div>
          ))}
        </div>
      </div>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: THE CODE PATTERN ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. How to Write It? (The Code)
      </h2>

      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// 1. SETUP LISTENERS (Kaan lagakar sunna)
// Jab bhi 'userRegistered' naam ki awaaz aaye, ye function chalana
myEmitter.on('userRegistered', (userName) => {
  console.log(\`Sending Welcome Email to \${userName}...\`);
});

myEmitter.on('userRegistered', (userName) => {
  console.log(\`Updating Analytics for \${userName}...\`);
});

// 2. EMIT EVENT (Awaaz lagana)
function registerUser(name) {
  // DB logic here...
  console.log(\`User \${name} added to Database.\`);
  
  // Ab baaki services ko bata do
  myEmitter.emit('userRegistered', name); 
}

registerUser('Rahul');`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 3: INTERVIEW TRAPS ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        3. The Interview Traps 🪤
      </h2>

      <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', borderLeft: '4px solid #eab308', padding: '15px', borderRadius: '0 8px 8px 0', marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#eab308' }}>Trap 1: Are Event Emitters Async or Sync?</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          <strong>Your Answer:</strong> "Ye sabse bada misconception hai. Event Emitters by default <strong style={{ color: '#10b981' }}>Synchronous</strong> hote hain! Jis order mein aapne <code>.on()</code> listeners likhe hain, wo usi order mein ek ke baad ek block karke chalenge. Agar unhe asynchronous banana hai, toh listeners ke andar <code>setImmediate()</code> ya <code>process.nextTick()</code> ka use karna padega."
        </p>
      </div>

      <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', padding: '15px', borderRadius: '0 8px 8px 0', marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#3b82f6' }}>Trap 2: Callbacks vs Event Emitters?</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          <strong>Your Answer:</strong> "Callbacks <strong>1-to-1</strong> relationship ke liye hote hain (Ek request aayi, uska ek callback chalega). Event Emitters <strong>1-to-Many</strong> relationship ke liye hote hain (Ek event emit hua, aur 5 alag-alag modules use sun kar apna apna kaam kar sakte hain)."
        </p>
      </div>

      <div style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', borderLeft: '4px solid #dc2626', padding: '15px', borderRadius: '0 8px 8px 0' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>Trap 3: Memory Leaks (Max Listeners Error)</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          Node.js default mein ek event ke liye maximum <strong>10 listeners</strong> allow karta hai. Agar aapne 11 baar <code>.on()</code> lagaya, toh Node console mein 'Memory Leak Warning' de dega. Isko badhane ke liye <code>myEmitter.setMaxListeners(20)</code> set karna padta hai.
        </p>
      </div>

    </div>
  );
}