import { useRouter } from "next/router";
import styled from "styled-components";
import apiUrl from "next-api-url";

export async function getServerSideProps(ctx) {
  const res = await fetch(`${apiUrl(ctx)}/formdata/${ctx.query.id}`);
  const data = await res.json();

  return {
    props: { data },
  };
}

export default function Card({ data }) {
  const router = useRouter();
  const deleteCard = async () => {
    const deleted = await fetch(`/api/formdata/${router.query.id}`, {
      method: "Delete",
    });
    router.push("/List");
  };

  return (
    <div>
      <StyledImage src={data.data.cloudinarySrc} />
      <Container>
        <StyledPara>Name: {data.data.name}</StyledPara>
        <StyledPara>Weight: {data.data.weight}kg</StyledPara>
        <StyledPara>Length: {data.data.length}cm</StyledPara>
        <StyledPara>Location: {data.data.location}</StyledPara>
        <Delete onClick={deleteCard}>Delete</Delete>
      </Container>
    </div>
  );
}
const StyledImage = styled.img`
  width: 75%;
  max-width: 800px;
  border-radius: 25px;
  margin: 0 0 3rem 1rem;
  box-shadow: 0 0 10px var(--backgroundColor-dark);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px;
  width: 70%;
  max-width: 550px;
  margin: 0 auto;
  padding: 2.5rem;
  border-radius: 25px;
  box-shadow: 0 0 10px var(--backgroundColor-dark);
`;

const Delete = styled.button`
  font-size: large;
  position: absolute;
  border-radius: 25px;
  border: 0;
  width: 35%;
  max-width: 130px;
  bottom: -15px;
  right: 10px;
  color: var(--white);
  background-color: var(--backgroundColor-green);
  padding: 0.6rem 1.3rem;

  &:hover {
    box-shadow: 0 0 10px var(--backgroundColor-dark);
  }
`;
const StyledPara = styled.p`
  font-size: 21px;
`;
