import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import HomeSVG from "../../public/images/house-solid.svg";
import Map from "../../public/images/mapIcon.svg";
import List from "../../public/images/List.svg";
import Add from "../../public/images/add.svg";
import Image from "next/image";

function Navigation() {
  const { pathname } = useRouter();

  return (
    <Container>
      <UnorderedList>
        <Link href="/" passHref>
          <StyledList active={pathname === "/"}>
            <Image src={HomeSVG} height="175" />
          </StyledList>
        </Link>
        <Link href="/Map" passHref>
          <StyledList active={pathname === "/Map"}>
            <Image src={Map} height="175" />
          </StyledList>
        </Link>
        <Link href="/List" passHref>
          <StyledList active={pathname === "../List"}>
            <Image src={List} height="175" />
          </StyledList>
        </Link>
        <Link href="/Add" passHref>
          <StyledList active={pathname === "../Add"}>
            <Image src={Add} height="175" />
          </StyledList>
        </Link>
      </UnorderedList>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 100vh;
`;
const UnorderedList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  box-shadow: 0 0 10px gray;
`;
const StyledList = styled.li`
  text-decoration: none;
  transition: 0.9s;
  padding: 20px;
  background-color: ${({ active }) => (active ? "green" : "lightgreen")};

  &:hover {
    background-color: #173540;
    cursor: pointer;
  }
`;

export default Navigation;
