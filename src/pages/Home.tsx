import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Logo from "../components/Logo";
import CharacterSearch from "../components/CharacterSearch";
import CharacterList from "../containers/CharacterList";

function Home() {
  return (
    <div className="pt-20 xs:p-10 bg-transparent w-100 lg:w-1/2 h-10">
      <Logo />

      <CharacterSearch />

      <CharacterList />
    </div>
  );
}

export default Home;
