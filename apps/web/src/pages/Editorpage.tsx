import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

export default function EditorPage() {
  const { projectId } = useParams();
  const [code, setCode] = useState('');

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
        language: 'javascript',
      });
      window.location.replace(`http://localhost:5173/editor/${res.data.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="p-2 bg-gray-800 text-white flex justify-between">
        <span>CodeOrbit Editor</span>
        <button onClick={saveProject} className="bg-green-600 px-4 py-1 rounded">
          Save
        </button>
      </header>
      <Editor
        height="100%"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={(val) => setCode(val || '')}
      />
    </div>
  );
}