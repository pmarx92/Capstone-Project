import styled from "styled-components";

export default function Modal({ children }) {
  return (
    <>
      <StyledBackground />
      <StyledPopup>{children}</StyledPopup>
    </>
  );
}

const StyledPopup = styled.div`
  position: fixed;
  top: 46%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f8f8f8;
  padding: 3rem;
  width: 90%;
  border-radius: 20px;
  z-index: 1000;
  box-shadow: 0 0 10px black;
`;
const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;
