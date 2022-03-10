import React, { Component } from "react";
import styled from "styled-components";

const Branding = styled.a`
  -moz-user-select: none;
  -website-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
  color: black;
`;

const Logo = styled.img`
  height: 35px;
  width: 62.25px;
  margin-right: 0.5em;
  color: black;
`;

export default class NavBar extends Component {
  state = {
    hoverNavBar: false,
  };

  hoverNavBar() {
    window.scrollY <= 0
      ? this.setState({ hoverNavBar: false })
      : this.setState({ hoverNavBar: true });
  }

  componentDidMount() {
    // Added True To End To Listen to All Events On Page
    window.addEventListener("scroll", this.hoverNavBar.bind(this), true);
  }

  componentWillUnmount() {
    // Added True To End To LIsten to All Events On Page
    window.removeEventListener("scroll", this.hoverNavBar.bind(this), true);
  }

  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light bg-dark fixed-top d-flex justify-content-start"
        style={
          this.state.hoverNavBar
            ? {
                boxShadow:
                  "0 1px 3px rgba(255, 69, 43, 0.12), 0 1px 2px rgba(255, 68, 43, 0.24)",
                transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                backgroundColor: "#ef5350 !important",
              }
            : { backgroundColor: "transparent !important" }
        }
      >
        <Branding
          href="#"
          className="navbar-brand mr-0 align-items-center px-3"
        >
          <Logo src="./logo.svg" alt="Houm logo" />
          PokeHoum
        </Branding>
      </nav>
    );
  }
}
