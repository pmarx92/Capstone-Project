import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import HomeSVG from "../../public/images/Home.svg";
import Map from "../../public/images/Map.svg";
import List from "../../public/images/Liste.svg";
import Add from "../../public/images/Neu.svg";
import Image from "next/image";

function Navigation() {
  const { pathname } = useRouter();

  return (
    <Container>
      <UnorderedList>
        <StyledList>
          <Link aria-label="Browse to Home" href="/" passHref>
            <Anchor active={pathname === "/"}>
              <Image src={HomeSVG} width="175" />
            </Anchor>
          </Link>
        </StyledList>

        <StyledList>
          <Link aria-label="Browse the list page" href="/List" passHref>
            <Anchor active={pathname === "/List"}>
              <Image src={List} width="175" />
            </Anchor>
          </Link>
        </StyledList>
        <StyledList>
          <Link aria-label="Browse to the form page" href="/Add" passHref>
            <Anchor active={pathname === "/Add"}>
              <Image src={Add} width="175" />
            </Anchor>
          </Link>
        </StyledList>
      </UnorderedList>
    </Container>
  );
}

const Container = styled.div`
  border-top: 5px solid var(--backgroundColor-green);
  position: fixed;
  bottom: 0px;
  width: 100%;
  background-color: #fff;
  z-index: 5;
`;
const UnorderedList = styled.ul`
  display: flex;
  list-style-type: none;
  box-shadow: 0 0 5px gray;
  width: 100%;
`;
const StyledList = styled.li`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const Anchor = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  transition: 0.9s;
  padding: 1.4em;
  width: 100%;
  background-color: ${({ active }) =>
    active ? "var(--backgroundColor-green)" : "#fff"};

  &:hover {
    background-color: var(--backgroundColor-green);
    cursor: pointer;
  }
`;

export default Navigation;
