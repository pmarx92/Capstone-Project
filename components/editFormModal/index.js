import styled from "styled-components";

export default function editFormModal({ close, children }) {
  return (
    <>
      <StyledBackground />
      <StyledPopup>
        {children}
        <ButtonContainer>
          <StyledBackButton onClick={close}>Close</StyledBackButton>
        </ButtonContainer>
      </StyledPopup>
    </>
  );
}

const StyledPopup = styled.div`
  position: fixed;
  top: 46%;
  left: 50%;
  width: 95%;
  transform: translate(-50%, -50%);
  background-color: #f8f8f8;
  padding: 1.3rem;
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
const StyledBackButton = styled.button`
  font-size: large;
  border-radius: 25px;
  border: 0;
  color: var(--white);
  background-color: var(--backgroundColor-green);

  padding: 0.6rem 1.5rem;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: -2.5rem;
`;
