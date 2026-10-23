// import { useState, useEffect, useRef } from "react";
// import "./App.css";

// const animals = [
//   {
//     name: "Lion",
//     image:
//       "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600",
//     wiki: "Lion",
//   },
//   {
//     name: "Elephant",
//     image:
//       "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600",
//     wiki: "Elephant",
//   },
//   {
//     name: "Tiger",
//     image:
//       "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600",
//     wiki: "Tiger",
//   },
//   {
//     name: "Giraffe",
//     image:
//       "https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=600",
//     wiki: "Giraffe",
//   },
// ];

// function App() {
//   const [selectedAnimal, setSelectedAnimal] = useState(null);
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");

//   const statusCheckStarted = useRef(false);

//   // Check HTTP status codes when the app loads
//   useEffect(() => {
//     if (statusCheckStarted.current) return;

//     statusCheckStarted.current = true;

//     async function checkStatusCodes() {
//       const requests = [
//         {
//           name: "Success",
//           url: "https://en.wikipedia.org/api/rest_v1/page/summary/Lion",
//         },
//         {
//           name: "Not Found",
//           url: "https://httpbin.org/status/404",
//         },
//         {
//           name: "Server Error",
//           url: "https://httpbin.org/status/500",
//         },
//       ];

//       for (const request of requests) {
//         try {
//           const response = await fetch(request.url);
//           console.log(`${request.name}: ${response.status}`);
//         } catch (err) {
//           console.error(`${request.name}: Request failed`, err.message);
//         }
//       }
//     }

//     checkStatusCodes();
//   }, []);

//   // Fetch animal details when an animal is selected
//   useEffect(() => {
//     if (!selectedAnimal) return;

//     async function getAnimalDetails() {
//       setLoading(true);
//       setError("");
//       setDescription("");

//       try {
//         const response = await fetch(
//           `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
//             selectedAnimal.wiki
//           )}`
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP Error: ${response.status}`);
//         }

//         const data = await response.json();

//         setDescription(
//           data.extract || "No description is available for this animal."
//         );
//       } catch (err) {
//         setError("Unable to load details. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     getAnimalDetails();
//   }, [selectedAnimal]);

//   // Filter animals based on search input
//   const filteredAnimals = animals.filter((animal) =>
//     animal.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="container">
//       <h1>🦁 Animal Explorer</h1>

//       <p className="subtitle">
//         Explore amazing animals and discover interesting facts!
//       </p>

//       {/* Controlled Input */}
//       <input
//         type="text"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         placeholder="Search animals..."
//       />

//       {/* Display typed text outside the input */}
//       {search && <p>You are typing: {search}</p>}

//       {/* Animal Cards */}
//       <div className="animal-grid">
//         {filteredAnimals.length > 0 ? (
//           filteredAnimals.map((animal) => (
//             <div
//               className="animal-card"
//               key={animal.name}
//               onClick={() => setSelectedAnimal(animal)}
//             >
//               <img src={animal.image} alt={animal.name} />

//               <h2>{animal.name}</h2>

//               <button type="button">View Details</button>
//             </div>
//           ))
//         ) : (
//           <p>No animals found.</p>
//         )}
//       </div>

//       {/* Animal Details */}
//       {selectedAnimal && (
//         <div className="details">
//           <button
//             className="close-button"
//             onClick={() => setSelectedAnimal(null)}
//           >
//              Close
//           </button>

//           <h2>{selectedAnimal.name}</h2>

//           {loading && <p>Loading animal information...</p>}

//           {error && <p className="error">{error}</p>}

//           {!loading && !error && description && <p>{description}</p>}

//           <a
//             className="wiki-button"
//             href={`https://en.wikipedia.org/wiki/${encodeURIComponent(
//               selectedAnimal.wiki
//             )}`}
//             target="_blank"
//             rel="noreferrer"
//           >
//             Read More on Wikipedia ↗
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

//END OF TASK 1

import React from "react";
import { useState,useEffect } from "react";
function App()
{
     const [form, setForm] = useState({
  firstName: "", email: "", age: "",
});
const [submitted, setSubmitted] = useState(null);
 
  function handle(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted({ ...form });
  }


  return (
    <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          value={form.firstName}
          onChange={handle}
          placeholder="First name"
        />
        <br /><br />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handle}
          placeholder="Email"
        />
        <br /><br />

        <input
          name="age"
          type="number"
          value={form.age}
          onChange={handle}
          placeholder="Age"
        />
        <br /><br />

        <button type="submit">Submit</button>
      </form>

      <div>
        <h3>Submitted values</h3>
        {submitted ? (
          <>
            <p>First name: {submitted.firstName}</p>
            <p>Email: {submitted.email}</p>
            <p>Age: {submitted.age}</p>
          </>
        ) : (
          <p>Submit the form to see the values.</p>
        )}
        </div>
        </div>
)

}
export default App