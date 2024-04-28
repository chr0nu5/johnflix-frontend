import React from "react";
import styled from "styled-components";

const Holder = styled.div`
  padding: 0 62px;
  width: 100%;
  /* max-width: 1440px; */
  margin: 0 auto;
  @media (max-width: 1024px) {
    padding: 0px 16px;
  }
`;

export default function Page({ children }) {
  return <Holder>{children}</Holder>;
}
