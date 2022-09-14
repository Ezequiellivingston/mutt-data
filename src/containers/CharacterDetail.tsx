import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { CharacterService } from "../services/character.service";
import { Character } from "../entities/Character";
import { Vehicles } from "../entities/Vehicles";

import { array } from "prop-types";

const characterService = new CharacterService();

function Detail() {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character>();
  const [vehicleInfo, setVehiclesInfo] = useState<Vehicles>([])

  useEffect(() => {
    if (!id) return;

    const characterId = parseInt(id);

    if (isNaN(characterId)) return;

    getDetailCharacter(characterId);
  }, [id]);

  async function getDetailCharacter(id: number) {
    const character = await characterService.getOne(id);
    setCharacter(character);
  }

  useEffect(()=>{
    character?.vehicles.map((vehicle) => {

      const id = vehicle.split('/')

      const res =  characterService.getVehicle({params:'vehicles', id:`${id[5]}`});
      res.then((vhl) => {
        setVehiclesInfo([vhl, ...vehicleInfo])
      })

      
    })

  },[character])

  const characterDetailData = {}

  return (
    <div className="flex flex-col gap-10">
      <div className="mt-20 p-10 text-center bg-gray-900 opacity-90 w-100 lg:w-1/2">
        <h1 className="text-4xl md:text-8xl pb-20">{character?.name}</h1>

        <ul className="pt-10 text-2xl :md:text-xl">
          <li className="flex justify-between">
            <span>Nacimiento : </span>
            <strong>{character?.birth_year}</strong>
          </li>

          <li className="flex justify-between">
            <span>Color de ojos : </span>
            <strong>{character?.eye_color}</strong>
          </li>

          <li className="flex justify-between">
            <span>Altura : </span>
            <strong>{character?.height}</strong>
          </li>

          <li className="flex justify-between">
            <span>Color de cabello : </span>
            <strong>{character?.hair_color}</strong>
          </li>

          <li className="flex justify-between">
            <span>Color de piel : </span>
            <strong>{character?.skin_color}</strong>
          </li>

          <li className="flex justify-between">
            <span>Sexo : </span>
            <strong>{character?.gender}</strong>
          </li>

          <li className="flex justify-between">
            <span>Masa : </span>
            <strong>{character?.mass}</strong>
          </li>
          <li className="flex justify-between">
            <span>Vehiculos : </span>
          {vehicleInfo.map(vehicle => {
            return <div key={vehicle.name}>{vehicle.name}</div>
          })}
          </li>
        </ul>
      </div>

      <Link
        to="/"
        className="py-2 flex justify-center bg-gray-800 hover:bg-gray-900 rounded-full cursor-pointer w-48"
      >
        Volver a la Home
      </Link>
    </div>
  );
}

export default Detail;
