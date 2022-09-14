import { useState, FormEvent, useContext } from "react";
import { useSearchParams } from "react-router-dom";

function InputSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: search });
  };

  return (
    <form onSubmit={(e) => handleSearch(e)} className="relative">
      <input
        className="absolute outline-0 px-6 rounded-full h-16 text-lg flex justify-between bg-gray-800 w-full ring-4 ring-sky-900 focus:ring-sky-700"
        placeholder="Busca tu personaje favorito de Startwars y que la fuerza te acompañe ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        className="absolute top-3 right-6 bg-gray-800 text-sky-900 hover:text-sky-700"
        type="submit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 512 512"
          width={36}
          height={36}
        >
          <path d="M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z" />
        </svg>
      </button>
    </form>
  );
}

export default InputSearch;
