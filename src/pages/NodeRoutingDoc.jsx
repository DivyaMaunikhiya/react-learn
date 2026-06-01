// src/pages/NodeRoutingDoc.jsx
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

const fileItemStyle = (isActive) => ({
  padding: '10px', cursor: 'pointer', borderRadius: '4px', 
  backgroundColor: isActive ? 'rgba(88, 196, 220, 0.1)' : 'transparent',
  color: isActive ? '#58c4dc' : '#d1d5db',
  borderLeft: isActive ? '3px solid #58c4dc' : '3px solid transparent',
  marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '10px',
  transition: 'all 0.2s'
});

export default function NodeRoutingDoc() {
  const [activeFile, setActiveFile] = useState('app');

  // Simulated Architecture Code
  const fileData = {
    app: {
      name: 'app.js',
      icon: '⚙️',
      desc: 'The Entry Point. Yahan hum server start karte hain aur base routes define karte hain.',
      code: `const express = require('express');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());

// 🚀 MOUNTING THE ROUTERS
// Jab bhi URL '/api/users' se shuru ho, usko userRoutes ke paas bhej do
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));`
    },
    routes: {
      name: 'userRoutes.js',
      icon: '🚏',
      desc: 'The Traffic Cop. Iska kaam sirf URL match karna aur sahi controller function ko call karna hai. Isme logic nahi hota.',
      code: `const express = require('express');
const router = express.Router(); // 👈 Create a router instance
const userController = require('../controllers/userController');

// Actual URL becomes: GET /api/users/
router.get('/', userController.getAllUsers);

// Actual URL becomes: POST /api/users/
router.post('/', userController.createUser);

// Actual URL becomes: GET /api/users/:id
router.get('/:id', userController.getUserById);

module.exports = router;`
    },
    controllers: {
      name: 'userController.js',
      icon: '🧠',
      desc: 'The Brain (Business Logic). Asli kaam yahan hota hai (Database se baat karna, data filter karna, response bhejna).',
      code: `// Mock Database
const users = [{ id: 1, name: 'Rahul' }];

exports.getAllUsers = (req, res) => {
  // DB logic here...
  res.status(200).json({ success: true, data: users });
};

exports.createUser = (req, res) => {
  const newUser = req.body;
  // DB logic here...
  res.status(201).json({ success: true, message: 'User created' });
};

exports.getUserById = (req, res) => {
  const id = req.params.id;
  // DB logic here...
  res.status(200).json({ success: true, data: { id, name: 'Rahul' } });
};`
    }
  };

  return (
    <div style={{ color: '#f6f7f9', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7', paddingBottom: '50px' }}>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#f6f7f9' }}>
        7.1 Clean Routing Architecture
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        Production mein aapko apna code <strong>Modular</strong> rakhna hota hai. Express <code>express.Router()</code> provide karta hai jo ek "Mini-App" ki tarah behave karta hai. Hum apne routes ko alag files mein banate hain aur unhe main <code>app.js</code> mein "Mount" kar dete hain.
      </p>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 1: LIVE DEMO (ARCHITECTURE EXPLORER) ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        1. Architecture Explorer (MVC Pattern)
      </h2>
      <p style={{ color: '#d1d5db' }}>
        Real-world backend mein hum "Separation of Concerns" follow karte hain. Routes sirf URL map karte hain, aur Controllers actual logic handle karte hain. Neeche files par click karke unka code dekho.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginTop: '20px' }}>
        
        {/* Sidebar / Folder Tree */}
        <div style={{ background: '#191c20', padding: '15px', borderRadius: '8px', border: '1px solid #343a46' }}>
          <h4 style={{ color: '#9ca3af', margin: '0 0 15px 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>📂 Project Root</h4>
          
          <div onClick={() => setActiveFile('app')} style={fileItemStyle(activeFile === 'app')}>
            {fileData.app.icon} {fileData.app.name}
          </div>
          
          <div style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <h4 style={{ color: '#9ca3af', margin: '0 0 10px 0', fontSize: '0.85rem' }}>📁 routes/</h4>
            <div onClick={() => setActiveFile('routes')} style={fileItemStyle(activeFile === 'routes')}>
              {fileData.routes.icon} {fileData.routes.name}
            </div>
          </div>

          <div style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <h4 style={{ color: '#9ca3af', margin: '0 0 10px 0', fontSize: '0.85rem' }}>📁 controllers/</h4>
            <div onClick={() => setActiveFile('controllers')} style={fileItemStyle(activeFile === 'controllers')}>
              {fileData.controllers.icon} {fileData.controllers.name}
            </div>
          </div>
        </div>

        {/* Code Viewer */}
        <div style={{ background: '#111827', borderRadius: '8px', border: '1px solid #343a46', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#23272f', padding: '15px', borderBottom: '1px solid #343a46' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#f6f7f9', display: 'flex', alignItems: 'center', gap: '10px' }}>
              {fileData[activeFile].icon} {fileData[activeFile].name}
            </h3>
            <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.9rem' }}>
              {fileData[activeFile].desc}
            </p>
          </div>
          <pre style={{ padding: '20px', margin: 0, color: '#e2e8f0', fontSize: '0.95rem', overflowX: 'auto', flex: 1 }}>
            {fileData[activeFile].code}
          </pre>
        </div>

      </div>

      <hr style={{ border: '0', height: '1px', background: '#343a46', margin: '40px 0' }} />

      {/* ---------------- PART 2: INTERVIEW FOCUS ---------------- */}
      <h2 style={{ color: '#58c4dc', fontSize: '1.8rem', marginBottom: '20px' }}>
        2. Interview Focus: Why use express.Router()?
      </h2>

      <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderLeft: '4px solid #10b981', padding: '15px', borderRadius: '0 8px 8px 0', marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#10b981' }}>✅ 1. Modularity (Code Cleanliness)</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          Agar aapke paas 50 User ke routes hain aur 50 Product ke routes hain, toh aap unhe separate files mein rakh sakte ho. Har dev apni specific file par kaam kar sakta hai bina dusre ka code break kiye (Git conflicts se bachna).
        </p>
      </div>

      <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', padding: '15px', borderRadius: '0 8px 8px 0', marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#3b82f6' }}>✅ 2. Prefixing URLs Automatically</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          <code>app.use('/api/users', userRoutes)</code> likhne se faida ye hai ki <code>userRoutes.js</code> ke andar aapko baar-baar <code>/api/users</code> likhne ki zaroorat nahi hai. Wahan sirf <code>/</code> likho, Express automatically prefix add kar dega.
        </p>
      </div>

      <div style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', borderLeft: '4px solid #a855f7', padding: '15px', borderRadius: '0 8px 8px 0' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#a855f7' }}>✅ 3. Router-Level Middleware</h4>
        <p style={{ margin: 0, color: '#d1d5db' }}>
          Aap ek specific Router par aisi security (middleware) laga sakte ho jo poori app par na lage. Example: <code>app.use('/api/admin', authMiddleware, adminRoutes)</code>. Isse Admin ke saare routes ek hi line mein secure ho gaye!
        </p>
      </div>

    </div>
  );
}