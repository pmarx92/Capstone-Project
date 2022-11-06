import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Card({ data }) {
  const router = useRouter();
  console.log(data.data);

  const deleteCard = async () => {
    const deleted = await fetch(
      `http://localhost:3000/api/formdata/${router.query.id}`,
      {
        method: "Delete",
      }
    );
    router.push("/List");
  };

  return (
    <div>
      <Container>
        <p>Name: {data.data.name}</p>
        <p>Weight: {data.data.weight}kg</p>
        <p>Length: {data.data.length}cm</p>
        <p>Location: {data.data.location}</p>
        <Delete onClick={deleteCard}>Delete</Delete>
      </Container>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const res = await fetch(`http://localhost:3000/api/formdata/${ctx.query.id}`);
  const data = await res.json();

  return {
    props: { data },
  };
}

const Container = styled.div`
  border: 1px solid red;
  width: 50%;
  padding: 1rem;
  margin: 1rem auto;
`;
const Edit = styled.button`
  padding: 0.5rem;
  margin: 0.5rem;
`;
const Delete = styled.button`
  padding: 0.5rem;
  margin: 0.5rem;
`;