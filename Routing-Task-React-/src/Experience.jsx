import { useContext } from 'react';
import { ThemeContext } from './ThemeContext.jsx';

const Experience = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <div>
      <h2 style={{ color: isDark ? '#60a5fa' : '#2563eb' }}>
        Experience
      </h2>

      <h3 style={{ color: isDark ? '#f5f5f5' : '#333' }}>
        Full Stack Developer Intern
      </h3>

      <p style={{ color: isDark ? '#e5e7eb' : '#333' }}>
        Company: Marzelet Info Technology Pvt. Ltd.
      </p>

      <p style={{ color: isDark ? '#e5e7eb' : '#333' }}>
        Duration: 3 Months
      </p>

      <p style={{ color: isDark ? '#e5e7eb' : '#333' }}>
        Worked on web development and learned about AI-related projects,
        including Retrieval-Augmented Generation (RAG).
      </p>
    </div>
  );
};

export default Experience;

