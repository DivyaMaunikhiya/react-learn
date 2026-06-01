// src/pages/UseReducerDoc.jsx
import React, { useReducer } from 'react';

// ==========================================
// HELPER STYLES
// ==========================================
const btnStyle = (bg, color) => ({
  padding: '8px 12px', backgroundColor: bg, color: color, border: 'none', 
  borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginRight: '5px'
});

const boxStyle = (borderColor) => ({
  padding: '20px', border: `1px solid ${borderColor}`, borderRadius: '8px', 
  marginTop: '15px', backgroundColor: '#191c20'
});

// ==========================================
// 1. INITIAL STATE & REDUCER (The Logic)
// ==========================================
// Backend logic yahan likha jata hai (Pure Function)
const initialState = { cartCount: 0, items: [] };

function cartReducer(state, action) {
  // Action handles how state changes
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, cartCount: state.cartCount + 1 };
    case 'REMOVE_ITEM':
      return state.cartCount > 0 
        ? { ...state, cartCount: state.cartCount - 1 } 
        : state;
    case 'RESET_CART':
      return initialState;
    default:
      return state;
  }
}

export default function UseReducerDoc() {
  // 2. INITIALIZE HOOK
  // Returns current state and the 'dispatch' function
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        6. useReducer Hook
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        Jab component ki state complex ho jaye (jaise ek saath 5-6 values change ho rahi hon) ya jab agali state purani state par depend karti ho, tab <code>useReducer</code> kaam aata hai. Ye <strong>Redux</strong> ka chota bhai hai.
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: THE CORE CONCEPT ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. How it Works (The Mental Model)
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Isme 3 main players hote hain:
      </p>
      <ul style={{ color: '#9ca3af', marginLeft: '20px' }}>
        <li><strong>Reducer Function:</strong> Ek "Traffic Controller" function jo purani state aur action lekar nayi state return karta hai.</li>
        <li><strong>Action:</strong> Ek object jo batata hai ki "Kya karna hai" (e.g., <code>{`{ type: 'ADD' }`}</code>).</li>
        <li><strong>Dispatch:</strong> Ek trigger function jise hum call karte hain action bhejne ke liye.</li>
      </ul>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: LIVE DEMO ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. Live Demo: Shopping Cart System
      </h2>
      
      <div style={boxStyle('#343a46')}>
        <h3 style={{ margin: '0 0 15px 0', color: '#58c4dc' }}>🛒 Your Shopping Cart</h3>
        <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
          Items: <span style={{ color: '#10b981' }}>{state.cartCount}</span>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => dispatch({ type: 'ADD_ITEM' })} 
            style={btnStyle('#10b981', 'white')}
          >
            Add to Cart
          </button>
          <button 
            onClick={() => dispatch({ type: 'REMOVE_ITEM' })} 
            style={btnStyle('#dc2626', 'white')}
          >
            Remove Item
          </button>
          <button 
            onClick={() => dispatch({ type: 'RESET_CART' })} 
            style={btnStyle('transparent', '#9ca3af', '1px solid #343a46')}
          >
            Reset Cart
          </button>
        </div>
      </div>

      <h3 style={{ marginTop: '30px' }}>Full Code Implementation:</h3>
      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`import { useReducer } from 'react';

// 1. Initial State
const initialState = { cartCount: 0 };

// 2. Reducer Function (Pure Logic - No Side Effects)
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return { cartCount: state.cartCount + 1 };
    case 'REMOVE_ITEM':
      return { cartCount: state.cartCount - 1 };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function Cart() {
  // 3. Hook Setup
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <div>
      <h3>Items: {state.cartCount}</h3>
      <button onClick={() => dispatch({ type: 'ADD_ITEM' })}>Add</button>
      <button onClick={() => dispatch({ type: 'REMOVE_ITEM' })}>Remove</button>
    </div>
  );
}`}
      </pre>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 3: INTERVIEW PREP ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        3. useState vs useReducer (Interview Hot Topic 🔥)
      </h2>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#191c20', borderRadius: '8px', overflow: 'hidden' }}>
          <thead style={{ background: '#343a46', color: '#f6f7f9' }}>
            <tr>
              <th style={{ padding: '15px' }}>Feature</th>
              <th style={{ padding: '15px' }}><code>useState</code></th>
              <th style={{ padding: '15px' }}><code>useReducer</code></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>Logic Complexity</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>Simple values/objects.</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>Deeply nested/complex logic.</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>State Transitions</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>Direct updates.</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>Defined actions (Clean flow).</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#9ca3af' }}>Testability</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#d1d5db' }}>Harder to unit test logic.</td>
              <td style={{ padding: '15px', borderBottom: '1px solid #343a46', color: '#10b981' }}>Easy (Reducer is a pure JS function).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderLeft: '4px solid #10b981', padding: '15px', borderRadius: '0 8px 8px 0', marginTop: '30px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#10b981' }}>💡 Pro-Tip for Backend Devs</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          <code>useReducer</code> use karte waqt hamesha "Immutability" ka dhyan rakho. Reducer ke andar <code>state.count = 1</code> kabhi mat karna. Hamesha <code>return {'{ ...state, count: 1 }'}</code> return karna. 
        </p>
      </div>

    </div>
  );
}