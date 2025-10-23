// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import fragranceData from "../services/fragranceData.json";
// import { humanizeName } from "../utils/humanizeName";
// import { matchesQuery, normalizeString } from "../utils/fragranceUtils";

// const SearchBar = () => {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);

//     if (value.trim()) {
//       const normalizedQuery = normalizeString(value);
//       const filtered = fragranceData.filter((f) =>
//         matchesQuery(f, normalizedQuery)
//       );
//       setSuggestions(filtered.slice(0, 5));
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleSearch = () => {
//     if (query.trim())
//       navigate(`/fragrances?query=${encodeURIComponent(query)}`);
//   };

//   const handleSelect = (fragrance) => {
//     navigate(`/fragrances?modal=${fragrance.id}`);
//   };

//   return (
//     <div className="relative w-full max-w-md mx-auto">
//       <div className="flex">
//         <input
//           value={query}
//           onChange={handleChange}
//           placeholder="Search fragrances..."
//           className="w-full p-3 rounded-l-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-base"
//         />
//         <button
//           onClick={handleSearch}
//           className="px-4 bg-black text-white rounded-r-xl hover:bg-gray-800"
//         >
//           <i className="fa-solid fa-magnifying-glass" />
//         </button>
//       </div>

//       {suggestions.length > 0 && (
//         <div className="absolute mt-2 w-full bg-white dark:bg-neutral-900 rounded-xl shadow-lg overflow-hidden z-50">
//           {suggestions.map((f) => (
//             <div
//               key={f.id}
//               onClick={() => handleSelect(f)}
//               className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800"
//             >
//               <img
//                 src={f.image}
//                 alt={f.name}
//                 className="w-10 h-10 object-cover rounded-md"
//               />
//               <div>
//                 <p className="font-semibold">{humanizeName(f.name)}</p>
//                 <p className="text-sm text-gray-500">{humanizeName(f.brand)}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;
