// src/pages/UseCustomHookDoc.jsx
import React, { useState } from 'react';

// ==========================================
// HELPER STYLES
// ==========================================
const btnStyle = (bg, color) => ({
  padding: '8px 14px', backgroundColor: bg, color: color, border: 'none', 
  borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: 'opacity 0.2s', marginRight: '8px', marginBottom: '8px'
});

const boxStyle = (borderColor) => ({
  padding: '20px', border: `1px solid ${borderColor}`, borderRadius: '8px', 
  marginTop: '15px', backgroundColor: '#191c20'
});

// ==========================================
// 1. THE CUSTOM HOOK (Our Utility Function)
// ==========================================
// Custom hooks ka naam hamesha 'use' se shuru hona chahiye
function useAnimationController(initialCharacter) {
  const [character, setCharacter] = useState(initialCharacter);
  const [action, setAction] = useState('Idle');

  // Specific control functions (encapsulating the logic)
  const performDance = () => setAction('Synchronized Dancing 🎵');
  const performSplash = () => setAction('Count Up To 3 Splash! 💦');
  const performSpin = () => setAction('Spinning Fast 🌪️');
  const resetAction = () => setAction('Idle');

  // Hook returns the state and the specific functions to modify it
  return { 
    character, 
    action, 
    performDance, 
    performSplash, 
    performSpin, 
    resetAction 
  };
}

// ==========================================
// MAIN EXPORT COMPONENT
// ==========================================
export default function UseCustomHookDoc() {
  // 2. USING THE CUSTOM HOOK
  // Dekho code kitna clean ho gaya! Koi useState/logic UI component me nahi hai.
  const sharkAnim = useAnimationController('Joyful Baby Shark 🦈');
  const whaleAnim = useAnimationController('Happy Cartoon Whale 🐳');

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        11. Custom Hooks
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        Custom Hooks actually mein koi naya React feature nahi hain. Ye sirf normal JavaScript functions hain jinke andar hum built-in hooks (<code>useState</code>, <code>useEffect</code>) ka use karte hain. Ye humein component ka UI aur uska complex business logic alag-alag rakhne me madad karte hain.
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: LIVE DEMO ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. Live Demo: Independent Animation Controllers
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Neeche do alag characters hain. Dono same <code>useAnimationController</code> hook use kar rahe hain, par dekho kaise dono ki state ekdum independent (alag) hai!
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Character 1 */}
        <div style={boxStyle('#3b82f6')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#3b82f6' }}>{sharkAnim.character}</h3>
          <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
            Current Action: <strong style={{ color: '#f6f7f9' }}>{sharkAnim.action}</strong>
          </p>
          <button onClick={sharkAnim.performDance} style={btnStyle('#3b82f6', 'white')}>Dance</button>
          <button onClick={sharkAnim.performSplash} style={btnStyle('#10b981', 'white')}>Splash</button>
          <button onClick={sharkAnim.resetAction} style={btnStyle('transparent', '#9ca3af')}>Stop</button>
        </div>

        {/* Character 2 */}
        <div style={boxStyle('#8b5cf6')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#8b5cf6' }}>{whaleAnim.character}</h3>
          <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
            Current Action: <strong style={{ color: '#f6f7f9' }}>{whaleAnim.action}</strong>
          </p>
          <button onClick={whaleAnim.performSpin} style={btnStyle('#8b5cf6', 'white')}>Spin</button>
          <button onClick={whaleAnim.performDance} style={btnStyle('#3b82f6', 'white')}>Dance</button>
          <button onClick={whaleAnim.resetAction} style={btnStyle('transparent', '#9ca3af')}>Stop</button>
        </div>

      </div>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: CODE PATTERN ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. How to create one? (Syntax)
      </h2>
      
      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`// 1. Hook banate waqt naam 'use' se start karein
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  // Logic encapsulate kar diya
  const toggle = () => setValue(prev => !prev);

  // Jo component ko chahiye wo return kar do (Array ya Object)
  return [value, toggle];
}

// 2. Component me use karein
function LightSwitch() {
  const [isOn, toggleIsOn] = useToggle(false); // Clean UI!

  return <button onClick={toggleIsOn}>{isOn ? 'Off' : 'On'}</button>;
}`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 3: INTERVIEW TRAPS ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        3. The Interview Traps 🪤
      </h2>

      <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', borderLeft: '4px solid #eab308', padding: '15px', borderRadius: '0 8px 8px 0', marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#eab308' }}>Trap 1: "Kya Custom Hook use karne se components ki state share hoti hai?"</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          <strong>Answer: "Nahi!"</strong> Custom Hook sirf *stateful logic* share karta hai, khud state ko nahi. Har baar jab aap custom hook call karte ho (jaise upar Shark aur Whale ne kiya), toh React completely isolated state memory banata hai. Agar state share karni hai toh Context API ya Redux use karna padega.
        </p>
      </div>

      <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', padding: '15px', borderRadius: '0 8px 8px 0' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#3b82f6' }}>Trap 2: "Custom hook ka naam 'use' se shuru karna zaroori hai kya?"</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          <strong>Answer: "Haan!"</strong> Ye sirf convention nahi hai, React ka linter strictly isko enforce karta hai. Agar function ka naam <code>use</code> se shuru nahi hoga, toh React ko pata nahi chalega ki iske andar hooks hain, aur wo hook ke rules (jaise "don't call in loops") check nahi kar payega.
        </p>
      </div>

    </div>
  );
}