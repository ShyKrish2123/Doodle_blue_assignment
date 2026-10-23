// import { useEffect } from 'react';
// import { Routes, Route, useNavigate } from 'react-router';
// import './App.css';

// import Home from './Home.jsx';
// import About from './About.jsx';
// import Contact from './Contact.jsx';

// const App = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     navigate('/');
//   }, []);

//   return (
//     <div className="app">
//       <h1>My Portfolio</h1>

//       <nav className="navbar">
//         <button onClick={() => navigate('/')}>Home</button>
//         <button onClick={() => navigate('/about')}>About</button>
//         <button onClick={() => navigate('/contact')}>Contact Us</button>
//       </nav>

//       <div className="content">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default App;


// End of Task 1 

// import react from 'react';

// import {useNavigate} from 'react-router'

// const App = () => {
//   const navigate = useNavigate();
//   return (
//     <div>
//       <h1>about page</h1>
//       <button onClick={() => navigate('/about')}>Go to About</button>
//       <button onClick={() => navigate('/home')}>Go to Home</button>
//       <button onClick={() => navigate('/contact')}>Go to Contact</button>
//     </div>
//   )
// }

// export default App;

import { useTheme } from "./context/ThemeContext";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import "./App.css";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <h1>React Theme Context</h1>

      <button className="theme-button" onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      <div className="navbar">
        <button onClick={() => document.getElementById("home").scrollIntoView()}>
          Home
        </button>

        <button onClick={() => document.getElementById("about").scrollIntoView()}>
          About
        </button>

        <button onClick={() => document.getElementById("contact").scrollIntoView()}>
          Contact
        </button>
      </div>

      <div className="content" id="home">
        <Home />
      </div>

      <div className="content" id="about">
        <About />
      </div>

      <div className="content" id="contact">
        <Contact />
      </div>
    </div>
  );
}