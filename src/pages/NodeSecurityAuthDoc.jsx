// src/pages/NodeSecurityAuthDoc.jsx
import React, { useState } from 'react';

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

const tokenPartStyle = (color) => ({
  color: color, wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '1.1rem'
});

export default function NodeSecurityAuthDoc() {
  const [password, setPassword] = useState('mySecret123');
  const [hashedPassword, setHashedPassword] = useState('');
  const [token, setToken] = useState('');
  const [vaultStatus, setVaultStatus] = useState('🔒 Locked');

  // Simulate Bcrypt Hashing
  const simulateHash = () => {
    // A real bcrypt hash looks something like this: $2b$10$xyz...
    const salt = '$2b$10$' + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    const hash = salt + 'K9x8L' + btoa(password).substring(0, 10);
    setHashedPassword(hash);
  };

  // Simulate JWT Generation
  const simulateLogin = () => {
    // Header (alg: HS256, typ: JWT) -> Base64
    const header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'; 
    // Payload (id: 42, role: admin) -> Base64
    const payload = 'eyJpZCI6NDIsIm5hbWUiOiJSYWh1bCIsInJvbGUiOiJhZG1pbiJ9';
    // Signature (Hashed combination of Header + Payload + Secret Key)
    const signature = 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    
    setToken(`${header}.${payload}.${signature}`);
  };

  // Simulate Protected Route Access
  const accessVault = () => {
    if (!token) {
      setVaultStatus('❌ Access Denied! No Token Provided.');
    } else {
      // In reality, jwt.verify() checks if the signature is valid using the secret key
      setVaultStatus('✅ Access Granted! Welcome to the Admin Vault.');
    }
  };

  const resetAll = () => {
    setHashedPassword('');
    setToken('');
    setVaultStatus('🔒 Locked');
  };

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        12. Security & JWT Auth
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        Authentication ke 2 golden rules hote hain: 1) Database me user ka password kabhi plain text me mat save karo. 2) User ko baar-baar password daalne se bachane ke liye use ek aisi 'Digital Key' (Token) do jisse server verify kar sake.
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: LIVE DEMO ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. Live Demo: The Authentication Flow
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        
        {/* Step 1: Hashing */}
        <div style={boxStyle('#3b82f6')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#3b82f6' }}>Step 1: Password Hashing (Bcrypt)</h3>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: '0 0 15px 0' }}>Signup ke waqt hum password ko 'Hash' aur 'Salt' karte hain taaki hacker DB hack karke bhi password na padh sake.</p>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input 
              type="text" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #343a46', background: '#111827', color: 'white', flex: 1 }}
            />
            <button onClick={simulateHash} style={btnStyle('#3b82f6', 'white')}>Hash Password</button>
          </div>
          {hashedPassword && (
            <div style={{ background: '#111827', padding: '10px', borderRadius: '4px', border: '1px dashed #3b82f6', color: '#10b981', fontFamily: 'monospace', wordBreak: 'break-all' }}>
              Saved in DB: {hashedPassword}
            </div>
          )}
        </div>

        {/* Step 2: JWT Generation */}
        <div style={boxStyle('#eab308')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#eab308' }}>Step 2: Generate JWT (Login)</h3>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: '0 0 15px 0' }}>Jab user sahi password dalta hai, server ek JWT banata hai. Ye token 3 parts se milkar banta hai.</p>
          <button onClick={simulateLogin} style={btnStyle('#eab308', '#111827')}>Login & Get Token</button>
          
          {token && (
            <div style={{ background: '#111827', padding: '15px', borderRadius: '4px', border: '1px solid #eab308', marginTop: '10px' }}>
              <div style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#9ca3af' }}>
                <span style={{ color: '#dc2626', fontWeight: 'bold' }}>Header</span> . <span style={{ color: '#a855f7', fontWeight: 'bold' }}>Payload (Data)</span> . <span style={{ color: '#10b981', fontWeight: 'bold' }}>Signature (Verification)</span>
              </div>
              <div style={{ background: '#191c20', padding: '10px', borderRadius: '4px' }}>
                <span style={tokenPartStyle('#dc2626')}>{token.split('.')[0]}</span>
                <span style={{ color: 'white', fontWeight: 'bold' }}>.</span>
                <span style={tokenPartStyle('#a855f7')}>{token.split('.')[1]}</span>
                <span style={{ color: 'white', fontWeight: 'bold' }}>.</span>
                <span style={tokenPartStyle('#10b981')}>{token.split('.')[2]}</span>
              </div>
            </div>
          )}
        </div>

        {/* Step 3: Access Protected Route */}
        <div style={boxStyle('#10b981')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#10b981' }}>Step 3: Access Protected API</h3>
            <button onClick={resetAll} style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', textDecoration: 'underline' }}>Reset Demo</button>
          </div>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: '0 0 15px 0' }}>Client is token ko Request ke "Headers" (Authorization: Bearer) me bhejta hai.</p>
          
          <button onClick={accessVault} style={btnStyle('#10b981', 'white')}>Access Admin Vault</button>
          
          <div style={{ marginTop: '15px', padding: '15px', background: vaultStatus.includes('Granted') ? 'rgba(16, 185, 129, 0.1)' : vaultStatus.includes('Denied') ? 'rgba(220, 38, 38, 0.1)' : '#111827', borderRadius: '4px', color: vaultStatus.includes('Granted') ? '#10b981' : vaultStatus.includes('Denied') ? '#dc2626' : '#9ca3af', fontWeight: 'bold', border: `1px solid ${vaultStatus.includes('Granted') ? '#10b981' : vaultStatus.includes('Denied') ? '#dc2626' : '#343a46'}` }}>
            {vaultStatus}
          </div>
        </div>

      </div>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: THE CODE PATTERNS ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. Real Code Implementation
      </h2>
      <p style={{ color: '#d1d5db', marginBottom: '20px' }}>
        Aapko <code>bcryptjs</code> aur <code>jsonwebtoken</code> NPM packages ki zaroorat padegi.
      </p>

      <h4 style={{ color: '#f6f7f9', margin: '0 0 10px 0' }}>1. Creating the Token (Login Controller)</h4>
      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto', marginBottom: '20px' }}>
{`const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  // 1. Verify email & password from DB...
  // 2. Generate JWT Token
  const payload = { id: user._id, role: user.role };
  const secretKey = process.env.JWT_SECRET;
  
  // Token 1 din me expire ho jayega
  const token = jwt.sign(payload, secretKey, { expiresIn: '1d' });

  res.status(200).json({ success: true, token });
};`}
      </pre>

      <h4 style={{ color: '#f6f7f9', margin: '0 0 10px 0' }}>2. Verifying the Token (Auth Middleware)</h4>
      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`const jwt = require('jsonwebtoken');

exports.protectRoute = (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer')) {
    // Extract token string ("Bearer eyJhb...")
    token = token.split(' ')[1]; 
  }

  if (!token) return res.status(401).json({ error: "No token, access denied" });

  try {
    // Verify token math mathematically
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attaching user data to request for next controller
    req.user = decodedPayload; 
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or Expired Token" });
  }
};`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 3: INTERVIEW BATTLE ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        3. JWT vs Sessions (The Ultimate Question)
      </h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#191c20', borderRadius: '8px', overflow: 'hidden' }}>
          <thead style={{ background: '#343a46', color: '#f6f7f9' }}>
            <tr>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f' }}>Feature</th>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f', color: '#eab308' }}>Sessions (Legacy)</th>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f', color: '#10b981' }}>JWT (Modern)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>State Management</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}><strong>Stateful.</strong> Server ko apne database/RAM mein yaad rakhna padta hai ki kaun logged in hai.</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}><strong>Stateless.</strong> Server kuch yaad nahi rakhta. Token ke andar hi saari information chupi hoti hai.</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>Scalability (Clustering)</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#dc2626' }}>Poor. Agar User Server A pe login hua aur agli request Server B pe gayi, toh use log out maana jayega (unless Redis use karein).</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#10b981' }}>Excellent. Kisi bhi server pe bhejo, token apne aap me valid hai as long as dono ke paas same Secret Key ho.</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>Revoking Access</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#10b981' }}>Easy. Database se session delete kar do, turant log out.</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#dc2626' }}>Hard. Ek baar token issue ho gaya toh use expire hone tak rokna mushkil hai (Blacklisting system banana padta hai).</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}