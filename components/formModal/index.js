import styled from "styled-components";

export default function formModal({ close, children }) {
  return (
    <>
      <StyledBackground />
      <StyledPopup>
        {children}
        <button onClick={close}>Close</button>
      </StyledPopup>
    </>
  );
}

const StyledPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 50px;
  z-index: 1000;
  box-shadow: 0 0 10px black;
`;
const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`;
