// src/components/Sidebar.jsx
import React from 'react';

export default function Sidebar({ 
  activeCourse, 
  setActiveCourse, 
  activeTopic, 
  setActiveTopic, 
  topicsList 
}) {
  return (
    <nav style={{ 
      width: '300px', 
      backgroundColor: '#23272f', 
      borderRight: '1px solid #343a46', 
      padding: '20px', 
      height: '100vh', 
      position: 'sticky', 
      top: 0,
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* 🛠️ Dynamic Course Selector Under Heading */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ 
          color: '#f6f7f9', 
          fontSize: '1.4rem', 
          margin: '0 0 15px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ color: activeCourse === 'react' ? '#58c4dc' : '#10b981', fontSize: '1.8rem', transition: 'color 0.2s' }}>
            {activeCourse === 'react' ? '⚛️' : '🟢'}
          </span> 
          Course Hub
        </h2>

        <select 
          value={activeCourse} 
          onChange={(e) => setActiveCourse(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#191c20',
            color: activeCourse === 'react' ? '#58c4dc' : '#10b981',
            border: '1px solid #343a46',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            outline: 'none',
            textAlign: 'left'
          }}
        >
          <option value="react">⚛️ React Revise</option>
          <option value="node">🟢 Node.js Mastery</option>
        </select>
      </div>
      
      {/* Dynamic List Rendering */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, overflowY: 'auto', flex: 1 }}>
        {topicsList.map((topic) => (
          <li 
            key={topic.id}
            onClick={() => setActiveTopic(topic.id)}
            style={{
              padding: '10px 16px',
              cursor: 'pointer',
              backgroundColor: activeTopic === topic.id ? 'rgba(88, 196, 220, 0.08)' : 'transparent',
              color: activeTopic === topic.id ? (activeCourse === 'react' ? '#58c4dc' : '#10b981') : '#ebecf0',
              borderLeft: activeTopic === topic.id 
                ? `4px solid ${activeCourse === 'react' ? '#58c4dc' : '#10b981'}` 
                : '4px solid transparent',
              borderRadius: '0 8px 8px 0',
              marginBottom: '8px',
              fontWeight: activeTopic === topic.id ? '600' : '400',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            {topic.title}
          </li>
        ))}
      </ul>
    </nav>
  );
}