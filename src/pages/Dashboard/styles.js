import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 38px;
  align-items: center;
`;

export const InputContainer = styled.form`
  flex: 1;
  margin-top: 32px;
  padding: 0 38px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  time {
    width: 100%;
    max-width: 1244px;
  }

  section {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1244px;
    width: 100%;

    div {
      max-width: 100%;
      flex: 1;
    }

    button {
      max-width: 260px;
      height: 60px;
      margin: 0;
      width: 45%;
      font-size: 12px;
    }

    .leave-button {
      background: rgb(255, 68, 85);
      border-color: rgb(255, 68, 85);
    }

    .leave-button:hover {
      border: 2px solid black;
    }

    @media (min-width: 600px) {
      button {
        font-size: 16px;
      }
    }
  }
`;

export const TaskContainer = styled.div`
  padding: 0;
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 50px;
  align-items: center;
  column-gap: 36px;
  max-width: 1248px;

  div {
    margin-top: 16px;
  }
`;
