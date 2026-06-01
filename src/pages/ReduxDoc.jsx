// src/pages/ReduxDoc.jsx
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

export default function ReduxDoc() {
  // Demo purpose ke liye simulated state
  const [balance, setBalance] = useState(10000);
  const [logs, setLogs] = useState(["[INIT] Store initialized with ₹10000"]);

  const simulateDispatch = (actionType, payload) => {
    let newBalance = balance;
    if (actionType === 'DEPOSIT') newBalance += payload;
    if (actionType === 'WITHDRAW') newBalance -= payload;
    
    setBalance(newBalance);
    setLogs(prev => [`[DISPATCH] Action: ${actionType}, Payload: ₹${payload}`, ...prev].slice(0, 5));
  };

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        10. Redux (Toolkit)
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        Redux ek <strong>"Global State Management"</strong> library hai. Jab aapki app bahut badi ho jaye (jaise E-commerce site), aur data 50 alag-alag components me share karna ho, tab Context API slow ho jati hai. Redux data ko ek central "Vault" (Store) me rakhta hai jahan se koi bhi component use direct access kar sakta hai.
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: THE BANK ANALOGY ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. The Bank Analogy (Interview Answer)
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Interviewer ko Redux aise samjhana: "Redux ek Bank ki tarah hai."
      </p>
      <ul style={{ color: '#9ca3af', marginLeft: '20px', lineHeight: '1.9' }}>
        <li>🏦 <strong>Store:</strong> Bank ka Vault (Jahan saara paisa/data safe rakha hai).</li>
        <li>📝 <strong>Action:</strong> Deposit Slip (Isme likha hota hai kya karna hai, e.g., <code>{`{ type: 'DEPOSIT', amount: 500 }`}</code>).</li>
        <li>👨‍💼 <strong>Dispatcher:</strong> Bank Teller (Aap khud Vault me nahi jate, Teller ko slip dete ho. <code>dispatch(action)</code>).</li>
        <li>🧮 <strong>Reducer:</strong> Bank ka Accountant (Ye dekhta hai purana balance kitna tha, slip me kya hai, aur naya balance calculate karke Vault me dalta hai).</li>
        <li>👀 <strong>Selector:</strong> Mobile App/Passbook (Jisse aap apna balance dekhte ho. <code>useSelector</code>).</li>
      </ul>

      {/* ---------------- PART 2: LIVE DEMO ---------------- */}
      <div style={boxStyle('#343a46')}>
        <h3 style={{ margin: '0 0 15px 0', color: '#58c4dc' }}>Live Demo: Redux Data Flow Simulator</h3>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          {/* UI Component */}
          <div style={{ flex: 1, padding: '15px', border: '1px dashed #9ca3af', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 10px 0', color: 'white' }}>Component (UI)</h4>
            <h2 style={{ margin: '0 0 15px 0', color: '#10b981' }}>Balance: ₹{balance}</h2>
            <button onClick={() => simulateDispatch('DEPOSIT', 1000)} style={btnStyle('#3b82f6', 'white')}>Deposit ₹1000</button>
            <button onClick={() => simulateDispatch('WITHDRAW', 500)} style={btnStyle('#dc2626', 'white')}>Withdraw ₹500</button>
          </div>

          {/* Redux Logs */}
          <div style={{ flex: 1, padding: '15px', background: '#191c20', borderRadius: '8px', border: '1px solid #343a46' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#eab308' }}>Redux DevTools (Logger)</h4>
            <div style={{ fontSize: '0.85rem', color: '#a78bfa', fontFamily: 'monospace' }}>
              {logs.map((log, i) => (
                <div key={i} style={{ marginBottom: '5px' }}>{log}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 3: MODERN RTK CODE ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. Modern Redux Toolkit (RTK) Code
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Purane Redux me files ka jhamela bahut tha. Naye RTK me hum <strong>"Slice"</strong> banate hain jisme State, Action, aur Reducer sab ek hi jagah hote hain.
      </p>

      <h3 style={{ marginTop: '20px', color: '#f6f7f9', fontSize: '1.2rem' }}>Step 1: Create a Slice (bankSlice.js)</h3>
      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '15px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`import { createSlice } from '@reduxjs/toolkit';

const bankSlice = createSlice({
  name: 'bank',
  initialState: { balance: 0 },
  reducers: {
    // Ye functions automatically Actions bhi generate kar dete hain!
    deposit: (state, action) => {
      // RTK me hum direct mutate kar sakte hain (Immer.js handle karta hai)
      state.balance += action.payload; 
    },
    withdraw: (state, action) => {
      state.balance -= action.payload;
    }
  }
});

export const { deposit, withdraw } = bankSlice.actions; // Export Actions
export default bankSlice.reducer; // Export Reducer`}
      </pre>

      <h3 style={{ marginTop: '20px', color: '#f6f7f9', fontSize: '1.2rem' }}>Step 2: Use in Component (App.jsx)</h3>
      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '15px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`import { useSelector, useDispatch } from 'react-redux';
import { deposit, withdraw } from './bankSlice';

function AtmMachine() {
  // 1. Read Data (Selector)
  const balance = useSelector((state) => state.bank.balance);
  
  // 2. Trigger Action (Dispatch)
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Balance: {balance}</h1>
      <button onClick={() => dispatch(deposit(100))}>Deposit 100</button>
    </div>
  );
}`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 4: INTERVIEW BATTLE ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        3. Context API vs Redux (The Ultimate Question)
      </h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#191c20', borderRadius: '8px', overflow: 'hidden' }}>
          <thead style={{ background: '#343a46', color: '#f6f7f9' }}>
            <tr>
              <th style={{ padding: '15px' }}>Feature</th>
              <th style={{ padding: '15px' }}>Context API</th>
              <th style={{ padding: '15px' }}>Redux (RTK)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>Performance</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#dc2626' }}>Low. State change hone par sabhi consumer components re-render hote hain.</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#10b981' }}>High. Sirf wahi component render hoga jiska specific data change hua hai.</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>Best For</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>Low-frequency updates (Theme, Logged-in User).</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>High-frequency updates (Cart, Live Stocks, Chat).</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>Debugging</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>Basic debugging.</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#10b981' }}>Redux DevTools (Time-travel debugging possible!).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', borderLeft: '4px solid #eab308', padding: '15px', borderRadius: '0 8px 8px 0', marginTop: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#eab308' }}>⚠️ When NOT to use Redux?</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          Interviewer test karne ke liye puchega ki "Login Form ka state kahan rakhoge?" <br/>
          <strong>Your Answer:</strong> "Local <code>useState</code> me! Form inputs, modal open/close jaisi UI states ko kabhi bhi Redux me nahi daalna chahiye. Redux sirf us data ke liye hai jo puri app me bahut jagah use hota hai."
        </p>
      </div>

    </div>
  );
}