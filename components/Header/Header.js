import styled from "styled-components";

function Header() {
  return (
    <Background>
      <StyledHeadline>Capstone Project</StyledHeadline>
    </Background>
  );
}

const Background = styled.div`
  background-color: lightgreen;
  padding: 2em;
  box-shadow: 0 0 10px grey;
`;
const StyledHeadline = styled.h1`
  text-align: center;
`;

export default Header;
