import styled from "styled-components";
import HeaderIcon from "../../public/images/Logo_und_Text.svg";
import Image from "next/image";

function Header() {
  return (
    <HeadContainer>
      <Image src={HeaderIcon} height="175px" />
    </HeadContainer>
  );
}

export default Header;

const HeadContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
`;
