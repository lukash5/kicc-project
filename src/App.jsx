import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className="h-screen flex flex-col">
      {/* Topbar */}
      <header className="bg-indigo-700 text-white px-6 py-4 shadow-lg">
        <h1 className="text-2xl font-bold">Wine-Quality Classifier</h1>
      </header>

      {/* Main layout: Sidebar + Content */}
      <div className="w-full flex flex-1 overflow-hidden">
        <Home />
      </div>
    </div>
  );
}

export default App;
