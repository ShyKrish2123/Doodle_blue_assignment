import { Routes, Route, useNavigate } from 'react-router';
import { useContext } from 'react';
import About from './About';
import Education from './Education';
import Experience from './Experience';
import { ThemeContext } from './ThemeContext.jsx';
import './App.css';

const App = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isDark = theme === 'dark';

  return (
    <div
      className="portfolio"
      style={{
        backgroundColor: isDark ? '#121212' : '#f3f4f6',
        color: isDark ? '#f5f5f5' : '#333',
        minHeight: '100vh',
        transition: 'background-color 0.3s, color 0.3s',
      }}
    >
      <h1 style={{ color: isDark ? '#f5f5f5' : '#2563eb' }}>
        My Portfolio
      </h1>

      <p
        className="subtitle"
        style={{ color: isDark ? '#ccc' : '#666' }}
      >
        Computer Science Engineering Student
      </p>

      <button className="theme-toggle" onClick={toggleTheme}>
        {isDark ? ' Light Mode' : ' Dark Mode'}
      </button>

      <nav className="navbar">
        <button onClick={() => navigate('/')}>About</button>
        <button onClick={() => navigate('/education')}>Education</button>
        <button onClick={() => navigate('/experience')}>Experience</button>
      </nav>

      <div
        className="content"
        style={{
          backgroundColor: isDark ? '#1e1e1e' : '#fff',
          color: isDark ? '#f5f5f5' : '#333',
          borderColor: isDark ? '#444' : '#ddd',
        }}
      >
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/education" element={<Education />} />
          <Route path="/experience" element={<Experience />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;