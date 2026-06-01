// src/pages/NodeCoreModulesDoc.jsx
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

const fileIcon = "📄";
const folderIcon = "📁";

export default function NodeCoreModulesDoc() {
  // Simulated File System State
  const [files, setFiles] = useState([
    { name: 'app.js', content: 'console.log("Hello Node");' },
    { name: 'config.json', content: '{"port": 3000}' }
  ]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newFileName, setNewFileName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');

  // Simulating fs.writeFile
  const handleWriteFile = () => {
    if (!newFileName) return alert("File name is required!");
    
    const fileNameWithExt = newFileName.includes('.') ? newFileName : `${newFileName}.txt`;
    
    // Check if exists (Simulating overwrite)
    const existingIndex = files.findIndex(f => f.name === fileNameWithExt);
    
    if (existingIndex >= 0) {
      const updatedFiles = [...files];
      updatedFiles[existingIndex].content = newFileContent;
      setFiles(updatedFiles);
    } else {
      setFiles([...files, { name: fileNameWithExt, content: newFileContent }]);
    }
    
    setNewFileName('');
    setNewFileContent('');
  };

  // Simulating fs.unlink (Delete)
  const handleDeleteFile = (fileName) => {
    setFiles(files.filter(f => f.name !== fileName));
    if (selectedFile?.name === fileName) setSelectedFile(null);
  };

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        6. Core Modules (fs & path)
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        Browser ki JavaScript aapke computer ki hard drive ko touch nahi kar sakti (Security reasons). Par Node.js server par chalta hai, isliye ise files read/write karne ki puri azaadi hoti hai. Iske liye hum <code>fs</code> (File System) aur <code>path</code> module ka use karte hain.
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: LIVE DEMO ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. Live Demo: File System Simulator
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Neeche ek virtual file system hai. Aap naye files bana sakte ho aur existing files ko padh sakte ho, bilkul waise hi jaise Node.js ka <code>fs</code> module karta hai.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        
        {/* File Creator (fs.writeFile) */}
        <div style={boxStyle('#10b981')}>
          <h3 style={{ margin: '0 0 15px 0', color: '#10b981' }}>📝 fs.writeFile()</h3>
          <input 
            type="text" 
            placeholder="File Name (e.g., data.txt)" 
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #343a46', background: '#2b303b', color: 'white' }}
          />
          <textarea 
            placeholder="File Content..." 
            value={newFileContent}
            onChange={(e) => setNewFileContent(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #343a46', background: '#2b303b', color: 'white', minHeight: '80px', resize: 'vertical' }}
          />
          <button onClick={handleWriteFile} style={btnStyle('#10b981', 'white')}>Create / Overwrite File</button>
        </div>

        {/* File Explorer (fs.readdir & fs.readFile) */}
        <div style={boxStyle('#3b82f6')}>
          <h3 style={{ margin: '0 0 15px 0', color: '#3b82f6' }}>📂 __dirname/my-project/</h3>
          
          <div style={{ background: '#111827', padding: '10px', borderRadius: '6px', minHeight: '120px', border: '1px solid #343a46' }}>
            {files.length === 0 && <span style={{ color: '#9ca3af' }}>Directory is empty</span>}
            {files.map(file => (
              <div key={file.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', borderBottom: '1px solid #23272f' }}>
                <span 
                  style={{ cursor: 'pointer', color: '#e2e8f0', display: 'flex', gap: '8px' }}
                  onClick={() => setSelectedFile(file)}
                >
                  {fileIcon} {file.name}
                </span>
                <button onClick={() => handleDeleteFile(file.name)} style={{ background: 'transparent', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* File Reader Output */}
      {selectedFile && (
        <div style={{ ...boxStyle('#eab308'), marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#eab308' }}>📖 fs.readFile('{selectedFile.name}')</h3>
            <button onClick={() => setSelectedFile(null)} style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>Close</button>
          </div>
          <pre style={{ background: '#111827', padding: '15px', borderRadius: '6px', color: '#10b981', margin: 0 }}>
            {selectedFile.content}
          </pre>
        </div>
      )}

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: THE FS MODULE (SYNC VS ASYNC) ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. The fs Module: Sync vs Async
      </h2>
      <p style={{ color: '#d1d5db', marginBottom: '20px' }}>
        Node.js har file operation ke do versions deta hai: Ek jo Event Loop ko block karta hai (Sync), aur ek jo nahi karta (Async / Promise based).
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ border: '1px solid #dc2626', padding: '15px', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>❌ Bad: Synchronous (Blocking)</h4>
          <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: '0 0 10px 0' }}>Ye Event Loop ko rok dega jab tak file read na ho jaye. Baaki users wait karenge!</p>
          <pre style={{ background: '#111827', padding: '10px', borderRadius: '6px', color: '#e2e8f0', fontSize: '0.85rem' }}>
{`const fs = require('fs');

// Code ruka rahega jab tak 1GB file read na ho
const data = fs.readFileSync('big-file.txt', 'utf8');

console.log(data);
console.log("Ye baad me print hoga");`}
          </pre>
        </div>

        <div style={{ border: '1px solid #10b981', padding: '15px', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#10b981' }}>✅ Good: Promises (Non-Blocking)</h4>
          <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: '0 0 10px 0' }}>Modern tarika! Ye background me chalega aur Event Loop free rahega.</p>
          <pre style={{ background: '#111827', padding: '10px', borderRadius: '6px', color: '#e2e8f0', fontSize: '0.85rem' }}>
{`const fs = require('fs/promises');

async function readFile() {
  // Event loop ko block kiye bina wait karega
  const data = await fs.readFile('big-file.txt', 'utf8');
  console.log(data);
}

readFile();`}
          </pre>
        </div>
      </div>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 3: THE PATH MODULE ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        3. The path Module (The Path Fixer)
      </h2>

      <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', padding: '15px', borderRadius: '0 8px 8px 0', marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#3b82f6' }}>Problem: Cross-Platform Pathing</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          Agar aap strings jod kar path banate ho: <code>__dirname + '/public/index.html'</code>, toh ye Mac/Linux par toh theek chalega, par Windows (jo <code>\</code> use karta hai) par path break ho jayega.
        </p>
      </div>

      <p style={{ color: '#d1d5db' }}><strong>Solution: <code>path.join()</code></strong></p>
      <pre style={{ background: '#191c20', color: '#e2e8f0', padding: '20px', borderRadius: '10px', border: '1px solid #343a46', overflowX: 'auto' }}>
{`const path = require('path');

// Ye automatically OS ke hisaab se sahi slash ( / ya \\ ) laga dega
const safePath = path.join(__dirname, 'public', 'index.html');

console.log(safePath);
// Mac:   /Users/rahul/project/public/index.html
// Win:   C:\\Users\\rahul\\project\\public\\index.html`}
      </pre>

    </div>
  );
}