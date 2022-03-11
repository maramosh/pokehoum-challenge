import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border-style: solid;
  border-color: #ff452b;
  padding: 6px 32px;
  border-radius: 24px/50%;
  background-color: #fff;
  color: #263238;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background-color: #ff452b;
    color: #fff;
  }
`;
const StyledRoundedButton = styled.button`
  border-style: solid;
  border-color: #263238;
  background-color: #ff452b;
  padding: 0px 15px;
  color: #fff;
  margin-left: 10px;
  cursor: default;
  disabled: true;
`;

const Pagination = ({ increment, decrement, page }) => {
  return (
    <React.Fragment>
      <StyledButton onClick={decrement}>Previous</StyledButton>
      <StyledRoundedButton className="rounded-circle">
        {page}
      </StyledRoundedButton>
      <StyledButton onClick={increment}>Next</StyledButton>
    </React.Fragment>
  );
};

export default Pagination;
