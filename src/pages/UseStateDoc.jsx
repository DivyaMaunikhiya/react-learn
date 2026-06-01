// src/pages/UseStateDoc.jsx
import React, { useState } from 'react';

export default function UseStateDoc() {
  // Demo 1 State
  const [count, setCount] = useState(0);

  // Demo 2 State (Interview Trap)
  const [score, setScore] = useState(0);

  // Demo 3 State (Object State)
  const [user, setUser] = useState({ name: 'sanyam', role: 'Backend Developer' });

  // Interview Demo Functions
  const incrementBad = () => {
    // Ye react me batch ho jayega, sirf ek baar +1 hoga
    setScore(score + 1);
    setScore(score + 1);
    setScore(score + 1);
  };

  const incrementGood = () => {
    // Ye previous state ko correctly catch karega, +3 hoga
    setScore(prev => prev + 1);
    setScore(prev => prev + 1);
    setScore(prev => prev + 1);
  };

  const handleNameChange = (e) => {
    // Spread operator is MUST for objects
    setUser({ ...user, name: e.target.value });
  };

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      {/* HEADER TITLE */}
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        1. useState Hook
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        React components by default apne variables ko yaad nahi rakhte. Agar aap normal variable (<code>let x = 10;</code>) ko update karoge, toh screen par change nahi dikhega. <code>useState</code> component ko ek <strong>"Memory"</strong> deta hai aur React ko batata hai ki "Bhai data badal gaya hai, screen ko fir se paint (re-render) karo."
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* SECTION 1: THE BASICS */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. The Basics: Syntax & Rules
      </h2>
      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`import { useState } from 'react';

// Destructuring array: [currentValue, updaterFunction]
const [count, setCount] = useState(0);`}
      </pre>
      <ul style={{ color: '#d1d5db', marginLeft: '20px', marginTop: '15px' }}>
        <li><strong>Rule 1:</strong> Hooks hamesha component ke top level par call hone chahiye. (Loops ya if-else ke andar nahi).</li>
        <li><strong>Rule 2:</strong> <code>setCount</code> function state ko update karta hai aur component ka re-render trigger karta hai.</li>
      </ul>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* SECTION 2: INTERVIEW TRAP 1 */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '10px' }}>
        2. Interview Question: The "Stale State" Trap
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Agar aap ek hi function me multiple times state update karte ho, toh kya hoga? React performance ke liye updates ko <strong>"Batch"</strong> karta hai. State updates <em>asynchronous</em> hote hain.
      </p>

      {/* Interactive Demo 2 */}
      <div style={{ background: '#2b303b', border: '1px solid #343a46', padding: '25px', borderRadius: '12px', margin: '20px 0' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '1.5rem' }}>Score: <span style={{ color: '#58c4dc' }}>{score}</span></h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button onClick={incrementBad} style={btnStyle('#dc2626', 'white')}>
            Bad Update (+3 Try)
          </button>
          <button onClick={incrementGood} style={btnStyle('#10b981', 'white')}>
            Good Update (+3 Success)
          </button>
          <button onClick={() => setScore(0)} style={btnStyle('transparent', '#9ca3af', '1px solid #343a46')}>
            Reset
          </button>
        </div>
        <p style={{ marginTop: '15px', fontSize: '0.9rem', color: '#9ca3af' }}>
          * Bad Update click karne par score sirf +1 hoga. Good update par +3 hoga.
        </p>
      </div>

      <h3 style={{ fontSize: '1.2rem', marginTop: '20px' }}>The Solution: Updater Function <code>(prev =&#62; prev + 1)</code></h3>
      <p style={{ color: '#d1d5db' }}>Jab bhi nayi state, purani state par depend kare, toh hamesha callback function use karo.</p>
      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`// ❌ WRONG (Interview Fail)
setScore(score + 1);
setScore(score + 1); // React still sees old score

// ✅ RIGHT (Interview Pass)
setScore(prevScore => prevScore + 1);
setScore(prevScore => prevScore + 1); // React passes the updated value internally`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* SECTION 3: OBJECTS AND ARRAYS */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '10px' }}>
        3. Objects & Arrays (The Immutability Rule)
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Backend me hum seedha <code>user.name = "John"</code> kar dete hain. React me ye <strong>sabse bada paap</strong> hai. React memory references compare karta hai. Agar aap object mutate karoge, toh reference change nahi hoga, aur React re-render nahi karega. Aapko <strong>Spread Operator (<code>...</code>)</strong> use karke naya object banana padta hai.
      </p>

      {/* Interactive Demo 3 */}
      <div style={{ background: '#2b303b', border: '1px solid #343a46', padding: '25px', borderRadius: '12px', margin: '20px 0' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#9ca3af' }}>Current State:</h3>
        <pre style={{ background: '#191c20', padding: '10px', borderRadius: '6px', color: '#58c4dc', fontSize: '0.9rem' }}>
          {JSON.stringify(user, null, 2)}
        </pre>
        
        <div style={{ marginTop: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#d1d5db' }}>Change Name:</label>
          <input 
            type="text" 
            value={user.name} 
            onChange={handleNameChange}
            style={{ padding: '10px', width: '100%', maxWidth: '300px', borderRadius: '6px', border: '1px solid #343a46', background: '#191c20', color: 'white' }}
          />
        </div>
      </div>

      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`// Updating an Object State properly
const handleNameChange = (e) => {
  setUser({ 
    ...user, // 1. Copy saari purani fields
    name: e.target.value // 2. Nayi field ko overwrite karo
  });
};`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* SECTION 4: LAZY INITIALIZATION */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '10px' }}>
        4. Lazy Initialization (Performance Optimization)
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Man lo initial state kisi heavy calculation ya <code>localStorage</code> se aati hai. Normal <code>useState(heavyFunction())</code> likhne par wo function har render par chalega. Ise rokne ke liye hum ek arrow function pass karte hain: <code>useState(() =&#62; heavyFunction())</code>. Ise Lazy Initialization kehte hain, jisse function sirf pehli baar mount hone par chalta hai.
      </p>

      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`// ❌ Function runs on EVERY render (Slow)
const [data, setData] = useState(calculateHugeData());

// ✅ Function runs ONLY on first render (Fast)
const [data, setData] = useState(() => calculateHugeData());`}
      </pre>

    </div>
  );
}

// Helper Style Function
const btnStyle = (bg, color, border = 'none') => ({
  padding: '12px 20px', 
  backgroundColor: bg, 
  color: color, 
  border: border, 
  borderRadius: '8px', 
  cursor: 'pointer', 
  fontWeight: 'bold', 
  fontSize: '0.95rem'
});