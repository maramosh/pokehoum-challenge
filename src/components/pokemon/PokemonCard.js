import React, { Component } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import spinner from "../layout/spinner.gif";

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

const Card = styled.div`
  opacity: 0.95;
  box-shadow: 0 1px 3px rgba(255, 69, 43, 0.12),
    0 1px 2px rgba(255, 69, 43, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(255, 69, 43, 0.25),
      0 10px 10px rgba(255, 69, 43, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #263238;

  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: #263238;
  }

  &:hover {
    color: #ff452b;
  }
`;

const StyledTitle = styled.p`
  font-weight: bold;
`;

export default class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    imageLoading: true,
  };

  componentDidMount() {
    const { name, url } = this.props;
    const pokemonIndex = url.split("/")[6];
    const imageUrl = `https://projectpokemon.org/images/normal-sprite/${name}.gif`;

    this.setState({ name, imageUrl, pokemonIndex });
  }

  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
          <Card className="card">
            <StyledTitle className="card-header text-center">
              {`Pokemon #${this.state.pokemonIndex}`}
            </StyledTitle>
            {this.state.imageLoading ? (
              <img
                src={spinner}
                style={{ width: "5em", height: "5em" }}
                className="card-img-top rounded mx-auto d-block mt-2"
                alt="Loading logo"
              />
            ) : null}
            <Sprite
              className="card-img-top rounded mx-auto mt-2"
              src={this.state.imageUrl}
              onLoad={() => this.setState({ imageLoading: false })}
              style={
                this.state.toManyRequests
                  ? { display: "none" }
                  : this.state.imageLoading
                  ? null
                  : { display: "block" }
              }
              alt={`Imagen del pokemon ${this.state.name}`}
            />
            <div className="card-body mx-auto">
              <StyledTitle className="card-title">
                {this.state.name.toUpperCase()}
              </StyledTitle>
            </div>
          </Card>
        </StyledLink>
      </div>
    );
  }
}
