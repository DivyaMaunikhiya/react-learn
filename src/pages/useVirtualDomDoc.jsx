// src/pages/UseVirtualDomDoc.jsx
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

export default function UseVirtualDomDoc() {
  // Demo State
  const [items, setItems] = useState([
    { id: 101, text: 'Learn React' },
    { id: 102, text: 'Build Project' }
  ]);
  const [counter, setCounter] = useState(103);

  const addItemToTop = () => {
    setItems([{ id: counter, text: `New Item ${counter}` }, ...items]);
    setCounter(c => c + 1);
  };

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        13. Virtual DOM & Reconciliation
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        Browser ka apna "Real DOM" (HTML tree) bahut bhaari aur slow hota hai. Agar aap ek chota sa text change karte ho, toh vanilla JS pura page repaint kar sakta hai. React isko solve karne ke liye memory mein apna ek halka-phulka duplicate DOM banata hai jise <strong>Virtual DOM</strong> kehte hain. 
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: THE PROCESS ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. How it Works (The 3-Step Dance)
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Interviewer ko ye 3 steps ekdum aise hi batana:
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <div style={{ background: '#2b303b', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6', fontSize: '1.2rem' }}>Step 1: The Render Phase</strong><br/>
          Jab component ki state change hoti hai, toh React ek naya Virtual DOM tree banata hai. Ye operation bahut fast hota hai kyunki ye sirf plain JavaScript objects hote hain, screen par kuch draw nahi ho raha hota.
        </div>
        <div style={{ background: '#2b303b', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #eab308' }}>
          <strong style={{ color: '#eab308', fontSize: '1.2rem' }}>Step 2: Diffing (The Comparison)</strong><br/>
          Ab React purane Virtual DOM aur naye Virtual DOM ko compare karta hai. Is algorithm ko <strong>Diffing Algorithm</strong> kehte hain. Ye dhoondhta hai ki exactly kaunsa node badla hai.
        </div>
        <div style={{ background: '#2b303b', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
          <strong style={{ color: '#10b981', fontSize: '1.2rem' }}>Step 3: Reconciliation (The Update)</strong><br/>
          Jab React ko changes mil jate hain, toh wo unn changes ka ek "Patch" banata hai aur Real DOM par jaakar <em>sirf unn specific jagaho</em> ko update kar deta hai. Pura page reload nahi hota.
        </div>
      </div>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: THE KEY PROP TRAP ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. Live Demo: The "Key" Prop Bug 🪲
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Diffing algorithm ko arrays map karte waqt elements pehchanne me dikkat hoti hai. Isliye React humse <code>key</code> mangta hai. Agar aap key me array ka <strong>index</strong> (0, 1, 2) daal doge, toh list order change hone par React confuse ho jayega aur galat state render kar dega!
      </p>

      <div style={boxStyle('#343a46')}>
        <button onClick={addItemToTop} style={btnStyle('#3b82f6', 'white')}>
          Add New Item at Top
        </button>
        <p style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '20px' }}>
          <em>Experiment: Dono inputs me kuch type karo, fir 'Add New Item' par click karo. Dekho Index wali list kaise toot jati hai!</em>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          {/* BAD LIST */}
          <div style={{ border: '1px solid #dc2626', padding: '15px', borderRadius: '8px' }}>
            <h3 style={{ color: '#dc2626', margin: '0 0 15px 0' }}>❌ Bad: Index as Key</h3>
            {items.map((item, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <span style={{ display: 'inline-block', width: '120px' }}>{item.text}</span>
                {/* Uncontrolled input to show state mismatch */}
                <input type="text" placeholder="Type here..." style={{ padding: '5px', borderRadius: '4px', border: 'none' }} />
              </div>
            ))}
          </div>

          {/* GOOD LIST */}
          <div style={{ border: '1px solid #10b981', padding: '15px', borderRadius: '8px' }}>
            <h3 style={{ color: '#10b981', margin: '0 0 15px 0' }}>✅ Good: Unique ID as Key</h3>
            {items.map((item) => (
              <div key={item.id} style={{ marginBottom: '10px' }}>
                <span style={{ display: 'inline-block', width: '120px' }}>{item.text}</span>
                <input type="text" placeholder="Type here..." style={{ padding: '5px', borderRadius: '4px', border: 'none' }} />
              </div>
            ))}
          </div>

        </div>
      </div>

      <h3 style={{ marginTop: '30px' }}>Why did the Index list break?</h3>
      <p style={{ color: '#d1d5db', background: '#2b303b', padding: '15px', borderRadius: '8px' }}>
        Jab aap naya item top par add karte ho, toh sabhi purane items ka <strong>Index shift ho jata hai</strong> (jo pehle 0 tha, wo ab 1 ban gaya). React ki Diffing algorithm dekhti hai ki key <code>0</code> pehle bhi thi, aaj bhi hai, toh wo input box ki purani state wahi chhod deti hai, bhale hi text change ho gaya ho. Unique ID (jaise database PK) hamesha apni jagah lock rakhti hai.
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 3: INTERVIEW CHEAT SHEET ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        3. The Heuristics (Rules of Diffing)
      </h2>
      <p style={{ color: '#d1d5db', marginBottom: '20px' }}>
        React do trees ko compare karne ke liye jo shortcut (O(n) complexity) leta hai, uske 2 main rules hain:
      </p>

      <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', padding: '15px', borderRadius: '0 8px 8px 0', marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#3b82f6' }}>Rule 1: Different Element Types = Full Rebuild</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          Agar ek <code>&lt;div&gt;</code> badal kar <code>&lt;span&gt;</code> ho gaya hai, toh React andar ka kuch compare nahi karega. Wo pura purana tree destroy karega aur naya tree build karega.
        </p>
      </div>

      <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderLeft: '4px solid #10b981', padding: '15px', borderRadius: '0 8px 8px 0' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#10b981' }}>Rule 2: The 'key' attribute</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          Lists ko compare karte waqt React developers se <code>key</code> prop mangta hai taaki wo pehchan sake ki element add hua hai, remove hua hai, ya sirf apni jagah se move hua hai.
        </p>
      </div>

    </div>
  );
}