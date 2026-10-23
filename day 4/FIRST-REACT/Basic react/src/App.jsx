// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App

// END OF TASK 0

// import React from "react";
// import "./App.css";
// import dogImage from "./assets/dog.jpg";
// import Button from "./button";

// const App = () => {
//   return (
//     <div className="container">
//       <h1>Hello World !</h1>

//       <p>Welcome to my first React application.</p>

//       <img
//         src={dogImage}
//         alt="Dog"
//         className="sample-image"
//       />

//       <br />

//       <Button
//         name="press"
//         message="Hello! Welcome to React!"
//       />
//     </div>
//   );
// };

// export default App;

// END OF TASK 1

// import React, { useState, useEffect } from "react";
// import "./App.css";

// const App = () => {
//   const [users, setUsers] = useState([]);

//   async function getUsers() {
//     const response = await fetch(
//       "https://jsonplaceholder.typicode.com/users"
//     );

//     const data = await response.json();

//     setUsers(data);
//   }

//   useEffect(() => {
//     getUsers();
//   }, []);

//   return (
//     <div className="container">
//       <h1>User Details</h1>

//       <div className="table-container">
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Username</th>
//               <th>Email</th>
//               <th>Street</th>
//               <th>Suite</th>
//               <th>City</th>
//               <th>Zipcode</th>
//               <th>Latitude</th>
//               <th>Longitude</th>
//               <th>Phone</th>
//               <th>Website</th>
//               <th>Company</th>
//               <th>Catch Phrase</th>
//               <th>Business</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.username}</td>
//                 <td>{user.email}</td>
//                 <td>{user.address.street}</td>
//                 <td>{user.address.suite}</td>
//                 <td>{user.address.city}</td>
//                 <td>{user.address.zipcode}</td>
//                 <td>{user.address.geo.lat}</td>
//                 <td>{user.address.geo.lng}</td>
//                 <td>{user.phone}</td>
//                 <td>{user.website}</td>
//                 <td>{user.company.name}</td>
//                 <td>{user.company.catchPhrase}</td>
//                 <td>{user.company.bs}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default App;

// END OF TASK 2


import { useState } from "react";
import Title from "./title.jsx";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Title count={count} />

            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </>
    );
}

export default App;
