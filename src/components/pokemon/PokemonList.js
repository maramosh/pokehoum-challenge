import React, { Component } from "react";
import PokemonCard from "./PokemonCard";
import Loading from "../layout/Loading";
import axios from "axios";
import Pagination from "../layout/Pagination";
import { Form, Container, FormControl } from "react-bootstrap";

export default class PokemonList extends Component {
  state = {
    pokemon: null,
    currentOffset: 0,
    limit: 20,
    pageCounter: 1,
    types: null,
    abilities: null,
    filter: "",
    typeSelected: "All",
    abilitySelected: "none",
    searchResult: null,
  };

  componentDidMount() {
    this.getAbilities();
    this.getTypes();
    this.fetchData(
      this.state.currentOffset,
      this.state.typeSelected,
      this.state.abilitySelected,
      this.state.filter
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentOffset, typeSelected, abilitySelected, filter } = this.state;
    if (
      currentOffset !== prevState.currentOffset ||
      typeSelected !== prevState.typeSelected ||
      abilitySelected !== prevState.abilitySelected ||
      filter !== prevState.filter
    ) {
      if (currentOffset < 0) {
        this.setState({
          currentOffset: 0,
          pageCounter: 1,
        });
        this.fetchData(
          prevState.currentOffset,
          typeSelected,
          abilitySelected,
          filter
        );
      }
      this.fetchData(currentOffset, typeSelected, abilitySelected, filter);
    }
  }

  fetchData = async (offset = 0, typeSelected, abilitySelected, filter) => {
    const url = `https://pokeapi.co/api/v2/pokemon`;
    const allPokemons = await this.searchPokemonsFiltered(filter);
    let params = {
      offset: offset,
      limit: 20,
    };
    let res = "";
    if (typeSelected === "All" && abilitySelected === "none") {
      res = await axios.get(url, { params });
      const { results, count } = res.data;
      if (filter !== "") {
        this.setState({
          pokemon: allPokemons,
          count,
        });
      } else {
        const finalArray = results
          .filter(function(obj) {
            if (filter === "") {
              return obj;
            } else if (obj.name.toLowerCase().includes(filter.toLowerCase())) {
              return obj;
            }
            return null;
          })
          .map(function(obj) {
            let pokemon = {
              name: obj.name,
              url: obj.url,
            };
            return pokemon;
          });
        this.setState({
          pokemon: finalArray,
          count,
        });
      }
    } else if (typeSelected !== "All" && abilitySelected === "none") {
      res = await axios.get(`https://pokeapi.co/api/v2/type/${typeSelected}`);
      const { pokemon } = res.data;
      const finalArray = pokemon
        .filter(function(obj) {
          if (filter === "") {
            return obj;
          } else if (
            obj.pokemon.name.toLowerCase().includes(filter.toLowerCase())
          ) {
            return obj;
          }
          return null;
        })
        .map(function(obj) {
          let pokemon = {
            name: obj.pokemon.name,
            url: obj.pokemon.url,
          };
          return pokemon;
        });
      console.log(finalArray);
      this.setState({
        pokemon: finalArray,
      });
    } else if (typeSelected === "All" && abilitySelected !== "none") {
      res = await axios.get(
        `https://pokeapi.co/api/v2/ability/${abilitySelected}`
      );
      const { pokemon } = res.data;
      const finalArray = pokemon
        .filter(function(obj) {
          if (filter === "") {
            return obj;
          } else if (
            obj.pokemon.name.toLowerCase().includes(filter.toLowerCase())
          ) {
            return obj;
          }
          return null;
        })
        .map(function(obj) {
          let pokemon = {
            name: obj.pokemon.name,
            url: obj.pokemon.url,
          };
          return pokemon;
        });
      this.setState({
        pokemon: finalArray,
      });
    } else if (typeSelected !== "All" && abilitySelected !== "none") {
      const resAbility = await axios.get(
        `https://pokeapi.co/api/v2/ability/${abilitySelected}`
      );
      const resType = await axios.get(
        `https://pokeapi.co/api/v2/type/${typeSelected}`
      );
      const { pokemon } = resAbility.data;
      const pokemon2 = resType.data["pokemon"];
      const typeArray = pokemon2.map(function(obj) {
        let pokemon = {
          name: obj.pokemon.name,
          url: obj.pokemon.url,
        };
        return pokemon;
      });
      const abilityArray = pokemon.map(function(obj) {
        let pokemon = {
          name: obj.pokemon.name,
          url: obj.pokemon.url,
        };
        return pokemon;
      });
      console.log(typeArray);
      console.log(abilityArray);

      let finalArray = typeArray.filter((o1) =>
        abilityArray.some((o2) => o1.name === o2.name)
      );

      console.log(finalArray);
      this.setState({
        pokemon: finalArray,
      });
    }
  };

  searchPokemonsFiltered = async (filter) => {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${this.state.count}&offset=0`
    );
    const { results } = res.data;
    const finalArray = results
      .filter(function(obj) {
        if (obj.name.toLowerCase().includes(filter.toLowerCase())) {
          return obj;
        }
        return null;
      })
      .map(function(obj) {
        let pokemon = {
          name: obj.name,
          url: obj.url,
        };
        return pokemon;
      });
    return finalArray;
  };

  increment = () => {
    const { currentOffset, pageCounter } = this.state;
    this.setState({
      currentOffset: currentOffset + 20,
      pageCounter: pageCounter + 1,
    });
  };

  decrement = () => {
    const { currentOffset, pageCounter } = this.state;
    this.setState({
      currentOffset: currentOffset - 20,
      pageCounter: pageCounter - 1,
    });
  };

  getTypes = async () => {
    const url = `https://pokeapi.co/api/v2/type`;
    const res = await axios.get(url);
    const { results } = res.data;
    this.setState({
      types: results,
    });
  };

  getAbilities = async () => {
    const url = `https://pokeapi.co/api/v2/ability`;
    const res = await axios.get(url);
    const { results } = res.data;
    this.setState({
      abilities: results,
    });
  };

  _handleTypeChange = (e) => {
    let { value } = e.target;
    this.setState({ typeSelected: value });
  };

  _handleAbilityChange = (e) => {
    let { value } = e.target;
    this.setState({ abilitySelected: value });
  };

  render() {
    const { pokemon, pageCounter, types, abilities } = this.state;
    return (
      <React.Fragment>
        <div className="mb-3">
          <div className="row">
            <Container className="">
              <Container>
                <FormControl
                  type="text"
                  placeholder="Search a Pokemon"
                  onChange={(event) =>
                    this.setState({ filter: event.target.value })
                  }
                  className="rounded-pill w-100"
                />
              </Container>
              <div className="d-flex flex-row mt-2">
                <Container className="d-flex flex-column justify-content-center align-items-center">
                  <label className="d-flex align-items-center flex-wrap">
                    Type filter
                  </label>
                  <Form.Select
                    className="w-100 rounded-pill"
                    onChange={this._handleTypeChange}
                    value={this.state.typeSelected}
                  >
                    <option value="All">All</option>
                    {types ? (
                      <React.Fragment>
                        {types.map((type) => (
                          <option value={type.name} key={type.name}>
                            {type.name
                              .toLowerCase()
                              .split("-")
                              .map(
                                (s) =>
                                  s.charAt(0).toUpperCase() + s.substring(1)
                              )
                              .join(" ")}
                          </option>
                        ))}
                      </React.Fragment>
                    ) : null}
                  </Form.Select>
                </Container>
                <Container className="d-flex flex-column justify-content-center align-items-center">
                  <label className="d-flex align-items-center">
                    Ability filter
                  </label>
                  <Form.Select
                    className="w-100 rounded-pill"
                    onChange={this._handleAbilityChange}
                    value={this.state.abilitySelected}
                  >
                    <option value="none">None</option>
                    {abilities ? (
                      <React.Fragment>
                        {abilities.map((ability) => (
                          <option value={ability.name} key={ability.name}>
                            {ability.name
                              .toLowerCase()
                              .split("-")
                              .map(
                                (s) =>
                                  s.charAt(0).toUpperCase() + s.substring(1)
                              )
                              .join(" ")}
                          </option>
                        ))}
                      </React.Fragment>
                    ) : null}
                  </Form.Select>
                </Container>
              </div>
            </Container>
          </div>
        </div>
        <div>
          {pokemon ? (
            <div className="row">
              {pokemon.map((pokemon) => (
                <PokemonCard
                  key={pokemon.name}
                  name={pokemon.name}
                  url={pokemon.url}
                />
              ))}
            </div>
          ) : (
            <Loading />
          )}
        </div>
        <div className="mb-3">
          <div className="row">
            <Container className="d-flex justify-content-center">
              {this.state.filter === "" &&
              this.state.typeSelected === "All" &&
              this.state.abilitySelected === "none" ? (
                <Pagination
                  increment={this.increment}
                  decrement={this.decrement}
                  page={pageCounter}
                />
              ) : null}
            </Container>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
