// src/pages/NodeEventLoopDoc.jsx
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

const queueStyle = {
  flex: 1, background: '#23272f', padding: '15px', borderRadius: '8px', border: '1px solid #343a46', minHeight: '150px'
};

const itemStyle = (bg) => ({
  background: bg, padding: '8px', borderRadius: '4px', marginBottom: '8px', color: 'white', fontSize: '0.9rem', fontWeight: 'bold', textAlign: 'center'
});

export default function NodeEventLoopDoc() {
  const [step, setStep] = useState(0);

  // Simulated Event Loop execution steps for the classic interview question
  const executionSteps = [
    { desc: "1. Code execution starts.", stack: [], micro: [], macro: [], log: [] },
    { desc: "2. console.log('1') is pushed to Call Stack.", stack: ["log('1')"], micro: [], macro: [], log: [] },
    { desc: "3. It executes immediately and prints '1'.", stack: [], micro: [], macro: [], log: ["1"] },
    { desc: "4. setTimeout is pushed to Call Stack.", stack: ["setTimeout(cb, 0)"], micro: [], macro: [], log: ["1"] },
    { desc: "5. Node sends it to libuv (C++) in background. Callback waits in Macro Queue.", stack: [], micro: [], macro: ["cb (Timeout)"], log: ["1"] },
    { desc: "6. Promise is pushed to Call Stack.", stack: ["Promise.resolve()"], micro: [], macro: ["cb (Timeout)"], log: ["1"] },
    { desc: "7. Promise finishes. Its .then() callback goes to Micro Queue.", stack: [], micro: ["cb (Promise)"], macro: ["cb (Timeout)"], log: ["1"] },
    { desc: "8. console.log('4') is pushed to Call Stack.", stack: ["log('4')"], micro: ["cb (Promise)"], macro: ["cb (Timeout)"], log: ["1"] },
    { desc: "9. It executes immediately and prints '4'. Call Stack is now empty!", stack: [], micro: ["cb (Promise)"], macro: ["cb (Timeout)"], log: ["1", "4"] },
    { desc: "10. Event Loop checks Micro Queue FIRST. Moves Promise cb to Call Stack.", stack: ["cb (Promise)"], micro: [], macro: ["cb (Timeout)"], log: ["1", "4"] },
    { desc: "11. Promise callback executes. Prints '3'.", stack: [], micro: [], macro: ["cb (Timeout)"], log: ["1", "4", "3"] },
    { desc: "12. Micro Queue is empty. Event Loop checks Macro Queue. Moves Timeout cb to Call Stack.", stack: ["cb (Timeout)"], micro: [], macro: [], log: ["1", "4", "3"] },
    { desc: "13. Timeout callback executes. Prints '2'. Execution complete!", stack: [], micro: [], macro: [], log: ["1", "4", "3", "2"] }
  ];

  const current = executionSteps[step];

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '900px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        2. The Event Loop
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        Node.js single-threaded hai (V8 engine mein sirf ek hi Call Stack hota hai). Lekin ye fast isliye hai kyunki I/O operations (Database, File System, Network) ke liye ye <strong>libuv</strong> naam ki C++ library ka use karta hai. Libuv background mein multi-threading karta hai, aur jab kaam ho jata hai, toh callbacks ko wapas Event Loop ke through main thread par bhej deta hai.
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: LIVE DEMO ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. Live Interview Visualizer: The Order of Execution
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Ye code snippet har Node.js interview mein pucha jata hai. <code>setTimeout</code> aur <code>Promise</code> dono asynchronous hain, par pehle kaun chalega? Neeche "Next Step" daba kar dekho.
      </p>

      <pre style={{ background: '#111827', padding: '15px', borderRadius: '8px', color: '#e2e8f0', border: '1px solid #343a46', fontSize: '1.1rem' }}>
{`console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");`}
      </pre>

      <div style={boxStyle('#343a46')}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, color: '#eab308' }}>Action: {current.desc}</h3>
          <div>
            <button onClick={() => setStep(0)} style={btnStyle('transparent', '#9ca3af')} disabled={step === 0}>Reset</button>
            <button onClick={() => setStep(s => Math.max(0, s - 1))} style={btnStyle('#343a46', 'white')} disabled={step === 0}>Prev</button>
            <button onClick={() => setStep(s => Math.min(executionSteps.length - 1, s + 1))} style={btnStyle('#10b981', 'white')} disabled={step === executionSteps.length - 1}>Next Step</button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          {/* Call Stack */}
          <div style={queueStyle}>
            <h4 style={{ margin: '0 0 15px 0', color: '#f6f7f9', textAlign: 'center', borderBottom: '1px solid #343a46', paddingBottom: '10px' }}>📚 Call Stack (V8)</h4>
            {current.stack.map((item, i) => <div key={i} style={itemStyle('#3b82f6')}>{item}</div>)}
          </div>

          {/* Microtask Queue */}
          <div style={queueStyle}>
            <h4 style={{ margin: '0 0 15px 0', color: '#f6f7f9', textAlign: 'center', borderBottom: '1px solid #343a46', paddingBottom: '10px' }}>🚀 Microtask Queue</h4>
            {current.micro.map((item, i) => <div key={i} style={itemStyle('#a855f7')}>{item}</div>)}
          </div>

          {/* Macrotask Queue */}
          <div style={queueStyle}>
            <h4 style={{ margin: '0 0 15px 0', color: '#f6f7f9', textAlign: 'center', borderBottom: '1px solid #343a46', paddingBottom: '10px' }}>🐢 Macrotask Queue</h4>
            {current.macro.map((item, i) => <div key={i} style={itemStyle('#dc2626')}>{item}</div>)}
          </div>

          {/* Console Output */}
          <div style={{ ...queueStyle, background: '#111827' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#10b981', textAlign: 'center', borderBottom: '1px solid #343a46', paddingBottom: '10px' }}>💻 Console</h4>
            {current.log.map((item, i) => <div key={i} style={{ color: '#10b981', fontFamily: 'monospace', fontSize: '1.2rem', textAlign: 'center' }}>{item}</div>)}
          </div>
        </div>
      </div>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: THE CHEAT SHEET ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. Priority Rules (The Secret Sauce)
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Event Loop check karne ka ek strict order hota hai. Interview mein is priority ko hamesha yaad rakhna:
      </p>

      <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderLeft: '4px solid #10b981', padding: '15px', borderRadius: '0 8px 8px 0', marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#10b981' }}>Priority 1: Sync Code</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          Call Stack mein jo bhi normal variables, console.logs, ya functions hain (Synchronous code), wo sabse pehle chalenge. Jab tak Call Stack khali nahi hota, Event Loop queue se kuch nahi uthayega.
        </p>
      </div>

      <div style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', borderLeft: '4px solid #a855f7', padding: '15px', borderRadius: '0 8px 8px 0', marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#a855f7' }}>Priority 2: Microtask Queue (VIP Lane)</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          Call stack khali hone ke baad Event Loop seedha Microtask queue dekhta hai. Isme <strong>Promises (`.then()`, `.catch()`)</strong> aur <strong>`process.nextTick()`</strong> aate hain. (Note: <code>process.nextTick</code> ki priority Promise se bhi thodi zyada hoti hai).
        </p>
      </div>

      <div style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', borderLeft: '4px solid #dc2626', padding: '15px', borderRadius: '0 8px 8px 0' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>Priority 3: Macrotask Queue (Timer & I/O Lane)</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          Jab Microtask queue poori tarah khali ho jati hai, tab Event Loop yahan aata hai. Isme <strong>`setTimeout`</strong>, <strong>`setInterval`</strong>, aur <strong>File/Database I/O callbacks</strong> aate hain.
        </p>
      </div>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 3: INTERVIEW TRAP ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        3. The Classic Interview Trap 🪤
      </h2>

      <div style={{ background: '#2b303b', border: '1px solid #343a46', padding: '20px', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#eab308', fontSize: '1.2rem' }}>Q: "Kya Node.js sach me puri tarah Single-Threaded hai?"</h4>
        <p style={{ color: '#d1d5db', lineHeight: '1.8', margin: 0 }}>
          <strong>Your Answer:</strong> "Nahi! Node.js ka sirf <strong>Event Loop aur V8 engine (Call Stack)</strong> single-threaded hai, jo JavaScript ko execute karta hai. Par background me jab bhi koi heavy task (jaise File I/O, Crypto hashing, ya DNS lookup) aata hai, toh Node use <strong>libuv ki Thread Pool</strong> me bhej deta hai. Default me is pool ke paas 4 threads hote hain. Toh actual background processes multi-threaded hoti hain."
        </p>
      </div>

    </div>
  );
}