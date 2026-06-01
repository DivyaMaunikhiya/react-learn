// src/pages/NodeExpressBasicsDoc.jsx
import React, { useState } from 'react';

// ==========================================
// HELPER STYLES
// ==========================================
const btnStyle = (bg, color) => ({
  padding: '10px 18px', backgroundColor: bg, color: color, border: 'none', 
  borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: 'opacity 0.2s', marginRight: '10px', marginBottom: '10px'
});

const boxStyle = (borderColor) => ({
  padding: '20px', border: `1px solid ${borderColor}`, borderRadius: '8px', 
  marginTop: '15px', backgroundColor: '#191c20'
});

const methodStyle = (method) => ({
  fontWeight: 'bold',
  color: method === 'GET' ? '#10b981' : method === 'POST' ? '#eab308' : '#3b82f6',
  marginRight: '10px'
});

export default function NodeExpressBasicsDoc() {
  const [response, setResponse] = useState({ status: 200, data: 'Server is running! Hit an endpoint to test.' });
  const [loading, setLoading] = useState(false);
  const [activeRoute, setActiveRoute] = useState('');

  // Simulated Express Server Routes
  const triggerRoute = (method, path, body = null) => {
    setLoading(true);
    setActiveRoute(`${method} ${path}`);
    
    setTimeout(() => {
      if (method === 'GET' && path === '/') {
        setResponse({ status: 200, data: { message: "Welcome to Express API!" } });
      } 
      else if (method === 'GET' && path === '/users') {
        setResponse({ status: 200, data: [{ id: 1, name: "Rahul" }, { id: 2, name: "Aman" }] });
      }
      else if (method === 'GET' && path === '/users/42') {
        setResponse({ status: 200, data: { id: 42, name: "Super Admin", role: "admin" } });
      }
      else if (method === 'POST' && path === '/users') {
        if (!body) {
          setResponse({ status: 400, data: { error: "Bad Request: Missing Body" } });
        } else {
          setResponse({ status: 201, data: { message: "User created successfully!", user: body } });
        }
      }
      else {
        setResponse({ status: 404, data: { error: "Route not found" } });
      }
      setLoading(false);
    }, 500); // Simulate network delay
  };

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        7. Express.js Basics
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        Express.js Node.js ke upar ek wrapper hai. Ye backend ki complex cheezon ko chupa leta hai aur aapko ek clean API deta hai jisse aap <code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>DELETE</code> requests ko aasaani se handle kar sako. Ye itna popular hai ki <strong>MERN</strong> stack ka 'E' Express hi hai!
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: LIVE DEMO (POSTMAN SIMULATOR) ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. Live Demo: Mini Postman Simulator
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Neeche diye gaye buttons par click karke alag-alag API endpoints hit karo aur dekho server kaise JSON response bhejta hai.
      </p>

      <div style={boxStyle('#343a46')}>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #343a46' }}>
          <button onClick={() => triggerRoute('GET', '/')} style={btnStyle('#191c20', '#10b981')}>
            <span style={methodStyle('GET')}>GET</span> /
          </button>
          <button onClick={() => triggerRoute('GET', '/users')} style={btnStyle('#191c20', '#10b981')}>
            <span style={methodStyle('GET')}>GET</span> /users
          </button>
          <button onClick={() => triggerRoute('GET', '/users/42')} style={btnStyle('#191c20', '#10b981')}>
            <span style={methodStyle('GET')}>GET</span> /users/:id
          </button>
          <button onClick={() => triggerRoute('POST', '/users', { name: "Newbie", age: 25 })} style={btnStyle('#191c20', '#eab308')}>
            <span style={methodStyle('POST')}>POST</span> /users
          </button>
          <button onClick={() => triggerRoute('GET', '/broken-link')} style={btnStyle('#191c20', '#dc2626')}>
            <span style={methodStyle('GET')}>GET</span> /404-Test
          </button>
        </div>

        {/* Console / Response Screen */}
        <div>
          <h4 style={{ margin: '0 0 10px 0', color: '#9ca3af' }}>
            Current Request: <strong style={{ color: '#f6f7f9', fontFamily: 'monospace' }}>{activeRoute || 'Waiting...'}</strong>
          </h4>
          <div style={{ background: '#111827', padding: '20px', borderRadius: '8px', border: '1px solid #343a46', position: 'relative' }}>
            {loading ? (
              <span style={{ color: '#58c4dc' }}>Fetching data from Express Server... ⏳</span>
            ) : (
              <div>
                <div style={{ marginBottom: '10px', color: response.status >= 400 ? '#dc2626' : '#10b981', fontWeight: 'bold' }}>
                  Status: {response.status} {response.status === 200 ? 'OK' : response.status === 201 ? 'Created' : response.status === 404 ? 'Not Found' : 'Bad Request'}
                </div>
                <pre style={{ color: '#e2e8f0', margin: 0, fontSize: '0.95rem' }}>
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: THE CODE PATTERN ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. Hello World in Express
      </h2>

      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`// 1. Import Express
const express = require('express');

// 2. Initialize App
const app = express();
const PORT = 3000;

// 3. Define a Route (GET)
// req = Request (User ne kya bheja)
// res = Response (Hum kya bhejenge)
app.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome to Express API!" });
});

// 4. Start Server
app.listen(PORT, () => {
  console.log(\`Server is running on http://localhost:\${PORT}\`);
});`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 3: THE INTERVIEW CHEAT SHEET ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        3. The "Holy Trinity" of Request Data
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Frontend (React) se backend par data bhejne ke 3 main tarike hote hain. Interviewer hamesha puchega "Donon me difference kya hai?".
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#191c20', borderRadius: '8px', overflow: 'hidden', marginTop: '15px' }}>
          <thead style={{ background: '#343a46', color: '#f6f7f9' }}>
            <tr>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f' }}>Type</th>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f' }}>Syntax (URL)</th>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f' }}>How to Access</th>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f' }}>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#10b981', fontWeight: 'bold' }}>Params</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db', fontFamily: 'monospace' }}>/users/<strong>42</strong></td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#eab308', fontFamily: 'monospace' }}>req.params.id</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>Specific resource dhundne ke liye (e.g., specific user ID).</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#3b82f6', fontWeight: 'bold' }}>Query</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db', fontFamily: 'monospace' }}>/users?<strong>age=25</strong></td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#eab308', fontFamily: 'monospace' }}>req.query.age</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>Filtering, Sorting aur Pagination ke liye.</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#a855f7', fontWeight: 'bold' }}>Body</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>Hidden in POST request</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#eab308', fontFamily: 'monospace' }}>req.body.name</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>Sensitive ya lamba data bhejne ke liye (e.g., Signup forms).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', borderLeft: '4px solid #dc2626', padding: '15px', borderRadius: '0 8px 8px 0', marginTop: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>⚠️ The req.body Trap!</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          Agar aap <code>POST</code> request bhej rahe ho, par <code>req.body</code> me <strong>undefined</strong> aa raha hai, toh samajh jao aapne Express ko JSON padhna nahi sikhaya. <br/><br/>
          <strong>Solution:</strong> Apne routes define karne se pehle ye line add karo:<br/>
          <code style={{ background: '#191c20', padding: '5px', borderRadius: '4px', color: '#10b981' }}>app.use(express.json());</code>
        </p>
      </div>

    </div>
  );
}