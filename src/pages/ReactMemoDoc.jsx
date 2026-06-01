// src/pages/ReactMemoDoc.jsx
import React, { useState, useRef, memo } from 'react';

// ==========================================
// HELPER STYLES
// ==========================================
const btnStyle = (bg, color) => ({
  padding: '10px 18px', backgroundColor: bg, color: color, border: 'none', 
  borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: 'opacity 0.2s'
});

const boxStyle = (borderColor) => ({
  padding: '15px', border: `2px dashed ${borderColor}`, borderRadius: '8px', 
  marginTop: '15px', backgroundColor: '#191c20', display: 'flex', flexDirection: 'column', gap: '10px'
});

// ==========================================
// DEMO COMPONENTS
// ==========================================

// 1. NORMAL CHILD (Har baar render hoga jab parent render hoga)
const NormalChild = ({ title }) => {
  const renderCount = useRef(0);
  renderCount.current++; // Render hote hi badh jayega

  return (
    <div style={boxStyle('#dc2626')}>
      <h4 style={{ margin: 0, color: '#dc2626' }}>❌ Normal Component</h4>
      <p style={{ margin: 0, color: '#9ca3af' }}>Prop Data: {title}</p>
      <div style={{ background: '#2b303b', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
        Render Count: <strong style={{ color: '#dc2626', fontSize: '1.2rem' }}>{renderCount.current}</strong>
      </div>
    </div>
  );
};

// 2. MEMOIZED CHILD (Sirf tab render hoga jab 'title' prop change hoga)
const MemoizedChild = memo(({ title }) => {
  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <div style={boxStyle('#10b981')}>
      <h4 style={{ margin: 0, color: '#10b981' }}>✅ React.memo Component</h4>
      <p style={{ margin: 0, color: '#9ca3af' }}>Prop Data: {title}</p>
      <div style={{ background: '#2b303b', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
        Render Count: <strong style={{ color: '#10b981', fontSize: '1.2rem' }}>{renderCount.current}</strong>
      </div>
    </div>
  );
});


// ==========================================
// MAIN EXPORT COMPONENT
// ==========================================
export default function ReactMemoDoc() {
  const [count, setCount] = useState(0); // Faltu ki state jo parent ko re-render karegi
  const [title, setTitle] = useState("Hello World"); // Actual prop jo child ko ja raha hai

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        7. React.memo
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        React ka default behavior hai ki jab bhi Parent component render hota hai, uske <strong>saare child components</strong> bhi blindly re-render hote hain, chahe unka data change hua ho ya nahi. <code>React.memo</code> is faltu re-rendering ko rokta hai.
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: LIVE DEMO ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. Live Demo: The Rendering Race
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Neeche wale "Increment Parent Count" button ko dabao. Ye sirf parent ki state (count) change kar raha hai, child ka data (title) nahi. Dekho dono child components kaise behave karte hain!
      </p>

      <div style={{ background: '#2b303b', border: '1px solid #343a46', padding: '25px', borderRadius: '12px', margin: '20px 0' }}>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#58c4dc' }}>Level 1: Parent Component</h3>
          <p style={{ margin: '0 0 15px 0' }}>Parent Count: <strong>{count}</strong></p>
          <button onClick={() => setCount(count + 1)} style={btnStyle('#3b82f6', 'white')}>
            Increment Parent Count (Trigger Re-render)
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Ye faltu me render hoga */}
          <NormalChild title={title} />
          
          {/* Ye bach jayega! */}
          <MemoizedChild title={title} />
        </div>

      </div>

      <p style={{ fontSize: '0.9rem', color: '#9ca3af', fontStyle: 'italic' }}>
        *Note: Agar starting render count 2 dikh raha hai, toh wo React ke "Strict Mode" ki wajah se hai (jo sirf dev environment me hota hai double check karne ke liye).
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: CODE IMPLEMENTATION ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. How to use it?
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Aapko bas apne component ko export karte waqt <code>memo()</code> function ke andar wrap karna hai.
      </p>

      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`import { memo } from 'react';

function MyHeavyComponent({ data }) {
  return <div>Very complex UI based on {data}</div>;
}

// Export karte waqt memo me wrap kar do
export default memo(MyHeavyComponent);`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 3: INTERVIEW TRAPS ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        3. The Interview Trap 🪤
      </h2>

      <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', borderLeft: '4px solid #eab308', padding: '15px', borderRadius: '0 8px 8px 0', marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#eab308' }}>Interviewer: "Toh kya hume HAR component par memo laga dena chahiye?"</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          <strong>Your Answer: "Nahi!"</strong> Memoization free nahi aati. <code>React.memo</code> purane props aur naye props ko compare karta hai (Shallow Comparison). Agar component bahut simple hai, toh use direct re-render karna zyada fast hoga bajaye uske props compare karne ke. Ye sirf Heavy/Complex components ke liye use hona chahiye.
        </p>
      </div>

      <div style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', borderLeft: '4px solid #dc2626', padding: '15px', borderRadius: '0 8px 8px 0' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>⚠️ The Object/Function Bug</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          Agar aap kisi memoized component ko as a prop ek <strong>Array, Object, ya Function</strong> pass karoge, toh `React.memo` fail ho jayega aur wo fir bhi re-render hoga! Kyun? Kyunki har naye render par Arrays/Functions ka "memory reference" change ho jata hai, aur shallow comparison fail ho jata hai. <br/><br/>
          Isi reference problem ko solve karne ke liye hum agle topics me <strong>useMemo</strong> aur <strong>useCallback</strong> padhenge!
        </p>
      </div>

    </div>
  );
}