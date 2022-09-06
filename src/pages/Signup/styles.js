import styled, { keyframes } from "styled-components";
import cadastro from "../../images/cadastro.svg";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Background = styled.div`
  @media (min-width: 1100px) {
    flex: 1;
    background: url(${cadastro}) no-repeat, center, var(--black);
    background-size: contain;
    max-width: 50%;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (min-width: 1100px) {
    width: 50%;
  }
`;

const appearFromRight = keyframes`
from{
    opacity: 0;
    transform: translateX(50px)
}

to{
    opacity: 1;
    transform: translateX(0px)
}

`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromRight} 1s;

  form {
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 0;
    }

    div {
      margin-top: 10px;
    }

    p {
      margin-top: 8px;
      margin-bottom: 0;

      a {
        font-weight: bold;
        color: var(--orange);
      }
    }
  }
`;
