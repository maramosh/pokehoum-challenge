import axios from "axios";

const baseUrl = "http://pokeapi.co/api/v2/";
const query = {
  pokemon: "pokemon",
};

export async function getOnePokemon(pokemon) {
  return axios.get(baseUrl + query.pokemon + "/" + pokemon);
}

export async function getAllPokemon() {
  return axios.get(baseUrl + query.pokemon);
}
