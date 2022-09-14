import { ApiResult } from "../entities/ApiResponse";
import { Character } from "../entities/Character";
import { Vehicles } from '../entities/Vehicles'
const baseUrl = import.meta.env.VITE_API_URL;

export class CharacterService {
  getVehicle({params, id}: {params?:string , id?: string;}){
    console.log(params, id)
    return fetch(`${baseUrl}api/${params}/${id}`)
      .then((res) => res.json())
      .then((data) => data as Vehicles);
  }

  getAll({ query = '', page = 1 }: { query?: string; page?: number }) {
    return fetch(`${baseUrl}api/people?search=${query}&page=${page}`)
      .then((res) => res.json())
      .then((data) => data as ApiResult<Character>);
  }

  getOne(id: number) {
    return fetch(`${baseUrl}api/people/${id}`)
      .then((res) => res.json())
      .then((data) => data as Character);
  }
}
