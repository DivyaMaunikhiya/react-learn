// src/pages/UseRefDoc.jsx
import React, { useState, useRef } from 'react';

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

export default function UseRefDoc() {
  // ==========================================
  // DEMO 1: DOM Reference
  // ==========================================
  const inputRef = useRef(null); // Initial value null

  const handleFocus = () => {
    // Direct DOM element ko access karke focus() call kar rahe hain
    inputRef.current.focus();
    inputRef.current.style.border = "2px solid #58c4dc"; // Direct style change
  };

  // ==========================================
  // DEMO 2: Secret Memory (Stopwatch)
  // ==========================================
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null); // Timer ki ID store karne ke liye "Secret Dibba"

  const startTimer = () => {
    // Agar timer already chal raha hai, toh doosra start mat karo
    if (timerRef.current !== null) return; 
    
    timerRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    console.log("Timer started with ID:", timerRef.current);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null; // Reset the ref
    console.log("Timer stopped.");
  };

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        5. useRef Hook
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        <code>useRef</code> component ko ek <strong>"Secret Box"</strong> deta hai. Is box ke andar aap kuch bhi daal sakte ho. Jab aap <code>useState</code> ko update karte ho, toh component re-render hota hai. Par jab aap <code>useRef</code> ke andar ka data update karte ho, toh React chup rehta hai (no re-render). Iske 2 main use cases hote hain:
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: DOM MANIPULATION ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        UseCase 1: Direct DOM Access
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Vanilla JS me hum <code>document.getElementById()</code> use karte the. React me direct DOM chhedna mana hai, isliye hum input ya div par <code>ref={`{inputRef}`}</code> laga dete hain. Fir hum usko backend style me control kar sakte hain.
      </p>

      <div style={boxStyle('#343a46')}>
        <h3 style={{ margin: '0 0 15px 0', color: '#58c4dc' }}>Live Demo: Auto Focus</h3>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <input 
            ref={inputRef} // Yahan hook ko input se jod diya
            type="text" 
            placeholder="Click button to focus me..." 
            style={{ padding: '12px', borderRadius: '6px', border: '1px solid #343a46', background: '#2b303b', color: 'white', width: '250px', outline: 'none' }}
          />
          <button onClick={handleFocus} style={btnStyle('#3b82f6', 'white')}>Focus Input</button>
        </div>
      </div>

      <h3 style={{ marginTop: '20px' }}>Syntax:</h3>
      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '15px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`const myInput = useRef(null);

// JSX me attach karo
<input ref={myInput} />

// Function me access karo (Hamesha .current use karna hota hai)
myInput.current.focus();`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: MUTABLE STATE (NO RE-RENDER) ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        UseCase 2: The Secret Variable (No Re-renders)
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Agar aapko setInterval ki ID save karni hai jisse baad me clearInterval kiya ja sake, toh aap use kahan store karoge? <br/>
        ❌ Normal variable (<code>let id;</code>): Har render par zero ho jayega.<br/>
        ❌ <code>useState</code>: ID update hone par faltu ka UI re-render ho jayega.<br/>
        ✅ <strong><code>useRef</code></strong>: Best choice. Data safe rahega, par UI update trigger nahi karega.
      </p>

      <div style={boxStyle('#343a46')}>
        <h3 style={{ margin: '0 0 15px 0', color: '#58c4dc' }}>Live Demo: Stopwatch</h3>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '2.5rem' }}>{seconds}s</h2>
        
        <button onClick={startTimer} style={btnStyle('#10b981', 'white')}>Start Timer</button>
        <button onClick={stopTimer} style={btnStyle('#dc2626', 'white')}>Stop Timer</button>
        <button 
          onClick={() => { stopTimer(); setSeconds(0); }} 
          style={btnStyle('transparent', '#9ca3af')}
        >
          Reset
        </button>
      </div>

      <h3 style={{ marginTop: '20px' }}>Syntax:</h3>

      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '15px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`import { useState, useRef } from 'react';

function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  
  // 1. Create Ref (Ye hamara secret dibba hai)
  const timerId = useRef(null);

  const startTimer = () => {
    // Agar timer already chal raha hai, toh doosra start mat karo
    if (timerId.current !== null) return; 
    
    // 2. Save Data (Interval ID save ki, bina component re-render kiye)
    timerId.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    // 3. Read/Use Data (Us ID ko use karke timer roka)
    clearInterval(timerId.current);
    timerId.current = null; // Ref ko reset kar diya
  };

  return (
    <div>
      <h2>{seconds}s</h2>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 3: COMPARISON TABLE ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        State vs Ref (Interview Table)
      </h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#191c20', borderRadius: '8px', overflow: 'hidden' }}>
          <thead style={{ background: '#343a46', color: '#f6f7f9' }}>
            <tr>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f' }}>Feature</th>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f' }}><code>useState</code></th>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f' }}><code>useRef</code></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>Triggers Re-render?</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#10b981' }}>Yes ✅</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#dc2626' }}>No ❌</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>Value Persists on Render?</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#10b981' }}>Yes ✅</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#10b981' }}>Yes ✅</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>When to use?</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>Jo data screen par dikhana ho (Counter, text input).</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>Behind the scenes data (Timer IDs, previous state).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', borderLeft: '4px solid #eab308', padding: '15px', borderRadius: '0 8px 8px 0', marginTop: '30px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#eab308' }}>⚠️ Golden Rule</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          Kabhi bhi <code>ref.current</code> ki value ko UI me seedha render karne ki koshish mat karna (jaise <code>{`<h1>{myRef.current}</h1>`}</code>). Kyunki jab ye update hoga, toh UI refresh nahi hoga, aur user ko purana data hi dikhta rahega. UI dikhane ke liye sirf state ka use karo!
        </p>
      </div>

    </div>
  );
}