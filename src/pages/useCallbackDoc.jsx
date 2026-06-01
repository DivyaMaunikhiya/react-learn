// src/pages/UseCallbackDoc.jsx
import React, { useState, useCallback, memo, useRef } from 'react';

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

// ==========================================
// CHILD COMPONENT (Memoized)
// ==========================================
// React.memo tabhi kaam karega jab props change na hon.
const SalaryButton = memo(({ onIncrement, type }) => {
  const renderCount = useRef(0);
  renderCount.current++;

  const isGood = type === 'Good';
  const color = isGood ? '#10b981' : '#dc2626';

  return (
    <div style={{ border: `1px dashed ${color}`, padding: '15px', borderRadius: '8px', marginTop: '10px' }}>
      <p style={{ margin: '0 0 10px 0', color: color }}>
        {isGood ? '✅ Optimized Child' : '❌ Un-optimized Child'}
      </p>
      <button onClick={onIncrement} style={btnStyle(color, 'white')}>
        Increase Salary
      </button>
      <p style={{ margin: '10px 0 0 0', fontSize: '0.9rem', color: '#9ca3af' }}>
        Render Count: <strong style={{ color: color }}>{renderCount.current}</strong>
      </p>
    </div>
  );
});

// ==========================================
// MAIN EXPORT COMPONENT
// ==========================================
export default function UseCallbackDoc() {
  const [age, setAge] = useState(25);
  const [salary, setSalary] = useState(50000);

  // ❌ BINA CALLBACK KE: Har render par naya function memory me banega
  const incrementSalaryBad = () => {
    setSalary(s => s + 5000);
  };

  // ✅ CALLBACK KE SATH: Function memory reference freeze ho jayega
  const incrementSalaryGood = useCallback(() => {
    setSalary(s => s + 5000);
  }, []); // Empty array = never recreate this function

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        9. useCallback Hook
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        <code>useMemo</code> function ka <strong>Result (Value)</strong> cache karta hai, jabki <code>useCallback</code> pura ka pura <strong>Function Definition</strong> hi cache kar leta hai. Ye sabse zyada tab kaam aata hai jab hum kisi child component ko (jo <code>React.memo</code> se wrapped ho) ek function as a prop bhej rahe hote hain.
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: LIVE DEMO ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. Live Demo: The Broken Memo
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Jab aap "Increase Age" par click karoge, toh parent component re-render hoga. Dhyan se dekhna ki kaunsa child faltu me re-render ho raha hai (bhale hi unki salary change nahi hui).
      </p>

      <div style={boxStyle('#343a46')}>
        <div style={{ display: 'flex', gap: '30px', marginBottom: '20px' }}>
          <div>
            <h3 style={{ margin: '0 0 10px 0', color: '#f6f7f9' }}>Age: <span style={{color: '#58c4dc'}}>{age}</span></h3>
            <button onClick={() => setAge(age + 1)} style={btnStyle('#3b82f6', 'white')}>
              Increase Age (Triggers Render)
            </button>
          </div>
          <div>
            <h3 style={{ margin: '0 0 10px 0', color: '#f6f7f9' }}>Salary: <span style={{color: '#10b981'}}>₹{salary}</span></h3>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Ye function har baar naya banta hai, toh React.memo fail ho jata hai */}
          <SalaryButton type="Bad" onIncrement={incrementSalaryBad} />
          
          {/* Ye function cached hai, toh React.memo ko pata chal jata hai ki kuch nahi badla */}
          <SalaryButton type="Good" onIncrement={incrementSalaryGood} />
        </div>
      </div>

      <h3 style={{ marginTop: '30px' }}>Code Implementation:</h3>
      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`import { useCallback } from 'react';

// useCallback wrap karta hai function definition ko
const handleClick = useCallback(() => {
  // Ye logic tab tak nahi badlega jab tak dependencies na badlen
  doSomethingComplex(userId);
}, [userId]); // Dependency Array`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: THE INTERVIEW CHEAT SHEET ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. The Interview Cheat Sheet 🔥
      </h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#191c20', borderRadius: '8px', overflow: 'hidden' }}>
          <thead style={{ background: '#343a46', color: '#f6f7f9' }}>
            <tr>
              <th style={{ padding: '15px' }}>Hook</th>
              <th style={{ padding: '15px' }}>Kya Cache Karta Hai?</th>
              <th style={{ padding: '15px' }}>Return Kya Karta Hai?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#58c4dc', fontWeight: 'bold' }}>useMemo</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>Function ka Result (Value / Object)</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}><code>[1, 2, 3]</code> ya <code>42</code></td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#10b981', fontWeight: 'bold' }}>useCallback</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>Function khud (Memory Reference)</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}><code>() =&gt; {'{ ... }'}</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', borderLeft: '4px solid #eab308', padding: '15px', borderRadius: '0 8px 8px 0', marginTop: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#eab308' }}>⚠️ Sabse Badi Galti (The Red Flag)</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          Agar aap ek aam HTML element (jaise <code>{`<button onClick={handleClick}>`}</code>) par function pass kar rahe ho, toh us par <code>useCallback</code> lagana <strong>Total Waste</strong> hai. HTML buttons re-render hone se koi lag nahi aata. <br/><br/>
          <code>useCallback</code> <strong>SIRF TABHI</strong> use karo jab aap us function ko kisi Custom Child Component (jo <code>React.memo</code> se optimize kiya gaya ho) ko as a prop pass kar rahe ho.
        </p>
      </div>

    </div>
  );
}