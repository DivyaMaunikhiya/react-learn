// src/pages/UltimateCheatSheet.jsx
import React from 'react';

// ==========================================
// HELPER STYLES
// ==========================================
const phaseHeaderStyle = {
  background: 'linear-gradient(90deg, #1e3a8a 0%, #23272f 100%)',
  padding: '15px 20px',
  borderRadius: '8px',
  color: '#f6f7f9',
  marginTop: '40px',
  marginBottom: '20px',
  borderLeft: '5px solid #58c4dc'
};

const qBoxStyle = {
  background: '#191c20',
  border: '1px solid #343a46',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '15px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
};

const qTitleStyle = {
  margin: '0 0 10px 0',
  color: '#58c4dc',
  fontSize: '1.2rem',
  fontWeight: '600'
};

const aTextStyle = {
  margin: 0,
  color: '#d1d5db',
  lineHeight: '1.6',
  fontSize: '1rem'
};

const highlightStyle = {
  color: '#10b981',
  fontWeight: 'bold'
};

export default function UltimateCheatSheet() {
  return (
    <div style={{ color: '#f6f7f9', maxWidth: '900px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        The Ultimate React Cheat Sheet 🏆
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af', marginBottom: '20px' }}>
        Backend to Frontend Transition: All core concepts, hooks, and architecture questions in one place.
      </p>

      {/* ========================================== */}
      {/* PHASE 1: CORE FOUNDATION */}
      {/* ========================================== */}
      <h2 style={phaseHeaderStyle}>Phase 1: The Core Foundation</h2>

      <div style={qBoxStyle}>
        <h3 style={qTitleStyle}>Q: What is the difference between normal variables and `useState`?</h3>
        <p style={aTextStyle}>
          Normal variables (<code>let x = 0</code>) lose their data when a component re-renders, and updating them does not trigger the UI to update. <code>useState</code> preserves the data across renders and automatically triggers a UI re-render (paint) whenever the state is updated via its setter function.
        </p>
      </div>

      <div style={qBoxStyle}>
        <h3 style={qTitleStyle}>Q: Why are React state updates asynchronous?</h3>
        <p style={aTextStyle}>
          For performance optimization, React <span style={highlightStyle}>batches</span> state updates. If you call <code>setCount(count + 1)</code> three times in one function, React only processes it once to prevent unnecessary UI renders. To update state based on the immediate previous state, you must pass a callback function: <code>setCount(prev =&gt; prev + 1)</code>.
        </p>
      </div>

      <div style={qBoxStyle}>
        <h3 style={qTitleStyle}>Q: Explain the `useEffect` Dependency Array.</h3>
        <p style={aTextStyle}>
          The dependency array controls when the effect runs:<br/>
          • <strong>No Array:</strong> Runs on <em>every</em> render (Dangerous, can cause infinite loops).<br/>
          • <strong>Empty Array `[]`:</strong> Runs <em>only once</em> when the component mounts (Good for initial API calls).<br/>
          • <strong>Array with variables `[x, y]`:</strong> Runs on mount AND whenever <code>x</code> or <code>y</code> changes.
        </p>
      </div>

      <div style={qBoxStyle}>
        <h3 style={qTitleStyle}>Q: What is Prop Drilling and why is it bad?</h3>
        <p style={aTextStyle}>
          Prop Drilling is the process of passing data from a top-level parent down to a deeply nested child through multiple middle components that do not actually need the data. It makes the code harder to read, maintain, and refactor.
        </p>
      </div>

      {/* ========================================== */}
      {/* PHASE 2: ADVANCED STATE & DATA */}
      {/* ========================================== */}
      <h2 style={phaseHeaderStyle}>Phase 2: Advanced State & Data</h2>

      <div style={qBoxStyle}>
        <h3 style={qTitleStyle}>Q: How does `useContext` solve Prop Drilling?</h3>
        <p style={aTextStyle}>
          <code>useContext</code> creates a global "teleportation" pipeline. You wrap your parent component in a <code>Provider</code> with a <code>value</code>. Any nested child, no matter how deep, can directly consume that value without passing props through intermediate components.
        </p>
      </div>

      <div style={qBoxStyle}>
        <h3 style={qTitleStyle}>Q: What is the main performance gotcha with Context API?</h3>
        <p style={aTextStyle}>
          Whenever the <code>value</code> in the Context Provider changes, <span style={highlightStyle}>every single component</span> consuming that context will re-render. Therefore, it is bad for high-frequency data (like keystrokes or fast streams) and better for low-frequency data (like Themes or Auth state).
        </p>
      </div>

      <div style={qBoxStyle}>
        <h3 style={qTitleStyle}>Q: State vs. Ref: When to use `useRef` over `useState`?</h3>
        <p style={aTextStyle}>
          Use <code>useState</code> for data that should reflect on the screen (triggers re-render). Use <code>useRef</code> for "behind-the-scenes" mutable data that needs to persist across renders but <span style={highlightStyle}>should NOT trigger a UI re-render</span> when changed (e.g., storing Timer IDs or accessing DOM elements directly).
        </p>
      </div>

      <div style={qBoxStyle}>
        <h3 style={qTitleStyle}>Q: When should you prefer `useReducer` over `useState`?</h3>
        <p style={aTextStyle}>
          When state logic is complex, involves multiple sub-values (like objects/arrays), or when the next state depends heavily on the previous state. It centralizes state transition logic into a single pure function (the reducer) using distinct "Actions", making it easier to test and debug.
        </p>
      </div>

      {/* ========================================== */}
      {/* PHASE 3: PERFORMANCE OPTIMIZATION */}
      {/* ========================================== */}
      <h2 style={phaseHeaderStyle}>Phase 3: Performance Optimization</h2>

      <div style={qBoxStyle}>
        <h3 style={qTitleStyle}>Q: What is `React.memo`?</h3>
        <p style={aTextStyle}>
          It is a Higher-Order Component (HOC) used to wrap functional components. It prevents a child component from re-rendering when its parent re-renders, <span style={highlightStyle}>unless the props passed to the child have changed</span> (via shallow comparison).
        </p>
      </div>

      <div style={qBoxStyle}>
        <h3 style={qTitleStyle}>Q: Difference between `useMemo` and `useCallback`?</h3>
        <p style={aTextStyle}>
          • <strong>useMemo:</strong> Caches the <em>result</em> (value) of an expensive calculation so it doesn't run on every render.<br/>
          • <strong>useCallback:</strong> Caches a <em>function definition</em> (its memory reference) so that a new function object isn't created on every render, which is crucial for preventing unwanted re-renders in <code>React.memo</code> wrapped child components.
        </p>
      </div>

      <div style={qBoxStyle}>
        <h3 style={qTitleStyle}>Q: Why choose Redux over Context API?</h3>
        <p style={aTextStyle}>
          Redux is highly optimized for complex, high-frequency global state updates. Unlike Context API (which re-renders all consumers), Redux ensures that only components listening to a <em>specific piece</em> of the state are re-rendered. It also offers powerful Time-Travel debugging via Redux DevTools.
        </p>
      </div>

      {/* ========================================== */}
      {/* PHASE 4: ARCHITECTURE & REAL-WORLD */}
      {/* ========================================== */}
      <h2 style={phaseHeaderStyle}>Phase 4: Architecture & Real-World</h2>

      <div style={qBoxStyle}>
        <h3 style={qTitleStyle}>Q: Why do we write Custom Hooks? Do they share state?</h3>
        <p style={aTextStyle}>
          We write Custom Hooks to extract and reuse <strong>stateful logic</strong> across multiple components, adhering to the DRY principle. <span style={highlightStyle}>No, they do not share state.</span> Every time a component calls a custom hook, it gets its own completely isolated copy of the state. 
        </p>
      </div>

      <div style={qBoxStyle}>
        <h3 style={qTitleStyle}>Q: How does React Router (v6) enable Single Page Applications (SPAs)?</h3>
        <p style={aTextStyle}>
          Instead of making HTTP requests to the server for new HTML pages (which causes a full page reload), React Router intercepts URL changes using the browser's History API. It prevents the default reload behavior and seamlessly mounts/unmounts the appropriate React components on the client side dynamically.
        </p>
      </div>

      <div style={qBoxStyle}>
        <h3 style={qTitleStyle}>Q: Explain the Virtual DOM and Diffing in 3 sentences.</h3>
        <p style={aTextStyle}>
          The Virtual DOM is a lightweight, in-memory representation of the Real DOM. When state changes, React creates a new Virtual DOM tree and compares it to the previous one using a heuristic O(n) "Diffing Algorithm". Once differences are identified, React performs a "Reconciliation" process to batch-update only the changed nodes in the actual browser DOM.
        </p>
      </div>

    </div>
  );
}