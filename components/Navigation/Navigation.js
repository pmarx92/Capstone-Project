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
        <StyledList>
          <Link aria-label="Browse to Home" href="/Home" passHref>
            <Anchor active={pathname === "/"}>
              <Image src={HomeSVG} height="175" />
            </Anchor>
          </Link>
        </StyledList>
        <StyledList>
          <Link aria-label="Browse the map page" href="/Map" passHref>
            <Anchor active={pathname === "/Map"}>
              <Image src={Map} height="175" />
            </Anchor>
          </Link>
        </StyledList>
        <StyledList>
          <Link aria-label="Browse the list page" href="/List" passHref>
            <Anchor active={pathname === "../List"}>
              <Image src={List} height="175" />
            </Anchor>
          </Link>
        </StyledList>
        <StyledList>
          <Link aria-label="Browse to the form page" href="/Add" passHref>
            <Anchor active={pathname === "../Add"}>
              <Image src={Add} height="175" />
            </Anchor>
          </Link>
        </StyledList>
      </UnorderedList>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  bottom: 0px;
`;
const UnorderedList = styled.ul`
  display: flex;
  list-style-type: none;
  box-shadow: 0 0 10px gray;
`;
const StyledList = styled.li`
  display: flex;
  justify-content: center;
`;
const Anchor = styled.a`
  text-decoration: none;
  transition: 0.9s;
  padding: 1.4em;
  background-color: ${({ active }) => (active ? "green" : "lightgreen")};

  &:hover {
    background-color: #173540;
    cursor: pointer;
  }
`;

export default Navigation;
