import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import './Editorpage.css';

export default function EditorPage() {
  const { projectId } = useParams();
  const [code, setCode] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const API = 'http://localhost:5172';   // Express API port

  // Load existing or start blank
  useEffect(() => {
    if (projectId && projectId !== 'new') {
      axios.get(`${API}/api/projects/${projectId}`)
        .then(res => setCode(res.data.content))
        .catch(() => setCode(''));
    }
  }, [projectId]);

  const saveProject = async () => {
    try {
      const res = await axios.post(`${API}/api/projects`, {
        name: 'Untitled',
        content: code,
        language: 'java',
      });
      window.location.replace(`http://localhost:5173/editor/${res.data.id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setIsSaving(false), 800);
    }
  };

  return (
    <div className="editor-page">
      {/* Top Navigation Bar */}
      <header className="editor-header">
        <div className="logo">
          Code<span>Orbit</span>
        </div>
        <div className="actions">
          <button
            onClick={saveProject}
            className="save-button"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </header>

      {/* Code Editor */}
      <div className="editor-container">
        <Editor
          language="java"
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val || '')}
          options={{
            fontSize: 14,
            fontFamily: 'monospace',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>

      {/* Optional Status Bar */}
      {<div className="status-bar">
        <span>Language: Java</span>
        <span>{projectId === 'new' ? 'New Project' : `Project: ${projectId}`}</span>
      </div> }
    </div>
  );
}