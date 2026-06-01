// src/pages/NodeAsyncFlowDoc.jsx
import React, { useState } from 'react';

// ==========================================
// HELPER STYLES
// ==========================================
const btnStyle = (bg, color, isActive = true) => ({
  padding: '10px 18px', backgroundColor: isActive ? bg : 'transparent', 
  color: isActive ? color : '#9ca3af', border: `1px solid ${bg}`, 
  borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', 
  transition: 'all 0.2s', marginRight: '10px', marginBottom: '10px'
});

const boxStyle = (borderColor) => ({
  padding: '20px', border: `1px solid ${borderColor}`, borderRadius: '8px', 
  marginTop: '15px', backgroundColor: '#191c20'
});

export default function NodeAsyncFlowDoc() {
  const [activeTab, setActiveTab] = useState('async');
  const [logs, setLogs] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  // Simulated Async Function
  const simulateFetch = async () => {
    setIsFetching(true);
    setLogs([]);
    
    // Simulate delays
    const wait = (ms) => new Promise(res => setTimeout(res, ms));

    setLogs(prev => [...prev, "⏳ Fetching User..."]);
    await wait(800);
    setLogs(prev => [...prev, "✅ User Found (ID: 1)"]);
    
    setLogs(prev => [...prev, "⏳ Fetching Posts for User 1..."]);
    await wait(800);
    setLogs(prev => [...prev, "✅ Posts Found (2 Posts)"]);

    setLogs(prev => [...prev, "⏳ Fetching Comments for Post 1..."]);
    await wait(800);
    setLogs(prev => [...prev, "✅ Comments Loaded! 🎉"]);
    
    setIsFetching(false);
  };

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        4. Async Flow & Promises
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        Backend API likhte waqt humein Database queries, API calls, aur File I/O operations karne padte hain jo time lete hain. Node.js inka wait nahi karta, isliye humein use batana padta hai ki <em>"Jab data aa jaye, tab ye next function chalana"</em>. Iske 3 main patterns hote hain.
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: LIVE DEMO & EVOLUTION ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. The Evolution of Async Code
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Maan lo aapko pehle User lana hai, fir uske Posts, aur fir uske Comments. Dekho code kaisa dikhta tha aur ab kaisa dikhta hai.
      </p>

      <div style={boxStyle('#343a46')}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #343a46', paddingBottom: '15px' }}>
          <button onClick={() => setActiveTab('callback')} style={btnStyle('#dc2626', 'white', activeTab === 'callback')}>Phase 1: Callbacks</button>
          <button onClick={() => setActiveTab('promise')} style={btnStyle('#eab308', 'white', activeTab === 'promise')}>Phase 2: Promises</button>
          <button onClick={() => setActiveTab('async')} style={btnStyle('#10b981', 'white', activeTab === 'async')}>Phase 3: Async/Await</button>
        </div>

        {/* Dynamic Code Display */}
        {activeTab === 'callback' && (
          <div>
            <h4 style={{ color: '#dc2626', marginTop: 0 }}>🚨 The Pyramid of Doom (Callback Hell)</h4>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Old Node.js me sab aise hi likhte the. Code right side me shift hota jata tha (Hadouken code).</p>
            <pre style={{ background: '#111827', padding: '15px', borderRadius: '8px', color: '#e2e8f0', overflowX: 'auto' }}>
{`getUser(1, function(err, user) {
  if (err) return handleError(err);
  
  getPosts(user.id, function(err, posts) {
    if (err) return handleError(err);
    
    getComments(posts[0].id, function(err, comments) {
      if (err) return handleError(err);
      
      console.log(comments);
    });
  });
});`}
            </pre>
          </div>
        )}

        {activeTab === 'promise' && (
          <div>
            <h4 style={{ color: '#eab308', marginTop: 0 }}>🔗 Promises (.then chaining)</h4>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>ES6 me Promises aaye. Isne horizontal nesting ko vertical chain (seedhi) me badal diya.</p>
            <pre style={{ background: '#111827', padding: '15px', borderRadius: '8px', color: '#e2e8f0', overflowX: 'auto' }}>
{`getUser(1)
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(err => handleError(err)); // Single catch for all errors!`}
            </pre>
          </div>
        )}

        {activeTab === 'async' && (
          <div>
            <h4 style={{ color: '#10b981', marginTop: 0 }}>✅ Async / Await (Syntactic Sugar)</h4>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Modern standard! Code padhne me ekdum synchronous (line-by-line) lagta hai, par actually under-the-hood ye promises hi hain.</p>
            <pre style={{ background: '#111827', padding: '15px', borderRadius: '8px', color: '#e2e8f0', overflowX: 'auto' }}>
{`try {
  const user = await getUser(1);
  const posts = await getPosts(user.id);
  const comments = await getComments(posts[0].id);
  
  console.log(comments);
} catch (err) {
  handleError(err);
}`}
            </pre>
          </div>
        )}

        {/* Simulator */}
        <div style={{ marginTop: '20px', padding: '15px', background: '#23272f', borderRadius: '8px', border: '1px solid #343a46' }}>
          <button onClick={simulateFetch} disabled={isFetching} style={btnStyle('#3b82f6', 'white', !isFetching)}>
            {isFetching ? 'Executing...' : '▶️ Run Async Flow Simulator'}
          </button>
          
          <div style={{ marginTop: '10px', minHeight: '100px', color: '#a78bfa', fontFamily: 'monospace' }}>
            {logs.map((log, i) => <div key={i}>{log}</div>)}
          </div>
        </div>
      </div>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: INTERVIEW MASTERCLASS (PROMISE.ALL) ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. The Interview Masterclass 🔥
      </h2>

      <div style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', borderLeft: '4px solid #dc2626', padding: '15px', borderRadius: '0 8px 8px 0', marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>❌ Rookie Mistake: Sequential Await</h4>
        <p style={{ margin: '0 0 10px 0', color: '#d1d5db' }}>
          Maan lo aapko Dashboard ke liye <code>Users</code> aur <code>Products</code> dono ka data chahiye. Agar aap aise likhte ho:
        </p>
        <pre style={{ background: '#191c20', padding: '10px', borderRadius: '6px', color: '#e2e8f0', margin: 0, border: '1px solid #343a46' }}>
{`const users = await getUsers();       // Takes 2 seconds
const products = await getProducts(); // Takes 2 seconds
// Total time = 4 seconds`}
        </pre>
        <p style={{ margin: '10px 0 0 0', color: '#d1d5db', fontSize: '0.9rem' }}>
          Interviewer aapko turant reject kar dega. Users aur Products ek dusre par depend nahi karte, toh unhe ek ke baad ek kyun mangna?
        </p>
      </div>

      <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderLeft: '4px solid #10b981', padding: '15px', borderRadius: '0 8px 8px 0' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#10b981' }}>✅ Pro-Tip: Parallel Execution with `Promise.all()`</h4>
        <p style={{ margin: '0 0 10px 0', color: '#d1d5db' }}>
          Dono requests ko ek sath shoot karo. Isse execution time half ho jata hai! 
        </p>
        <pre style={{ background: '#191c20', padding: '10px', borderRadius: '6px', color: '#e2e8f0', margin: 0, border: '1px solid #343a46' }}>
{`// Dono requests array me pass kardo
const [users, products] = await Promise.all([
  getUsers(),
  getProducts()
]);
// Total time = 2 seconds (Max of the two)`}
        </pre>
      </div>

      <h3 style={{ marginTop: '30px', color: '#eab308' }}>Advanced Q: <code>Promise.all</code> vs <code>Promise.allSettled</code></h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#191c20', borderRadius: '8px', overflow: 'hidden', marginTop: '10px' }}>
        <thead style={{ background: '#343a46', color: '#f6f7f9' }}>
          <tr>
            <th style={{ padding: '15px' }}>Method</th>
            <th style={{ padding: '15px' }}>Behavior on Error</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#58c4dc', fontWeight: 'bold' }}>Promise.all()</td>
            <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}><strong>Fail-Fast.</strong> Agar 5 me se 1 request bhi fail hui (reject), toh pura block turant <code>catch</code> me chala jayega aur baaki cancel ho jayenge.</td>
          </tr>
          <tr>
            <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#10b981', fontWeight: 'bold' }}>Promise.allSettled()</td>
            <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}><strong>Resilient.</strong> Ye sabke khatam hone ka wait karega. Result me batayega kaunsa pass hua aur kaunsa fail (Status: fulfilled/rejected).</td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}