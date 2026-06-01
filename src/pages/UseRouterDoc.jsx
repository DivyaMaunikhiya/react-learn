// src/pages/UseRouterDoc.jsx
import React, { useState } from 'react';

// ==========================================
// HELPER STYLES
// ==========================================
const navBtnStyle = (isActive) => ({
  padding: '10px 20px', 
  backgroundColor: isActive ? '#58c4dc' : 'transparent', 
  color: isActive ? '#191c20' : '#f6f7f9', 
  border: isActive ? 'none' : '1px solid #343a46', 
  borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s ease'
});

const boxStyle = (borderColor) => ({
  padding: '20px', border: `1px solid ${borderColor}`, borderRadius: '8px', 
  marginTop: '15px', backgroundColor: '#191c20'
});

// ==========================================
// SIMULATED COMPONENTS (For Demo)
// ==========================================
const HomeView = () => <div style={{ color: '#10b981' }}><h2>🏠 Home Page</h2><p>Welcome to the dashboard!</p></div>;
const AboutView = () => <div style={{ color: '#3b82f6' }}><h2>ℹ️ About Us</h2><p>We build awesome React apps.</p></div>;
const ProfileView = ({ id }) => <div style={{ color: '#eab308' }}><h2>👤 User Profile</h2><p>Fetching data for User ID: <strong>{id}</strong></p></div>;
const NotFoundView = () => <div style={{ color: '#dc2626' }}><h2>❌ 404</h2><p>Page Not Found</p></div>;

export default function UseRouterDoc() {
  // Demo simulate karne ke liye state (Actual app me ye React Router handle karta hai)
  const [currentPath, setCurrentPath] = useState('/');

  const renderSimulatedRoute = () => {
    if (currentPath === '/') return <HomeView />;
    if (currentPath === '/about') return <AboutView />;
    if (currentPath.startsWith('/user/')) {
      const id = currentPath.split('/')[2];
      return <ProfileView id={id} />;
    }
    return <NotFoundView />;
  };

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        12. React Router (v6)
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        Backend me jab URL change hota hai toh server ek naya HTML page bhejta hai (jisme screen white hoti hai aur reload hota hai). React ek <strong>Single Page Application (SPA)</strong> hai. <code>react-router-dom</code> URL ko browser me change karta hai bina page refresh kiye, aur us URL ke hisaab se sahi component dikha deta hai.
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: LIVE DEMO ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. Live Demo: Client-Side Routing
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Neeche buttons par click karke dekho. Ye behave exactly hyperlinks jaisa kar rahe hain, par page ek baar bhi "Blink" ya refresh nahi ho raha hai!
      </p>

      <div style={boxStyle('#343a46')}>
        {/* Navigation Bar */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #343a46' }}>
          <button onClick={() => setCurrentPath('/')} style={navBtnStyle(currentPath === '/')}>/</button>
          <button onClick={() => setCurrentPath('/about')} style={navBtnStyle(currentPath === '/about')}>/about</button>
          <button onClick={() => setCurrentPath('/user/42')} style={navBtnStyle(currentPath.startsWith('/user/'))}>/user/:id</button>
          <button onClick={() => setCurrentPath('/random')} style={navBtnStyle(currentPath === '/random')}>/broken-link</button>
        </div>

        {/* Route Outlet */}
        <div style={{ minHeight: '120px', background: '#23272f', padding: '20px', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#9ca3af' }}>Current URL: <span style={{ color: '#f6f7f9', fontFamily: 'monospace' }}>http://localhost:3000{currentPath}</span></p>
          {renderSimulatedRoute()}
        </div>
      </div>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: ACTUAL CODE PATTERN ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. Real Implementation (v6 Modern Setup)
      </h2>
      <p style={{ color: '#d1d5db' }}>
        React Router use karne ke liye pehle terminal me <code>npm install react-router-dom</code> run karein. Fir <code>App.jsx</code> ko aise setup karein:
      </p>

      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`import { BrowserRouter, Routes, Route, Link } from 'react-redux-dom';

export default function App() {
  return (
    <BrowserRouter>
      {/* 1. Navigation Menu */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      {/* 2. Route Configurations */}
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/about" element={<AboutView />} />
        
        {/* Dynamic Parameter Route (Like Express.js) */}
        <Route path="/user/:id" element={<ProfileView />} />
        
        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
}`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 3: INTERVIEW HOT TOPICS ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        3. Interview Hot Topics 🔥
      </h2>

      <div style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', borderLeft: '4px solid #dc2626', padding: '15px', borderRadius: '0 8px 8px 0', marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>Q: "&lt;a href&gt; vs &lt;Link to&gt; me kya difference hai?"</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          <strong>Your Answer:</strong> <code>&lt;a href&gt;</code> browser ko naya page load karne bolta hai (HTTP request jati hai aur pura page reload hota hai). React Router ka <code>&lt;Link&gt;</code> default behavior ko rok deta hai (e.preventDefault) aur sirf JS ke through URL update karke UI render karta hai. Agar SPA me <code>&lt;a&gt;</code> tag use kiya, toh puri app ki memory/state ud jayegi.
        </p>
      </div>

      <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderLeft: '4px solid #10b981', padding: '15px', borderRadius: '0 8px 8px 0', marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#10b981' }}>Q: "URL se data kaise nikalte hain?" (Dynamic Params)</h4>
        <p style={{ margin: '0 0 10px 0', color: '#d1d5db' }}>
          Agar route <code>path="/user/:id"</code> hai, toh component ke andar hum <strong>useParams</strong> hook ka use karte hain.
        </p>
        <pre style={{ background: '#191c20', padding: '10px', borderRadius: '6px', color: '#58c4dc', margin: 0, border: '1px solid #343a46' }}>
{`import { useParams } from 'react-router-dom';

function ProfileView() {
  const { id } = useParams(); // URL se id nikal li
  return <h1>User ID is: {id}</h1>;
}`}
        </pre>
      </div>

      <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', borderLeft: '4px solid #eab308', padding: '15px', borderRadius: '0 8px 8px 0' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#eab308' }}>Q: "Code ke through navigate kaise karein?" (Programmatic Navigation)</h4>
        <p style={{ margin: '0 0 10px 0', color: '#d1d5db' }}>
          Jaise form submit hone ke baad user ko Dashboard par bhejna ho, uske liye <strong>useNavigate</strong> hook use hota hai.
        </p>
        <pre style={{ background: '#191c20', padding: '10px', borderRadius: '6px', color: '#58c4dc', margin: 0, border: '1px solid #343a46' }}>
{`import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // API Call successful...
    navigate('/dashboard'); // Direct bhej diya
  };
}`}
        </pre>
      </div>

    </div>
  );
}