// src/pages/NodeV8Doc.jsx
import React, { useState, useEffect } from 'react';

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

export default function NodeV8Doc() {
  const [step, setStep] = useState(0);

  // Simulated V8 Pipeline Steps
  const pipeline = [
    { title: "1. Raw JavaScript", code: "function add(a, b) {\n  return a + b;\n}\nadd(5, 10);", color: "#eab308" },
    { title: "2. Parser -> AST (Abstract Syntax Tree)", code: "{\n  type: 'FunctionDeclaration',\n  name: 'add',\n  params: ['a', 'b'],\n  body: { type: 'ReturnStatement' }\n}", color: "#3b82f6" },
    { title: "3. Ignition (Interpreter) -> Bytecode", code: "LdaSmi [5]\nStar r0\nLdaSmi [10]\nStar r1\nCallUndefinedReceiver1 r0, r1", color: "#a855f7" },
    { title: "4. TurboFan (Optimizing Compiler) -> Machine Code", code: "0x10000000: 55\n0x10000001: 48 89 e5\n0x10000004: 89 7d fc\n0x10000007: 8b 45 fc\n0x1000000a: 03 45 f8", color: "#10b981" }
  ];

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        1. V8 Engine & Architecture
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        V8 Google ka open-source, high-performance JavaScript engine hai jo C++ mein likha gaya hai (Google Chrome bhi yahi use karta hai). Node.js ne is engine ko browser se nikala aur apne C++ wrappers (libuv) ke sath jod diya taaki hum server-side code likh sakein.
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: LIVE DEMO (JIT PIPELINE) ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. Live Demo: The JIT Compilation Pipeline
      </h2>
      <p style={{ color: '#d1d5db' }}>
        V8 <strong>JIT (Just-In-Time) Compilation</strong> use karta hai. Matlab ye code ko line-by-line interpret bhi karta hai (fast startup ke liye) aur baar-baar use hone wale code ko machine code mein compile bhi karta hai (high performance ke liye). Neeche button daba kar pipeline dekho:
      </p>

      <div style={boxStyle(pipeline[step].color)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ margin: 0, color: pipeline[step].color }}>{pipeline[step].title}</h3>
          <div>
            <button 
              onClick={() => setStep(s => Math.max(0, s - 1))} 
              style={btnStyle('#343a46', 'white')}
              disabled={step === 0}
            >
              Prev
            </button>
            <button 
              onClick={() => setStep(s => Math.min(3, s + 1))} 
              style={btnStyle(pipeline[step].color, 'white')}
              disabled={step === 3}
            >
              Next Step
            </button>
          </div>
        </div>
        
        <pre style={{ background: '#111827', padding: '20px', borderRadius: '8px', color: '#e2e8f0', fontFamily: 'monospace', overflowX: 'auto' }}>
          {pipeline[step].code}
        </pre>
      </div>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: THE 2 MAIN COMPONENTS ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. The Two Heroes of V8 (Interview Hot Topic)
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Interviewer jab poochega "V8 itna fast kyun hai?", tab aapko in do C++ components ka naam lena hai:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <div style={{ background: '#2b303b', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #a855f7' }}>
          <strong style={{ color: '#a855f7', fontSize: '1.2rem' }}>1. Ignition (The Interpreter)</strong><br/>
          Ye JavaScript ko jaldi se AST (Syntax Tree) se uthata hai aur <strong>Bytecode</strong> mein convert karke run kar deta hai. Iska main kaam hai app ko bina kisi delay ke turant start karna.
        </div>
        <div style={{ background: '#2b303b', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
          <strong style={{ color: '#10b981', fontSize: '1.2rem' }}>2. TurboFan (The Optimizing Compiler)</strong><br/>
          Jab Ignition ek hi function ko baar-baar run karta hai (jaise for-loop), toh wo us function ko "Hot" mark kar deta hai. Fir TurboFan aakar us Bytecode ko uthata hai aur direct highly optimized <strong>Machine Code</strong> mein convert kar deta hai, jisse execution speed rocket jaisi ho jati hai.
        </div>
      </div>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 3: THE INTERVIEW TRAP ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        3. The Classic Interview Trap 🪤
      </h2>

      <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', borderLeft: '4px solid #eab308', padding: '15px', borderRadius: '0 8px 8px 0', marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#eab308' }}>Interviewer: "Kya Node.js aur V8 same cheez hain?"</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          <strong>Your Answer:</strong> "Nahi sir! V8 sirf JavaScript ko machine code me compile karne ka kaam karta hai. V8 ke paas file padhne (fs) ya server banane (http) ki taqat nahi hoti, kyuki browser ko inki zaroorat nahi thi. Node.js ek C++ wrapper hai jo V8 ko embed karta hai aur usme <strong>libuv (C++ library)</strong> jodta hai, jo usko OS se baat karne aur asynchronous I/O tasks karne ki taqat deta hai."
        </p>
      </div>

      <div style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', borderLeft: '4px solid #dc2626', padding: '15px', borderRadius: '0 8px 8px 0' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>Interviewer: "V8 multi-threaded hai ya single-threaded?"</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          <strong>Your Answer:</strong> "V8 JavaScript ko execute karne ke liye strictly <strong>Single-Threaded</strong> hai (Call Stack ek hi hota hai). Par background mein V8 ke paas 'Worker Threads' hote hain jo Garbage Collection (Orinoco) aur TurboFan compilation ka kaam karte hain, taaki main thread block na ho."
        </p>
      </div>

    </div>
  );
}