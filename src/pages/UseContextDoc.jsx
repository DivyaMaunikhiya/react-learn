// src/pages/UseContextDoc.jsx
import React, { useState, createContext, useContext } from 'react';

// ==========================================
// HELPER STYLES
// ==========================================
const btnStyle = (bg, color) => ({
  padding: '10px 18px', backgroundColor: bg, color: color, border: 'none', 
  borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: 'opacity 0.2s'
});

const boxStyle = (borderColor) => ({
  padding: '15px', border: `2px solid ${borderColor}`, borderRadius: '8px', 
  marginTop: '15px', backgroundColor: '#191c20'
});

// ==========================================
// 1. CREATE CONTEXTS (The Global Stores)
// ==========================================
// Demo 1 ke liye (Read Only)
const AuthContext = createContext();
// Demo 2 ke liye (Update & Set)
const AnimationContext = createContext();


// ==========================================
// DEMO 1 COMPONENTS (READ ONLY)
// ==========================================
function UserProfile() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div style={boxStyle('#10b981')}>
      <h4 style={{ margin: '0 0 10px 0', color: '#10b981' }}>Level 3: User Profile (Deep Child)</h4>
      {user ? (
        <div>
          <p style={{ margin: '0 0 10px 0' }}>Welcome back, <strong style={{color: '#58c4dc'}}>{user.name}</strong>!</p>
          <button onClick={logout} style={btnStyle('#dc2626', 'white')}>Logout</button>
        </div>
      ) : (
        <p style={{ margin: 0, color: '#dc2626' }}>Please log in from the top level.</p>
      )}
    </div>
  );
}

function Dashboard() {
  return (
    <div style={boxStyle('#eab308')}>
      <h4 style={{ margin: '0 0 10px 0', color: '#eab308' }}>Level 2: Dashboard (Middle Child)</h4>
      <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#9ca3af' }}>No props passed here!</p>
      <UserProfile />
    </div>
  );
}

// ==========================================
// DEMO 2 COMPONENTS (SET & UPDATE)
// ==========================================
function DeepControlPanel() {
  // Extracting both state AND setter function
  const { character, setCharacter } = useContext(AnimationContext);

  const handleActionChange = (e) => {
    setCharacter({ ...character, action: e.target.value });
  };

  return (
    <div style={boxStyle('#10b981')}>
      <h4 style={{ margin: '0 0 10px 0', color: '#10b981' }}>Level 3: Deep Control Panel</h4>
      <p style={{ margin: '0 0 10px 0', color: '#d1d5db' }}>
        Editing Character: <strong style={{ color: '#58c4dc' }}>{character.name}</strong>
      </p>
      <label style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Change Global Action:</label>
      <select 
        value={character.action} 
        onChange={handleActionChange}
        style={{ display: 'block', marginTop: '5px', padding: '8px', width: '100%', borderRadius: '4px', background: '#2b303b', color: 'white', border: '1px solid #343a46' }}
      >
        <option value="Synchronized Dancing">Synchronized Dancing</option>
        <option value="Interactive Countdown">Interactive Countdown</option>
        <option value="Spinning Fast">Spinning Fast</option>
      </select>
    </div>
  );
}

function SceneRenderer() {
  return (
    <div style={boxStyle('#eab308')}>
      <h4 style={{ margin: '0 0 10px 0', color: '#eab308' }}>Level 2: Scene Renderer</h4>
      <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#9ca3af' }}>No props passed here either!</p>
      <DeepControlPanel />
    </div>
  );
}

// ==========================================
// MAIN EXPORT COMPONENT
// ==========================================
export default function UseContextDoc() {
  // State for Demo 1
  const [user, setUser] = useState(null);
  const login = () => setUser({ name: 'Backend Ninja', role: 'System Architect' });
  const logout = () => setUser(null);

  // State for Demo 2
  const [character, setCharacter] = useState({ 
    name: 'Joyful Baby Shark', 
    action: 'Synchronized Dancing' 
  });

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        4. useContext Hook
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        Context API React ka built-in solution hai <strong>Prop Drilling</strong> ko khatam karne ke liye. Jab aapke paas aisa data ho jo poori app me kahin bhi chahiye ho (jaise Logged-in User ya Theme), toh hum Context banate hain taaki koi bhi component us data ko seedha "Teleport" kar sake. 
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: READ ONLY DEMO ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. Live Demo: Reading Global State
      </h2>
      <p style={{ color: '#d1d5db' }}>Level 1 se data direct Level 3 tak ja raha hai, without props.</p>

      <div style={{ background: '#2b303b', border: '1px solid #343a46', padding: '25px', borderRadius: '12px', margin: '20px 0' }}>
        <AuthContext.Provider value={{ user, logout }}>
          <div style={boxStyle('#58c4dc')}>
            <h3 style={{ margin: '0 0 15px 0', color: '#58c4dc' }}>Level 1: Top Parent</h3>
            {!user ? (
              <button onClick={login} style={btnStyle('#3b82f6', 'white')}>Simulate Login</button>
            ) : (
              <p style={{ margin: 0, color: '#10b981' }}>✅ User is logged in.</p>
            )}
            <Dashboard />
          </div>
        </AuthContext.Provider>
      </div>

      <h3 style={{ marginTop: '30px' }}>The 3 Steps of Context:</h3>
          <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`// STEP 1: Create it (Outside your component)
import { createContext } from 'react';
export const ThemeContext = createContext('dark');

// STEP 2: Provide it (Wrap your parent component)
function App() {
  return (
    <ThemeContext.Provider value={'light'}>
      <ChildComponent />
    </ThemeContext.Provider>
  );
}

// STEP 3: Consume it (In any child component, no matter how deep)
import { useContext } from 'react';
import { ThemeContext } from './App'; // Import the context you created

function DeepChild() {
  const theme = useContext(ThemeContext); // Returns 'light'
  return <div className={theme}>Hello!</div>;
}`}
      </pre>
      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: SET & UPDATE DEMO ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. Live Demo: Updating State from Deep Child
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Agar deep child ko data update karna hai, toh Provider ki <code>value</code> me hume state ke saath uska <strong>Setter Function</strong> bhi pass karna padta hai.
      </p>

      <div style={{ background: '#2b303b', border: '1px solid #343a46', padding: '25px', borderRadius: '12px', margin: '20px 0' }}>
        <AnimationContext.Provider value={{ character, setCharacter }}>
          <div style={boxStyle('#58c4dc')}>
            <h3 style={{ margin: '0 0 10px 0', color: '#58c4dc' }}>Level 1: Top Parent</h3>
            <div style={{ background: '#191c20', padding: '10px', borderRadius: '6px', marginBottom: '15px' }}>
              <span style={{ color: '#9ca3af' }}>Current Status: </span> 
              <span style={{ color: 'white', fontWeight: 'bold' }}>{character.name} is {character.action}</span>
            </div>
            <SceneRenderer />
          </div>
        </AnimationContext.Provider>
      </div>

      <h3 style={{ marginTop: '30px' }}>Code Pattern:</h3>
      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`// 1. Provider me Object pass karo (State aur Setter dono)
<MyContext.Provider value={{ data, setData }}>
  <Child />
</MyContext.Provider>

// 2. Child me dono ko nikal lo
const { data, setData } = useContext(MyContext);

// 3. Update karne ke liye Setter call karo
<button onClick={() => setData("New World")}>Update Global</button>`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 3: PRO TIPS ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        3. Pro-Tips for Backend Devs (Interview Triggers)
      </h2>

      <div style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', borderLeft: '4px solid #dc2626', padding: '15px', borderRadius: '0 8px 8px 0', marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>⚠️ The Performance Gotcha</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          Jab bhi <code>Provider</code> ki `value` change hoti hai, toh us context ko use karne wale <strong>saare components</strong> re-render hote hain. Isliye Context ko aisi cheezon ke liye use mat karna jo har second update hoti hain (jaise scroll position ya heavy stock tickers). Uske liye Redux ya Zustand jaise tools better hote hain.
        </p>
      </div>

    </div>
  );
}