// src/pages/UseEffectDoc.jsx
import React, { useState, useEffect } from 'react';

// Ek chota Timer component demo ke liye
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // 1. Mount (Ye code tab chalega jab component screen par aayega)
    console.log("Timer Started! (Mounted)");
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // 2. Unmount (Ye Cleanup Function tab chalega jab component screen se hatega)
    return () => {
      console.log("Timer Stopped! (Unmounted)");
      clearInterval(intervalId); // Memory leak bachane ke liye
    };
  }, []); // Empty array means run ONLY ONCE on mount

  return (
    <div style={{ background: '#191c20', padding: '15px', borderRadius: '8px', border: '1px dashed #58c4dc', textAlign: 'center' }}>
      <h3 style={{ margin: 0, color: '#f6f7f9' }}>Timer: <span style={{ color: '#58c4dc' }}>{seconds}s</span></h3>
      <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#9ca3af' }}>Open console to see Mount/Unmount logs</p>
    </div>
  );
}

export default function UseEffectDoc() {
  const [showTimer, setShowTimer] = useState(false);
  const [count, setCount] = useState(0);

  // Normal useEffect example
  useEffect(() => {
document.title = `Count is ${count}`;
  }, [count]);

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        2. useEffect Hook
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        React components ka main kaam UI render karna hai. Lekin jab aapko bahari duniya se baat karni ho (jaise API se data lana, setInterval lagana, ya direct DOM change karna), toh hum use <strong>"Side Effects"</strong> kehte hain. <code>useEffect</code> inhi side effects ko handle karta hai. 
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. Live Interview Demo: The Cleanup Function
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Backend devs dhyan dein: Agar aap event listener ya timer start karte ho, toh component destroy hone par usko rokna padta hai warna <strong>Memory Leak</strong> ho jayega. Ye <code>return</code> function ke through hota hai (jise purane time me <code>componentWillUnmount</code> kehte the).
      </p>

      {/* Interactive Demo */}
      <div style={{ background: '#2b303b', border: '1px solid #343a46', padding: '25px', borderRadius: '12px', margin: '20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
          <button 
            onClick={() => setShowTimer(!showTimer)} 
            style={btnStyle(showTimer ? '#dc2626' : '#10b981', 'white')}
          >
            {showTimer ? 'Destroy Timer (Unmount)' : 'Create Timer (Mount)'}
          </button>
        </div>
        {showTimer && <Timer />}
      </div>

      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`useEffect(() => {
  // Action (Subscribe, API Call, Timer)
  const timer = setInterval(() => console.log('Running...'), 1000);

  // Cleanup Function (Unsubscribe, Clear Timer)
  return () => {
    clearInterval(timer);
  };
}, []); // Empty array = Only run on Mount`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. API Data Fetching (The Right Way)
      </h2>
      <p style={{ color: '#d1d5db' }}>
        <code>useEffect</code> ke andar function ko <code>async</code> nahi bana sakte. Aapko uske andar ek async function banakar use call karna hota hai.
      </p>

      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`useEffect(() => {
  // 1. Declare async function inside
  const fetchUserData = async () => {
    const response = await fetch('/api/user/1');
    const data = await response.json();
    setUserData(data);
  };

  // 2. Call it
  fetchUserData();
}, []);`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* THE CHEAT SHEET TABLE */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        3. Dependency Array: The Cheat Sheet
      </h2>
      <p style={{ color: '#d1d5db', marginBottom: '20px' }}>
        <code>useEffect</code> kab chalega, ye pura control uske aage lage <strong>Array <code>[]</code></strong> par depend karta hai. Is table ko rat lo, interview me yahi puchte hain.
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#191c20', borderRadius: '8px', overflow: 'hidden' }}>
          <thead style={{ background: '#343a46', color: '#f6f7f9' }}>
            <tr>
              <th style={thStyle}>Syntax</th>
              <th style={thStyle}>Ye Kab Chalega? (When it runs)</th>
              <th style={thStyle}>Use Case (Kab use karein?)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={trStyle}>
              <td style={tdStyle}><code>useEffect(() ={'>'} {'{...}'})</code><br/><span style={{color:'#dc2626', fontSize:'0.85rem'}}>No Array</span></td>
              <td style={tdStyle}>Har ek Render par (Mount hone par bhi aur koi bhi state update hone par bhi).</td>
              <td style={tdStyle}>DANGEROUS ⚠️ Isko rarely use karte hain. Isse Infinite loop API call lag sakti hai.</td>
            </tr>
            <tr style={trStyle}>
              <td style={tdStyle}><code>useEffect(() ={'>'} {'{...}'}, [])</code><br/><span style={{color:'#10b981', fontSize:'0.85rem'}}>Empty Array</span></td>
              <td style={tdStyle}>Sirf ek baar. Component load (Mount) hone par.</td>
              <td style={tdStyle}>Initial API fetch, Events attach karna, Timer start karna.</td>
            </tr>
            <tr style={trStyle}>
              <td style={tdStyle}><code>useEffect(() ={'>'} {'{...}'}, [x, y])</code><br/><span style={{color:'#58c4dc', fontSize:'0.85rem'}}>Variables in Array</span></td>
              <td style={tdStyle}>Mount hone par, AUR jab bhi <code>x</code> ya <code>y</code> ki value change hogi tab.</td>
              <td style={tdStyle}>Search bar typing (Debounce API calls), Filter change hone par naya data lana.</td>
            </tr>
            <tr style={trStyle}>
              <td style={tdStyle}><code>return () ={'>'} {'{...}'}</code><br/><span style={{color:'#eab308', fontSize:'0.85rem'}}>Inside useEffect</span></td>
              <td style={tdStyle}>Component destroy (Unmount) hone par, ya effect dobara chalne se theek pehle.</td>
              <td style={tdStyle}>Cleanup! <code>clearInterval</code>, <code>removeEventListener</code>, API request cancel karna.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

// Helper Styles
const btnStyle = (bg, color) => ({
  padding: '10px 18px', backgroundColor: bg, color: color, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: 'opacity 0.2s'
});

const thStyle = { padding: '15px', borderBottom: '2px solid #23272f' };
const tdStyle = { padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db', verticalAlign: 'top' };
const trStyle = { transition: 'background-color 0.2s', ':hover': { backgroundColor: '#2b303b' } };