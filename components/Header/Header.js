import styled from "styled-components";

function Header() {
  return (
    <Background>
      <StyledHeadline>Capstone prep</StyledHeadline>
    </Background>
  );
}

const Background = styled.div`
  background-color: lightgreen;
  padding: 10px;
  box-shadow: 0 0 10px grey;
`;
const StyledHeadline = styled.h1`
  text-align: center;
`;

export default Header;
