import styled, { keyframes } from "styled-components";
import login from "../../images/imgLogin.svg";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Background = styled.div`
  @media (min-width: 1100px) {
    flex: 1;
    background: url(${login}) no-repeat, center, var(--black);
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

const appearFromLeft = keyframes`
from{
    opacity: 0;
    transform: translateX(-50px)
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
  animation: ${appearFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 32;
    }

    div {
      margin-top: 16px;
    }

    p {
      margin-top: 8px;

      a {
        font-weight: bold;
        color: var(--orange);
      }
    }
  }
`;
