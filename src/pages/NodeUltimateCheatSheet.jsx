import React from 'react';

const qBox = { background: '#191c20', border: '1px solid #343a46', borderRadius: '8px', padding: '20px', marginBottom: '15px' };
const qTitle = { color: '#10b981', margin: '0 0 10px 0', fontSize: '1.2rem' };

export default function NodeUltimateCheatSheet() {
  const qa = [
    { q: "How Node.js works single-threaded yet handles concurrency?", a: "Node.js uses the V8 engine and libuv library. The main thread runs JS, while I/O operations (file, network) are offloaded to libuv's thread pool or OS kernels, allowing non-blocking I/O." },
    { q: "Explain the Event Loop phases.", a: "The Event Loop processes: Timers (setTimeout), Pending Callbacks, Poll (I/O), Check (setImmediate), and Close Callbacks. It prioritizes the Microtask queue (Promises) over the Macrotask queue." },
    { q: "Difference between process.nextTick() and setImmediate()?", a: "process.nextTick() executes immediately after the current operation finishes (highest priority), while setImmediate() executes in the Check phase of the next event loop iteration." },
    { q: "Why is 'require' synchronous and 'import' asynchronous?", a: "CommonJS (require) was designed for server-side where file loads are fast. ESM (import) is designed for both browser and server, enabling top-level await and better tree-shaking." },
    { q: "What are Streams and why use them?", a: "Streams process data in chunks instead of loading the entire file into RAM, preventing 'Out of Memory' crashes when handling large files." },
    { q: "What is the benefit of Clustering?", a: "Clustering allows you to spawn child processes (workers) for each CPU core, enabling a Node.js app to handle more concurrent requests by utilizing multi-core hardware." },
    { q: "Explain the Middleware pattern in Express.", a: "Middleware functions have access to req, res, and the next() function. They are used to execute code, modify requests, and terminate cycles, forming a pipeline." },
    { q: "Why use JWT for authentication?", a: "JWT is stateless. The server doesn't need to store session data in memory or DB, making it highly scalable across microservices and clustered server environments." }
  ];

  return (
    <div style={{ color: '#ebecf0', maxWidth: '800px', margin: '0 auto', paddingBottom: '50px' }}>
      <h1>Node.js Interview Cheat Sheet 🏆</h1>
      {qa.map((item, i) => (
        <div key={i} style={qBox}>
          <h3 style={qTitle}>{i + 1}. {item.q}</h3>
          <p style={{ color: '#d1d5db' }}>{item.a}</p>
        </div>
      ))}
    </div>
  );
}