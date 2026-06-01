// src/pages/UsePropsDoc.jsx
import React, { useState } from 'react';

// Helper Styles (Top par rakhe hain taaki errors na aaye)
const btnStyle = (bg, color) => ({
  padding: '10px 18px', 
  backgroundColor: bg, 
  color: color, 
  border: 'none', 
  borderRadius: '6px', 
  cursor: 'pointer', 
  fontWeight: 'bold', 
  transition: 'opacity 0.2s',
  marginRight: '10px'
});

const boxStyle = (borderColor) => ({
  padding: '15px',
  border: `2px dashed ${borderColor}`,
  borderRadius: '8px',
  marginTop: '10px',
  backgroundColor: '#191c20'
});

// ==========================================
// THE PROP DRILLING DEMO COMPONENTS
// ==========================================

// 3. Sabse Deep Child (Isko actual data chahiye)
function DancingSharkCharacter({ trackName }) {
  return (
    <div style={boxStyle('#58c4dc')}>
      <h4 style={{ margin: '0 0 10px 0', color: '#58c4dc' }}>Level 3: Deep Child Component</h4>
      <p style={{ margin: 0, fontSize: '1.2rem' }}>
        🦈 Joyful Cartoon Baby Shark is currently dancing to: <br/>
        <strong style={{ color: '#10b981', fontSize: '1.4rem' }}>"{trackName}"</strong>
      </p>
    </div>
  );
}

// 2. Middle Child (Isko data nahi chahiye, par aage bhejna padega)
function UnderwaterScene({ trackName }) {
  return (
    <div style={boxStyle('#eab308')}>
      <h4 style={{ margin: '0 0 10px 0', color: '#eab308' }}>Level 2: Middle Component</h4>
      <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#9ca3af' }}>
        (Mujhe is gane se koi matlab nahi, main bas Prop pass kar raha hu...)
      </p>
      {/* Prop ko aage forward kiya */}
      <DancingSharkCharacter trackName={trackName} />
    </div>
  );
}

// ==========================================
// MAIN EXPORT COMPONENT
// ==========================================

export default function UsePropsDoc() {
  // 1. Parent Component ki State
  const [song, setSong] = useState('Count Up To Three Splash');

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        3. Props & Prop Drilling
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        <strong>Props (Properties)</strong> React ka tarika hai ek component se doosre component me data bhejne ka. Jaise backend me functions parameters lete hain, waise hi React components props lete hain. Props hamesha <strong>Top se Bottom</strong> (Parent se Child) flow karte hain.
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. What is Prop Drilling? (The Interview Trap)
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Maan lo aapke paas 10 levels deep components hain. Data sirf Parent aur 10th Child ko chahiye. Lekin data wahan tak pahunchane ke liye aapko beech ke 8 components se wo data pass karna padega, bhale hi unhe uski zaroorat na ho. Is "zabardasti ki passing" ko <strong>Prop Drilling</strong> kehte hain.
      </p>

      {/* Interactive Demo */}
      <div style={{ background: '#2b303b', border: '1px solid #343a46', padding: '25px', borderRadius: '12px', margin: '20px 0' }}>
        
        <div style={boxStyle('#dc2626')}>
          <h3 style={{ margin: '0 0 15px 0', color: '#dc2626' }}>Level 1: Top Parent (Holds State)</h3>
          
          <button 
            onClick={() => setSong('Wiggle Your Shoulders')} 
            style={btnStyle('#dc2626', 'white')}
          >
            Play Dance Track
          </button>
          
          <button 
            onClick={() => setSong('Count Up To Three Splash')} 
            style={btnStyle('#3b82f6', 'white')}
          >
            Play Splash Track
          </button>

          <div style={{ marginTop: '20px' }}>
            {/* Prop pass kiya child ko */}
            <UnderwaterScene trackName={song} />
          </div>
        </div>

      </div>

      <h3 style={{ marginTop: '30px' }}>Code Implementation:</h3>
      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`// 1. TOP PARENT (Has the state)
function App() {
  const [song, setSong] = useState('Count Up To Three');
  // Passing 'song' to Scene
  return <UnderwaterScene trackName={song} />;
}

// 2. MIDDLE CHILD (Prop Driller - Doesn't use the data)
function UnderwaterScene({ trackName }) {
  // Just passing it down to Character
  return <DancingSharkCharacter trackName={trackName} />;
}

// 3. DEEP CHILD (Actually uses the data)
function DancingSharkCharacter({ trackName }) {
  return <h1>Shark is dancing to: {trackName}</h1>;
}`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. Pro-Tips for Backend Devs
      </h2>

      <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', borderLeft: '4px solid #eab308', padding: '15px', borderRadius: '0 8px 8px 0', marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#eab308' }}>🔒 Props are Read-Only (Immutable)</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          Child component kabhi bhi apne props ko modify nahi kar sakta. Agar child ko parent ka data change karna hai, toh parent ko ek function (jaise <code>setSong</code>) as a prop pass karna padega, jise child call karega.
        </p>
      </div>

      <div style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', borderLeft: '4px solid #dc2626', padding: '15px', borderRadius: '0 8px 8px 0' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>💀 Why is Prop Drilling Bad?</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          Jab middle components unnecessarily props pass karte hain, toh code padhne me mushkil ho jata hai. Agar kal ko prop ka naam change karna ho, toh saari files update karni padengi. Iska solution hum <strong>Context API (useContext)</strong> me dekhenge.
        </p>
      </div>

    </div>
  );
}