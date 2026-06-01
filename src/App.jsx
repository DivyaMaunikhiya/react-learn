// src/App.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';

// --- React Pages Imports (Preserving exact filenames & casings) ---
import UseStateDoc from './pages/UseStateDoc';
import UseEffectDoc from './pages/UseEffectDoc';
import UsePropsDoc from './pages/UsePropsDoc';
import UseContextDoc from './pages/UseContextDoc';
import UseRefDoc from './pages/UseRefDoc';
import UseReducerDoc from './pages/useReducer'; 
import ReactMemoDoc from './pages/ReactMemoDoc';
import UseMemoDoc from './pages/UseMemoDoc';
import UseCallbackDoc from './pages/UseCallbackDoc';
import ReduxDoc from './pages/ReduxDoc';
import UseCustomHookDoc from './pages/UseCustomHookDoc';
import UseRouterDoc from './pages/UseRouterDoc';
import UseVirtualDomDoc from './pages/useVirtualDomDoc'; 
import UltimateCheatSheet from './pages/UltimateCheatSheet';

// --- Node Pages Imports ---
import NodeV8Doc from './pages/NodeV8Doc'; 
import NodeEventLoopDoc from './pages/NodeEventLoopDoc';
import NodeModulesDoc from './pages/NodeModulesDoc';
import NodeAsyncFlowDoc from './pages/NodeAsyncFlowDoc';
import NodeEventEmittersDoc from './pages/NodeEventEmittersDoc';
import NodeCoreModulesDoc from './pages/NodeCoreModulesDoc';
import NodeExpressBasicsDoc from './pages/NodeExpressBasicsDoc';
import NodeRoutingDoc  from './pages/NodeRoutingDoc';
import NodeMiddlewareDoc from './pages/NodeMiddlewareDoc';
import NodeErrorHandlingDoc from './pages/NodeErrorHandlingDoc';
import NodeStreamsDoc from './pages/NodeStreamsDoc';
import NodeClusteringDoc from './pages/NodeClusteringDoc';
import NodeSecurityAuthDoc from './pages/NodeSecurityAuthDoc';
import NodeUltimateCheatSheet from './pages/NodeUltimateCheatSheet';

// --- Node Temporary Placeholder ---
const NodePlaceholder = ({ title }) => (
  <div style={{ color: '#f6f7f9', padding: '40px', border: '1px dashed #10b981', borderRadius: '12px', background: '#191c20' }}>
    <h1 style={{ color: '#10b981', margin: '0 0 15px 0' }}>{title}</h1>
    <p style={{ color: '#9ca3af', fontSize: '1.1rem' }}>
      Backend zone me aapka swagat hai. Is core topic ka deep dive documentation aur code sandbox hum agle step me setup karenge!
    </p>
  </div>
);

// --- Global Data Definition ---
const reactTopicsData = [
  { id: 'useState', title: '1. useState (State)' },
  { id: 'useEffect', title: '2. useEffect (Lifecycle)' },
  { id: 'usePropsDoc', title: '3. useProps (Props Drilling)' },
  { id: 'useContext', title: '4. useContext (Context API)' },
  { id: 'useReference', title: '5. useReference (State Management)' },
  { id: 'useReducer', title: '6. useReducer (State Management)' },
  { id: 'reactMemo', title: '7. React.memo (Performance Optimization)' },
  { id: 'useMemo', title: '8. useMemo (Performance Optimization)' },   
  { id: 'useCallback', title: '9. useCallback (Performance Optimization)' },
  { id: 'redux', title: '10. Redux (State Management Library)' },
  { id: 'useCustomHook', title: '11. Custom Hooks (Reusability)' },
  { id: 'useRouter', title: '12. useRouter (Routing)' },
  { id: 'useVirtualDom', title: '13. useVirtualDom (Virtual DOM Explained)' },
  { id: 'ultimateCheatSheet', title: '14. Ultimate Cheat Sheet 🏆' }
];

const nodeTopicsData = [
  { id: 'v8Engine', title: '1. V8 Engine & Architecture' },
  { id: 'eventLoop', title: '2. The Event Loop' },
  { id: 'modulesSystem', title: '3. Modules (CJS vs ESM)' },
  { id: 'asyncFlow', title: '4. Async Flow & Promises' },
  { id: 'eventEmitters', title: '5. Event Emitters' },
  { id: 'coreModules', title: '6. Core Modules (fs & path)' },
  { id: 'expressBasics', title: '7. Express.js Basics' },
    { id: 'nodeRouting', title: '7. routing.js Basics' },
  { id: 'middleware', title: '8. Middleware Deep Dive' },
  { id: 'errorHandling', title: '9. Global Error Handling' },
  { id: 'streamsBuffers', title: '10. Streams & Buffers' },
  { id: 'clusteringThreads', title: '11. Clustering & Threads' },
  { id: 'securityAuth', title: '12. Security & JWT Auth' },
  { id: 'nodeCheatSheet', title: '13. Node Cheat Sheet 🏆' }
];

export default function App() {
  const [activeCourse, setActiveCourse] = useState('react'); 
  const [activeTopic, setActiveTopic] = useState('useState'); 

  useEffect(() => {
    if (activeCourse === 'react') {
      setActiveTopic(reactTopicsData[0].id);
    } else if (activeCourse === 'node') {
      setActiveTopic(nodeTopicsData[0].id);
    }
  }, [activeCourse]);

  const currentList = activeCourse === 'react' ? reactTopicsData : nodeTopicsData;

  const renderContent = () => {
    if (activeCourse === 'react') {
      switch (activeTopic) {
        case 'useState': return <UseStateDoc />;
        case 'useEffect': return <UseEffectDoc />;
        case 'usePropsDoc': return <UsePropsDoc />;
        case 'useContext': return <UseContextDoc />;
        case 'useReference': return <UseRefDoc />;
        case 'useReducer': return <UseReducerDoc />;
        case 'reactMemo': return <ReactMemoDoc />;
        case 'useMemo': return <UseMemoDoc />;
        case 'useCallback': return <UseCallbackDoc />;
        case 'redux': return <ReduxDoc />;
        case 'useCustomHook': return <UseCustomHookDoc />;
        case 'useRouter': return <UseRouterDoc />;
        case 'useVirtualDom': return <UseVirtualDomDoc />;
        case 'ultimateCheatSheet': return <UltimateCheatSheet />;
        default: return <h2 style={{ color: 'white' }}>Select a React topic</h2>;
      }
    } else if (activeCourse === 'node') {
      // <-- 2. YAHAN NODE KA SWITCH CASE ADD HUA HAI -->
      switch (activeTopic) {
        case 'v8Engine': return <NodeV8Doc />;
        case 'eventLoop': return <NodeEventLoopDoc />;
        case 'modulesSystem': return <NodeModulesDoc />;
        case 'asyncFlow': return <NodeAsyncFlowDoc />;
        case 'eventEmitters': return <NodeEventEmittersDoc />;
        case 'coreModules': return <NodeCoreModulesDoc />;
        case 'expressBasics': return <NodeExpressBasicsDoc />;
        case 'nodeRouting' : return <NodeRoutingDoc/>;
        case 'middleware': return <NodeMiddlewareDoc />;
        case 'errorHandling': return <NodeErrorHandlingDoc />;
        case 'streamsBuffers': return <NodeStreamsDoc />;
        case 'clusteringThreads': return <NodeClusteringDoc />;
        case 'securityAuth': return <NodeSecurityAuthDoc />;
        case 'nodeCheatSheet': return <NodeUltimateCheatSheet />;
        default: 
          const activeNodeObject = nodeTopicsData.find(t => t.id === activeTopic);
          return <NodePlaceholder title={activeNodeObject?.title || 'Node.js Mastery'} />;
          
      }
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#23272f' }}>
      
      <Sidebar 
        activeCourse={activeCourse} 
        setActiveCourse={setActiveCourse} 
        activeTopic={activeTopic} 
        setActiveTopic={setActiveTopic} 
        topicsList={currentList}
      />

      <main style={{ 
        flex: 1, 
        padding: '60px', 
        overflowY: 'auto' 
      }}>
        {renderContent()}
      </main>

    </div>
  );
}