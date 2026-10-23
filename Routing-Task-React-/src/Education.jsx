import { useContext } from 'react';
import { ThemeContext } from './ThemeContext.jsx';

const Education = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <div>
      <h2 style={{ color: isDark ? '#60a5fa' : '#2563eb' }}>
        Education
      </h2>

      <h3 style={{ color: isDark ? '#f5f5f5' : '#333' }}>
        Bachelor of Engineering
      </h3>

      <p style={{ color: isDark ? '#e5e7eb' : '#333' }}>
        Branch: Computer Science and Engineering
      </p>

      <p style={{ color: isDark ? '#e5e7eb' : '#333' }}>
        College: S.A Engineering College
      </p>

      <p style={{ color: isDark ? '#e5e7eb' : '#333' }}>
        CGPA: 7.82
      </p>
    </div>
  );
};

export default Education;