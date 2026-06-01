// src/pages/NodeModulesDoc.jsx
import React, { useState } from 'react';

// ==========================================
// HELPER STYLES
// ==========================================
const btnStyle = (bg, color, isActive) => ({
  padding: '10px 20px', 
  backgroundColor: isActive ? bg : 'transparent', 
  color: isActive ? color : '#9ca3af', 
  border: `1px solid ${bg}`, 
  borderRadius: '6px', 
  cursor: 'pointer', 
  fontWeight: 'bold', 
  transition: 'all 0.2s', 
  marginRight: '10px'
});

const boxStyle = (borderColor) => ({
  padding: '20px', border: `1px solid ${borderColor}`, borderRadius: '8px', 
  marginTop: '15px', backgroundColor: '#191c20'
});

export default function NodeModulesDoc() {
  const [activeSystem, setActiveSystem] = useState('ESM');

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        3. Modules (CJS vs ESM)
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        Backend development mein hum code ko alag-alag files (Controllers, Models, Routes) mein todte hain. Ek file se code doosri file mein bhejne ke process ko <strong>Module System</strong> kehte hain. Node.js do main systems support karta hai: CommonJS (Legacy) aur ES Modules (Modern).
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: LIVE DEMO (SYNTAX TOGGLE) ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. Syntax Comparison
      </h2>
      <p style={{ color: '#d1d5db', marginBottom: '20px' }}>
        Select karo ki aapko kaunsa syntax dekhna hai. Aajkal React aur modern Node.js dono mein ESM (Import/Export) standard ban chuka hai.
      </p>

      <div style={boxStyle('#343a46')}>
        <div style={{ display: 'flex', marginBottom: '20px', borderBottom: '1px solid #343a46', paddingBottom: '20px' }}>
          <button 
            onClick={() => setActiveSystem('ESM')} 
            style={btnStyle('#10b981', 'white', activeSystem === 'ESM')}
          >
            Modern: ES Modules (ESM)
          </button>
          <button 
            onClick={() => setActiveSystem('CJS')} 
            style={btnStyle('#eab308', 'white', activeSystem === 'CJS')}
          >
            Legacy: CommonJS (CJS)
          </button>
        </div>

        {activeSystem === 'ESM' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <h4 style={{ color: '#10b981', margin: '0 0 10px 0' }}>📄 math.js (Export)</h4>
              <pre style={{ background: '#111827', padding: '15px', borderRadius: '8px', color: '#e2e8f0', fontSize: '0.9rem' }}>
{`// Named Export
export const add = (a, b) => a + b;

// Default Export
const multiply = (a, b) => a * b;
export default multiply;`}
              </pre>
            </div>
            <div>
              <h4 style={{ color: '#10b981', margin: '0 0 10px 0' }}>📄 app.js (Import)</h4>
              <pre style={{ background: '#111827', padding: '15px', borderRadius: '8px', color: '#e2e8f0', fontSize: '0.9rem' }}>
{`// IMPORTANT: ESM me .js lagana padta hai!
import multiply, { add } from './math.js';

console.log(add(5, 5));
console.log(multiply(5, 5));`}
              </pre>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <h4 style={{ color: '#eab308', margin: '0 0 10px 0' }}>📄 math.js (Export)</h4>
              <pre style={{ background: '#111827', padding: '15px', borderRadius: '8px', color: '#e2e8f0', fontSize: '0.9rem' }}>
{`const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

// Exporting as an object
module.exports = {
  add,
  multiply
};`}
              </pre>
            </div>
            <div>
              <h4 style={{ color: '#eab308', margin: '0 0 10px 0' }}>📄 app.js (Import)</h4>
              <pre style={{ background: '#111827', padding: '15px', borderRadius: '8px', color: '#e2e8f0', fontSize: '0.9rem' }}>
{`// File extension optional hai
const math = require('./math');

// Or using destructuring
const { add } = require('./math');

console.log(add(5, 5));`}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', padding: '15px', borderRadius: '0 8px 8px 0', marginTop: '15px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#3b82f6' }}>💡 Backend Pro-Tip: How to enable ESM in Node?</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          Node.js by default CommonJS manta hai. Agar aap <code>import/export</code> use karna chahte ho, toh apne <code>package.json</code> me jakar <strong><code>"type": "module"</code></strong> add karna padega. Ya fir apne file ka extension <code>.mjs</code> rakhna padega.
        </p>
      </div>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: THE INTERVIEW SECRET ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. Under the Hood: The Module Wrapper Function
      </h2>
      <p style={{ color: '#d1d5db' }}>
        <strong>Interview Question:</strong> "JavaScript browser mein <code>require</code>, <code>module</code>, <code>__dirname</code> nahi jaanta. Toh Node.js mein ye variables hawa se kahan se aate hain?"
        <br/><br/>
        <strong>Answer:</strong> Node.js aapke likhe hue code ko direct run nahi karta. Wo execute karne se theek pehle aapke pure code ko ek <strong>IIFE (Immediately Invoked Function Expression)</strong> mein wrap kar deta hai. Yahi se humein ye variables milte hain! 
      </p>

      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto', marginTop: '15px' }}>
{`(function(exports, require, module, __filename, __dirname) {
  
  // 👉 AAPKA LIKHA HUA CODE YAHAN AATA HAI
  const express = require('express');
  console.log(__dirname); // Isliye ye work karta hai!
  module.exports = app;

});`}
      </pre>

      <p style={{ color: '#dc2626', fontSize: '0.95rem', marginTop: '10px' }}>
        *Note: <code>__dirname</code> aur <code>__filename</code> sirf CommonJS (require) mein hote hain. ES Modules (import) mein ye variables exist nahi karte! Unhe manual import karna padta hai <code>import.meta.url</code> se.
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 3: CJS vs ESM (CHEAT SHEET) ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        3. The Ultimate Difference (Cheat Sheet)
      </h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#191c20', borderRadius: '8px', overflow: 'hidden' }}>
          <thead style={{ background: '#343a46', color: '#f6f7f9' }}>
            <tr>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f' }}>Feature</th>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f', color: '#eab308' }}>CommonJS (require)</th>
              <th style={{ padding: '15px', borderBottom: '2px solid #23272f', color: '#10b981' }}>ES Modules (import)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>Loading Mechanism</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}><strong>Synchronous</strong> (Code ruk jata hai jab tak file load na ho).</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}><strong>Asynchronous</strong> (Non-blocking, fast loading).</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>Dynamic Imports</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>File ke beech mein kahin bhi <code>require()</code> laga sakte ho (e.g., if-else ke andar).</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}><code>import</code> hamesha file ke <strong>top</strong> par hona chahiye.</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>Top-Level Await</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#dc2626' }}>❌ Not Supported. Await function ke andar hi use hota hai.</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#10b981' }}>✅ Supported. File me bahar direct <code>await db.connect()</code> likh sakte ho.</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>File Extension</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}><code>.js</code> or <code>.cjs</code></td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}><code>.mjs</code> or requires <code>"type": "module"</code> in package.json.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}