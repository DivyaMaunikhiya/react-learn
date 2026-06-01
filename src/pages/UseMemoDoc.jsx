// src/pages/UseMemoDoc.jsx
import React, { useState, useMemo } from 'react';

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
// HEAVY FUNCTION (Simulating an expensive task)
// ==========================================
const slowFunction = (num) => {
  console.log("Calling Slow Function...");
  // Ek bada loop jo CPU ko thodi der block karega (Lag create karne ke liye)
  for (let i = 0; i <= 500000000; i++) {} 
  return num * 2;
};

export default function UseMemoDoc() {
  const [number, setNumber] = useState(0);
  const [darkTheme, setDarkTheme] = useState(true);

  // ❌ BINA MEMO KE: Har render par chalega, lag karega!
  // const doubleNumber = slowFunction(number);

  // ✅ USE MEMO KE SATH: Sirf tab chalega jab 'number' change hoga
  const doubleNumber = useMemo(() => {
    return slowFunction(number);
  }, [number]); // Dependency Array

  // Theme object - (Iska secret use-case hum pro-tips me padhenge)
  const themeStyles = useMemo(() => {
    return {
      backgroundColor: darkTheme ? '#191c20' : '#f6f7f9',
      color: darkTheme ? '#f6f7f9' : '#191c20',
      padding: '20px',
      borderRadius: '8px',
      transition: 'all 0.3s ease'
    };
  }, [darkTheme]);

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        8. useMemo Hook
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        <code>useMemo</code> ka matlab hai <strong>"Memoization" (Caching)</strong>. Jab component me koi heavy math calculation ya data filtering hoti hai, toh har render par processor slow ho jata hai. <code>useMemo</code> us result ko cache kar leta hai, aur jab tak input change na ho, purana cached result hi return karta hai.
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: LIVE DEMO ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. Live Interview Demo: The Heavy Calculation
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Neeche ek number hai aur ek Theme Toggle button. Agar `useMemo` na ho, toh Theme change karne par bhi lag aayega kyunki React pura page fir se paint karte waqt heavy loop chalayega. <code>useMemo</code> is lag ko rokta hai.
      </p>

      <div style={boxStyle('#343a46')}>
        <div style={themeStyles}>
          <h3 style={{ margin: '0 0 15px 0' }}>Result: {doubleNumber}</h3>
          
          <input 
            type="number" 
            value={number} 
            onChange={(e) => setNumber(parseInt(e.target.value) || 0)} 
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #9ca3af', marginBottom: '15px', display: 'block', width: '200px' }}
          />

          {/* Ye button component ko re-render karega, par math dobara nahi hoga! */}
          <button 
            onClick={() => setDarkTheme(prevTheme => !prevTheme)} 
            style={btnStyle(darkTheme ? '#58c4dc' : '#343a46', darkTheme ? '#191c20' : 'white')}
          >
            Change Theme (Instant)
          </button>
        </div>
        <p style={{ margin: '15px 0 0 0', fontSize: '0.9rem', color: '#9ca3af' }}>
          * Number change karne par halka lag aayega (Expected). Theme change par koi lag nahi aayega (Optimized). Console khol kar dekho function kab call ho raha hai!
        </p>
      </div>

      <h3 style={{ marginTop: '30px' }}>Code Pattern:</h3>
      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`import { useMemo } from 'react';

// useMemo ek arrow function aur dependency array leta hai
const cachedResult = useMemo(() => {
  return heavyCalculation(data);
}, [data]); // Sirf tab recalculate hoga jab 'data' badlega`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: INTERVIEW PRO TIPS ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. Interview Masterclass: Kab use karein, kab nahi?
      </h2>

      <div style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', borderLeft: '4px solid #dc2626', padding: '15px', borderRadius: '0 8px 8px 0', marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>❌ Trap: Premature Optimization</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          Interviewer puchega: <em>"Kya main har variable par useMemo laga du?"</em> <br/>
          <strong>Your Answer:</strong> "Bilkul nahi! <code>useMemo</code> khud ek memory kharch karta hai (cache store karne ke liye). Agar calculation simple hai (jaise <code>a + b</code> ya array map), toh simple calculation memory caching se fast hoti hai. Ise sirf <strong>Expensive Computations</strong> (heavy for-loops, sorting large data) ke liye use karna chahiye."
        </p>
      </div>

      <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderLeft: '4px solid #10b981', padding: '15px', borderRadius: '0 8px 8px 0' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#10b981' }}>✅ The Secret Use-Case: Referential Equality</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          Backend me hume pata hai ki <code>{"{}"} === {"{}"}</code> false hota hai kyunki unka memory address alag hota hai. React me agar aap kisi child component ko ek Object ya Array as a prop bhejte ho, toh har render par wo naya object banata hai, jisse <code>React.memo</code> fail ho jata hai. <br/><br/>
          <strong>Solution:</strong> Us object ko <code>useMemo</code> me daal do! Isse us object ka memory address freeze (cache) ho jayega, aur child bewajah re-render nahi hoga.
        </p>
      </div>

    </div>
  );
}