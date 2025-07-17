import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">CodeOrbit</h1>
      <Link
        to="/editor/new"
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        New Project
      </Link>
    </div>
  );
}