import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";

import Loading from "../components/Loading";
import CharacterItem from "../components/CharacterItem";

import { Character } from "../entities/Character";
import { CharacterService } from "../services/character.service";

import noFound from "../assets/noFound.png";

const characterService = new CharacterService();

function CharacterList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  const [noMoreResults, setNoMoreResults] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    getCharacters(1);
  }, [searchParams]);

  useEffect(() => {
    getCharacters(page);
  }, [page]);

  async function getCharacters(page = 1) {
    setIsLoading(true);

    try {
      if (!query) return;

      const { results, next } = await characterService.getAll({ query, page });
      const content = page === 1 ? results : [...characters, ...results];

      setNoMoreResults(!next);
      setCharacters(content);
    } catch (err) {
      setError("Uppsss!! Tuvimos un problema al comunicarnos con el servicio");
    } finally {
      setIsLoading(false);
    }
  }
  function filter(val = false, type = 'name' ){
    let filters = characters.sort((a, b) => {
      if(val){
        return a[type] > b[type] ? 1 : -1;
      }else{
        return a[type] < b[type]  ? 1 : -1;
      }
      
    });
    
    let res = JSON.stringify(filters)

    setCharacters(JSON.parse(res));
    
  }

  if (characters?.length === 0 && query && !isLoading) {
    return (
      <div className="pt-20 text-center">
        <span>No se encuentran resultados</span>
        <div className="flex justify-center ">
          <img src={noFound} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 items-center text-center pb-20">
      <ul className="pt-20 flex flex-col gap-6">
        <form className="flex justify-between">
          <div>
            <label htmlFor="az">A-z </label>
            <input type="checkbox" name="az" onChange={(evt) => { filter(evt.target.checked, 'name') }}/>
          </div>
          <div>
            <label htmlFor="birth">birth </label>
            <input type="checkbox" name="birth" onChange={(evt) => { filter(evt.target.checked, "birth_year") }}/>
          </div>
        </form>
        {characters?.map(({ name, url }) => {
          return (
            <CharacterItem key={name} name={name} url={url}></CharacterItem>
          );
        })}
      </ul>

      {isLoading && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}

      {!noMoreResults && (
        <button
          disabled={isLoading}
          className="py-4 px-6 bg-gray-800 hover:bg-gray-900 rounded-full cursor-pointer"
          onClick={() => setPage(() => page + 1)}
        >
          ver mas...
        </button>
      )}
    </div>
  );
}

export default CharacterList;
